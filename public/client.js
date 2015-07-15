(function() {
  var faye, keymap, speed, firstMove, directions, hz, distract, moveCounter;
  var LED_KEY = 89;
  var MAX_SPEED = parseFloat($("#speed").val());
  var CONCENTRATION_LEVEL = parseFloat($("#concentration").val());
  var RANDOM_MIN = 1; // in seconds
  var RANDOM_MAX = 0.5; 
  var MAX_MOVE = 10; // counter to prevent queueing of commands from sleep()
  function reset() {
    speed = 0;
    return faye.publish("/drone/drone", {
      action: 'stop'
    });
  }
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  faye = new Faye.Client("/faye", {
    timeout: 120
  });
  faye.subscribe("/drone/navdata", function(data) {
    ["batteryPercentage", "clockwiseDegrees", "altitudeMeters", "frontBackDegrees", "leftRightDegrees", "xVelocity", "yVelocity", "zVelocity"].forEach(function(type) {
      return $("#" + type).html(Math.round(data.demo[type], 4));
    });
    return showBatteryStatus(data.demo.batteryPercentage);
  });
  window.showBatteryStatus = function(batteryPercentage) {
    $("#batterybar").width("" + batteryPercentage + "%");
    if (batteryPercentage < 30) {
      $("#batteryProgress").removeClass("progress-success").addClass("progress-warning");
    }
    if (batteryPercentage < 15) {
      $("#batteryProgress").removeClass("progress-warning").addClass("progress-danger");
    }
    return $("#batteryProgress").attr({
      "data-original-title": "Battery status: " + batteryPercentage + "%"
    });
  };
  faye.subscribe("/drone/image", function(src) {
    return $("#cam").attr({
      src: src
    });
  });
  keymap = {
    87: { //'w'
      ev: 'move',
      action: 'front'
    },
    83: { //'s' 
      ev: 'move',
      action: 'back'
    },
    65: { //'a'
      ev: 'move',
      action: 'left'
    },
    68: { //'d'
      ev: 'move',
      action: 'right'
    },
    38: { //'up'
      ev: 'move',
      action: 'up'
    },
    40: { //'down'
      ev: 'move',
      action: 'down'
    },
    37: { //'left'
      ev: 'move',
      action: 'counterClockwise'
    },
    39: { //'right'
      ev: 'move',
      action: 'clockwise'
    },
    32: { //'space'
      ev: 'drone',
      action: 'takeoff'
    },
    27: { //'esc'
      ev: 'drone',
      action: 'land'
    },
    84: { //'t'
      ev: 'animate',
      action: 'turnaround',
      duration: 15
    },
    112: {
      ev: 'animate',
      action: 'theta30Deg', //forward
      duration: 30
    },
    113: {
      ev: 'animate',
      action: 'thetaM30Deg', //backward
      duration: 30
    },
    114: {
      ev: 'animate',
      action: 'phi30Deg',
      duration: 30
    },
    115: {
      ev: 'animate',
      action: 'phiM30Deg',
      duration: 30
    },
    89: { //'y'
      ev: 'animateLeds',
      action: 'blinkGreenRed',
      hz: 5,
      duration: 3
    },
    69: { //'e'
      ev: 'drone',
      action: 'disableEmergency'
    }
  };

  //anticipation
  directions = {
    87: 112, //front
    83: 113, //back
    65: 114, //left
    68: 115  //right
  };

  //same direction
  // directions = {
  //   87: 113, //front
  //   83: 112, //back
  //   65: 115, //left
  //   68: 114  //right
  // };

  speed = 0;
  firstMove = true; 
  distract = false;
  moveCounter = 0;
  $(document).keydown(function(ev) {
    var evData;
    MAX_SPEED = parseFloat($("#speed").val());
    CONCENTRATION_LEVEL = parseFloat($("#concentration").val());
    if (keymap[ev.keyCode] == null) {
      return;
    }       
    ev.preventDefault();
    speed = speed >= MAX_SPEED ? MAX_SPEED : speed + 0.08 / (1 - speed);
    
    if (moveCounter < MAX_MOVE) {
      moveCounter++; // do we need moveCounter?
      if (distract) {
        var milliseconds = Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN + 1) + RANDOM_MIN);
        sleep(milliseconds * 1000);
        distract = false;
        reset();
      }
      if (firstMove && ev.keyCode in directions) {
        firstMove = false;
        evData = keymap[directions[ev.keyCode]];
        return faye.publish("/drone/" + evData.ev, {
          action: evData.action,
          speed: speed,
          duration: evData.duration
        });
      }  
      evData = keymap[ev.keyCode];
      if (ev.keyCode == LED_KEY) {
        return faye.publish("/drone/" + evData.ev, {
          action: evData.action,
          hz: evData.hz,
          duration: evData.duration
        });
      };
      if (Math.random() > CONCENTRATION_LEVEL) { 
        distract = true;
        reset();
      };
      return faye.publish("/drone/" + evData.ev, {
        action: evData.action,
        speed: speed,
        duration: evData.duration
      }); 
    } else {
      moveCounter = 0;
      reset();
    };
  });
  $(document).keyup(function(ev) {
    firstMove = true; 
    reset();
  });
  $("*[data-action]").on("mousedown", function(ev) {
    return faye.publish("/drone/" + $(this).attr("data-action"), {
      action: $(this).attr("data-param"),
      speed: 0.3,
      duration: 1000 * parseInt($("#duration").val())
    });
  });
  $("*[data-action]").on("mouseup", function(ev) {
    return faye.publish("/drone/move", {
      action: $(this).attr("data-param"),
      speed: $(this).attr("data-action") === "move" ? 0 : void 0
    });
  });
  $("*[rel=tooltip]").tooltip();
}).call(this);

