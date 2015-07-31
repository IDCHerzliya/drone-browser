ackMap = {
  "grumpy": function(drone) {
    drone.after(2000, function() {
      console.log('turning');
      this.clockwise(0.5);
    })
    .after(2500, function() {
      console.log('stop');
      this.stop();
    });
  },
  "happy": function(drone) {
    console.log('nod');
    this.animate('thetaDance', 2000);
  },
  "sad": function(drone) {
    console.log('wobble');
    drone.animate('wave', 3000);
  }
}

crossLawnMap = {
  "grumpy": function(drone) {
    for (var i = 0; i < 3; i++) {
      drone.after(3000, function() {
        console.log('front');
        this.front(0.4);
      })
      .after(3000, function() {
        console.log('stop');
        this.stop();
      });
    }
  },
  "happy": function(drone) {
    drone.after(0, function() {
      console.log('front, up');
      this.up(0.5);
      this.front(0.7);
    })
    .after(2000, function() {
      console.log('front, down');
      this.down();
    })
    .after(1500, function() {
      console.log('stop');
      this.stop();
    })
    .after(1000, function() {
      console.log('turnaround');
      this.animate('turnaround', 1600);
    })
    .after(1600, function() {
      console.log('nod');
      this.animate('thetaDance', 2000);
    }); 
  },
  "sad": function(drone) {
    for (var i = 0; i < 3; i++) {
      drone.after(3000, function() {
        console.log('front');
        this.front(0.1);
      })
      .after(5000, function() {
        console.log('land');
        this.land();
      })
      .after(2000, function() {
        console.log('takeoff');
        this.takeoff();
      })
    }
  }
}

goDirectMap = {
  "grumpy": function(drone) {
    drone.after(0, function() {
      console.log('forward');
      this.front(0.4);
    })
    .after(3000, function() {
      this.stop();
      console.log('turning');
      this.counterClockwise(1);
    })
    .after(500, function() {
      this.stop()
    })
    .after(100, function() {
      console.log('forward');
      this.front(0.4);
    })
    .after(1000, function() {
      console.log('stop');
      this.stop();
    })
  },
  "happy": function(drone) {
    drone.after(0, function() {
      console.log('forward');
      this.front(0.6);
    })
    .after(3000, function() {
      console.log('turning');
      this.counterClockwise(1);
    })
    .after(1000, function() {
      console.log('forward');
      this.front(0.6);
    })
    .after(500, function() {
      console.log('stop');
      this.stop();
    })
  },
  "sad": function(drone) {
    drone.after(0, function() {
      console.log('forward');
      this.front(0.1);
    })
    .after(5000, function() {
      console.log('stop');
      this.stop();
    })
    .after(1000, function() {
      console.log('turning');
      this.counterClockwise(0.6);
    })
    .after(5000, function() {
      console.log('forward');
      this.front(0.1);
    })
    .after(5000, function() {
      console.log('stop');
      this.stop();
    })
    .after(2000, function() {
      console.log('land');
      this.land();
    })
  }
}

landMap = {
  "grumpy": function(drone) {
    console.log('start');
    drone.after(0, function() {
      console.log('land');
      this.land();
    });
  },
  "happy": function(drone) {
    console.log('start');
    drone.after(0, function() {
      console.log('turnaround');
      this.animate('turnaround', 500);
      console.log('up');
      this.up(0.7);
    })
    .after(1500, function() {
      console.log('stop');
      this.stop();
    })
    .after(1000, function() {
      console.log('flip');
      this.animate('flipAhead', 15);
    });
  },
  "sad": function seq(drone) {
    console.log('start');
    drone.after(0, function() {
      console.log('wobble');
      this.animate('wave', 2000);
    })
    .after(4000, function() {
      console.log('land');
      this.land();
    });
  }
}

loiterMap = {
  "grumpy": function(drone) { 
    for (var i = 0; i < 3; i++) {
      drone.after(1000, function() {
        console.log('left');
        this.animate('phi30Deg', 30);
      })
      .after(100, function() {
        this.left(0.4);
      })
      .after(1000, function() {
        console.log('right');    
        this.animate('phiM30Deg', 30);
      })
      .after(100, function() {
        this.right(0.4);
      });
    }
    drone.after(0, function() {
      console.log('end');
      this.stop();
    }, true);
  },
  "happy": function(drone) {
    console.log('turnaround');
    drone.animate('turnaround', 5000);
  },
  "sad": function(drone) {
    console.log('wobble');
    for (var i = 0; i < 10; i++) {
      drone.after(0, function() {
        drone.animate('wave', 1500);
      })
      .after(1600, function() {
        console.log('loop');
      })
    }
  }
}

pictureMap = {
  "grumpy": function(drone) {
    drone.after(3000, function() {
      console.log('turning');
      this.clockwise(0.5);
    })      
    .after(3000, function() {
      console.log('stop');
      this.stop();
      console.log('land');
      this.land();
    })
  },
  "happy": function(drone) {
    drone.after(0, function() {
      console.log('turnaround');
      this.animate('turnaround', 1200);
    })
    .after(2000, function() {
      console.log('nod');
      this.animate('thetaDance', 2000);
    })
    .after(2500, function() {
      console.log('stop');
      this.stop();
    })
    .after(0, function() {
      console.log('end');
      this.stop();
    }, true);
  },
  "sad": function(drone) {
    console.log('start');
    drone.after(0, function() {
      console.log('nod');
      this.animate('thetaDance', 1800);
    })
    .after(2000, function() {
      console.log('stop');
      this.stop();
      console.log('land');
      this.land();
    })
  }
}

stopMap = {
  "grumpy": function(drone) {
    drone.after(50, function() {
      console.log('stop');
      this.stop();
    })
    .after(1000, function() {
      console.log('land');
      this.land();
    });
  },
  "happy": function(drone) {
    drone.after(1000, function() {
      console.log('stop');
      this.stop();
      console.log('flip');
      this.animate('flipAhead', 15);
    })
  },
  "sad": function(drone) {
    drone.after(50, function() {
      console.log('stop');
      this.stop();
      this.clockwise(0.1);
      console.log('land');
      this.land();
    })
  }
}

seqMap = {
  "ack": ackMap,
  "crossLawn": crossLawnMap,
  "goDirect": goDirectMap,
  "land": landMap,
  "loiter": loiterMap,
  "picture": pictureMap,
  "stop": stopMap
}

var seqFn = function(seq, profile) {
  var map = seqMap[seq];
  return map[profile];
}

var reset = function(drone) {
  drone.after(0, function() {
    console.log('*reset');
  }, true);
}

module.exports.fn = seqFn;
module.exports.reset = reset;
