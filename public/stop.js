stopMap = {
  "grumpy": function seq() {
    drone.after(50, function() {
      console.log('stop');
      this.stop();
      console.log('land');
      this.land();
    })
  },
  "happy": function seq() {
    drone.after(1000, function() {
      console.log('stop');
      this.stop();
      console.log('flip');
      this.animate('flipAhead', 15);
    })
  },
  "sad": function seq() {
    drone.after(50, function() {
      console.log('stop');
      this.stop();
      this.clockwise(0.1);
      console.log('land');
      this.land();
    })
  }
}