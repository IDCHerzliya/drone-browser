(function() {
  var faye, keymap, speed, profileMovement, seqMap;
  var profile = null;
  var maxSpeed = 1;
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

  var pickProfile = function () {
    if (profile == null) {
      return alert("pick profile");
    };
  }

  profileMovement = {
    "happy": {
      speed: 0.6,
      duration: 1000
    },
    "grumpy": {
      speed: 0.2,
      duration: 500
    }
  }

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
    49: {
      ev: 'animate',
      action: 'flipAhead',
      duration: 15
    },
    50: {
      ev: 'animate',
      action: 'flipLeft',
      duration: 15
    },
    51: {
      ev: 'animate',
      action: 'yawShake',
      duration: 15
    },
    52: {
      ev: 'animate',
      action: 'doublePhiThetaMixed',
      duration: 15
    },
    53: {
      ev: 'animate',
      action: 'wave',
      duration: 15
    },
    69: {
      ev: 'drone',
      action: 'disableEmergency'
    }
  };
  speed = 0;
  $(document).keydown(function(ev) {
    var evData;
    if (keymap[ev.keyCode] == null) {
      return;
    }
    ev.preventDefault();
    speed = speed >= maxSpeed ? maxSpeed : speed + 0.08 / (1 - speed);
    evData = keymap[ev.keyCode];
    return faye.publish("/drone/" + evData.ev, {
      action: evData.action,
      speed: speed,
      duration: evData.duration
    });
  });
  $(document).keyup(function(ev) {
    speed = 0;
    return faye.publish("/drone/drone", {
      action: 'stop'
    });
  });

  var movData = {
    speed: 0, 
    duration: 0,
    action: 0,
    param: 0
  };


  $("*[data-profile]").on("mousedown", function() {
    profile = $(this).attr("data-profile");
    document.getElementById("prof").innerHTML = profile;
    maxSpeed = parseFloat($(this).attr("max-speed"));
    return faye.publish("/profile", {
      profile: profile,
      maxSpeed: parseFloat($(this).attr("max-speed"))
    });
  });

  $("*[data-action]").on("mousedown", function(ev) {
    pickProfile();
    movData.speed = profileMovement[profile].speed;
    movData.duration = profileMovement[profile].duration;
    movData.param = $(this).attr("data-param");
    movData.action = $(this).attr("data-action");
    if ($(this).attr("data-mod") == "small") {
      movData.duration /= 2; // movement duration half as long
    }
    return faye.publish("/drone/" + movData.action, {
      duration: movData.duration,
      action: movData.param,
      speed: movData.speed,
    });
  });
  $("*[data-action]").on("mouseup", function(ev) {
    if (movData.action == "move") {
      setTimeout(function () {
        return faye.publish("/drone/move", {
          action: movData.param,
          speed: movData.action === "move" ? 0 : void 0
        })      
      }, 
      movData.duration);
    } else { //animate
      return faye.publish("/drone/animate", {
        action: movData.param,
        duration: movData.duration
      }) 
    }  
  });

  $("*[data-sequence]").on("mousedown", function() {
    pickProfile();

    

    var seq = $(this).attr("data-sequence");
    // var seqFn = seqMap[seq];
    // var seqFnString = seqFn.toString();
    return faye.publish("/sequence", {
      // seqFn: seqFnString,
      seq: seq,
      profile: profile
    });
  });
  $("*[rel=tooltip]").tooltip();
}).call(this);
