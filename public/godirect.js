goDirectMap = {
  "happy": function seq() {
    drone.after(0, function() { 
      console.log('up'); 
      // this.animate('phiDance', 4000); 
      this.up(0.4);
    }) 
    .after(700, function() {
      console.log('down');
      this.down(0.4);
    })
    .after(700, function() {
      console.log('up');
      this.up(0.4);
    })
    .after(600, function() {
      console.log('stop');
      this.stop();
    })
  }
}