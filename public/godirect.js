goDirectMap = {
  "happy": function() {
    drone
      .after(3000, function() {
        this.animate('phiDance', 15);
        console.log('happy!!!');
      })
      .after(1000, function() {
        this.stop();
        this.land();
        console.log('land!!!');
      });
  }
}