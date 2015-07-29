landMap = {
  "grumpy": function seq() {
    console.log('start');
    drone.after(0, function() {
      console.log('land');
      this.land();
    });
  },
  "happy": function seq() {
    console.log('start');
    drone.after(0, function() {
      console.log('turnaround');
      this.animate('turnaround', 500);
      console.log('up');
      this.up(0.5);
    })
    .after(1500, function() {
      console.log('stop');
      this.stop();
    })
    .after(300, function() {
      console.log('flip');
      this.animate('flipAhead', 15);
    });
  },
  "sad": function seq() {
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