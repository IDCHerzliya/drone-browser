loiterMap = {
  "grumpy": function seq() { 
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
  "happy": function seq() {
    console.log('turnaround');
    drone.animate('turnaround', 5000);
  },
  "sad": function seq() {
    for (var i = 0; i < 10; i++) {
      drone.after(1500, function() {
        console.log('forward');
        this.front(0.1);
      })
      .after(2000, function() {
        console.log('stop');
        this.stop();
      })
      .after(100, function() {
        console.log('turning');
        this.counterClockwise(0.1);
      });
    }
  }
}