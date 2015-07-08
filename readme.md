Pet Drone
======
The goal is to produce a drone that displays intention, feedback, and emotional state via visual 
and audio cues. This currently includes body movement (drone's animation sequences) and 
sound (drone's propellor sounds)

Utilizing LEDs might prove useful in the future.
Currently modifying the browser UI so it's easier to use for Wizard of Oz experiments.

Getting started
======
Connect to your ar drone 2 via WLAN, then run node.server.js open up localhost:3001 and you're ready to go.

Use `W, A, S, D` to move front, back and sideways. Use your `cursors` to go up/down or turn clockwise/counter clockwise.
Some animations can be triggered with `1-4`
`SPACE` for taking of and `esc` for landing.

When you crash use `e` to recover from emergency mode.

This project is heavily inspired from https://github.com/usefulthink/nodecopter-monitor . I just removed the three.js part and ported it from socket.io to faye since I like that better.

Dependencies
=======
You can install/update the node dependencies via `npm install -d`.
Dependencies for client code are managed via bower ( https://github.com/twitter/bower ). 
You need to have `ffmpeg` installed (it's used for the picture stuff)