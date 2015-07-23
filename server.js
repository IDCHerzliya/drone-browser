(function() {

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

  var app, currentImg, drone, express, faye, imageSendingPaused, path, server, socket;
  express = require("express");
  faye = require("faye");
  path = require("path");
  drone = require("ar-drone").createClient();
  drone.config('general:navdata_demo', 'TRUE');
  app = express();
  app.configure(function() {
    app.set('port', process.env.PORT || 3001);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    return app.use("/components", express.static(path.join(__dirname, 'components')));
  });
  server = require("http").createServer(app);
  new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
  }).attach(server);
  socket = new faye.Client("http://localhost:" + (app.get("port")) + "/faye");
  socket.subscribe("/drone/move", function(cmd) {
    var _name;
    console.log("move", cmd);
    return typeof drone[_name = cmd.action] === "function" ? drone[_name](cmd.speed) : void 0;
  });
  socket.subscribe("/drone/animate", function(cmd) {
    console.log('animate', cmd);
    return drone.animate(cmd.action, cmd.duration);
  });
  socket.subscribe("/drone/drone", function(cmd) {
    var _name;
    console.log('drone command: ', cmd);
    return typeof drone[_name = cmd.action] === "function" ? drone[_name]() : void 0;
  });
  socket.subscribe("/profile", function(cmd) {
    return console.log('profile: ', cmd);
  });
  socket.subscribe("/sequence", function(cmd) {
    console.log('drone sequence: ', cmd);

    seqMap = {
      "goDirect": goDirectMap[cmd.profile]
    }

    var seq = seqMap[cmd.seqName];
    console.log('seq: ' + typeof seq);
    return seq();
  });
  server.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });
  currentImg = null;
  drone.on('navdata', function(data) {
    return socket.publish("/drone/navdata", data);
  });
  // imageSendingPaused = false;
  // drone.createPngStream().on("data", function(frame) {
  //   currentImg = frame;
  //   if (imageSendingPaused) {
  //     return;
  //   }
  //   socket.publish("/drone/image", "/image/" + (Math.random()));
  //   imageSendingPaused = true;
  //   return setTimeout((function() {
  //     return imageSendingPaused = false;
  //   }), 100);
  // });
  // app.get("/image/:id", function(req, res) {
  //   res.writeHead(200, {
  //     "Content-Type": "image/png"
  //   });
  //   return res.end(currentImg, "binary");
  // });
}).call(this);
