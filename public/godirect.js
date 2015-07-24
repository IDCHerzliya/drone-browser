// var exports = module.exports = {};

// var goDirectMap = {
//   "happy": function() { 
//         this.animate('phiDance', 15); 
//         console.log('happy!!!'); 
//       }
// }

// exports.name = function() {
//     console.log('My name is Lemmy Kilmister');
//     return goDirectMap;
// };

goDirectMap = {
//   // "happy": ".after(3000, function() { \
//   //       this.animate('phiDance', 15); \
//   //       console.log('happy!!!'); \
//   //     }) \
//   //     .after(1000, function() { \
//   //       this.stop(); \
//   //       this.land(); \
//   //       console.log('land!!!'); \
//   //     })"
//   // "happy": "after"
//   // "happy" : "function() {\
//   //             this.animate('phiDance', 15);\
//   //             console.log('happy!!!');\
//   //           }"
//   // "happy" : function() {
//   //             this.animate('phiDance', 15);
//   //             console.log('happy!!!');
//   //           }
  // "happy": "function test() {\
  //   drone\
  //     .after(3000, function() { \
  //     this.animate('phiDance', 15); \
  //     console.log('happy!!!'); \
  //   }) \
  //   .after(1000, function() { \
  //     this.stop(); \
  //     this.land(); \
  //     console.log('land!!!'); \
  //   })}"

  "happy": function test() {
      drone
        .after(1000, function() { 
        this.animate('phiDance', 15); 
        console.log('happy!!!'); 
      }) 
      .after(1000, function() { 
        this.stop(); 
        this.land(); 
        console.log('land!!!'); 
      })}
}

// // .after(3000, function() {this.animate('phiDance', 15);console.log('happy!!!');}).after(1000, function() {this.stop();this.land();console.log('land!!!');});