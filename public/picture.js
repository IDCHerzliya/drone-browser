pictureMap = {
  "grumpy": function seq() {
    console.log('start');
    drone.after(0, function() {
      console.log('stop');
      this.stop();
      console.log('land');
      this.land();
    })
  },
  "happy": function seq() {
    console.log('start');
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
  "sad": function seq() {
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