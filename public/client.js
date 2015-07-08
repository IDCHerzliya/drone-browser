(function() {
  var faye, keymap, speed, firstMove, directions;
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
    87: {
      ev: 'move',
      action: 'front'
    },
    83: {
      ev: 'move',
      action: 'back'
    },
    65: {
      ev: 'move',
      action: 'left'
    },
    68: {
      ev: 'move',
      action: 'right'
    },
    38: {
      ev: 'move',
      action: 'up'
    },
    40: {
      ev: 'move',
      action: 'down'
    },
    37: {
      ev: 'move',
      action: 'counterClockwise'
    },
    39: {
      ev: 'move',
      action: 'clockwise'
    },
    32: {
      ev: 'drone',
      action: 'takeoff'
    },
    27: {
      ev: 'drone',
      action: 'land'
    },
    84: {
      ev: 'animate',
      action: 'turnaround',
      duration: 15
    },
    112: {
      ev: 'animate',
      action: 'theta30Deg', //forward
      duration: 15
    },
    113: {
      ev: 'animate',
      action: 'thetaM30Deg', //backward
      duration: 15
    },
    114: {
      ev: 'animate',
      action: 'phi30Deg',
      duration: 500
    },
    115: {
      ev: 'animate',
      action: 'phiM30Deg',
      duration: 500
    },
    89: {
      ev: 'animateLeds',
      action: 'blinkGreenRed',
      duration: 3000
    },
    69: {
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
  $(document).keydown(function(ev) {
    var evData;
    if (keymap[ev.keyCode] == null) {
      return;
    }       
    ev.preventDefault();
    speed = speed >= 0.5 ? 0.5 : speed + 0.08 / (1 - speed);
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
    return faye.publish("/drone/" + evData.ev, {
      action: evData.action,
      speed: speed,
      duration: evData.duration
    });
  });
  $(document).keyup(function(ev) {
    speed = 0;
    firstMove = true; 
    return faye.publish("/drone/drone", {
      action: 'stop'
    });
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
