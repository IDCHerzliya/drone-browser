function happy(seq) {
  var happyMap = {
    "goDirect": {
      fn: 
      .after(500, function() {
        this.animate('phiDance', 2000);
        console.log("happy");
      })
      .after(4000, function() {
        this.stop();
        this.land();
        console.log("land");
      });
    },
  }

  return happyMap[seq];
}