//ma3bcf2000v 1.0.0 by ArtGateOne - DEMO - onlu faders

var easymidi = require('easymidi');
var osc = require("osc")

//config
midi_in = 'BCF2000';     //set correct midi in device name
midi_out = 'BCF2000';    //set correct midi out device name
localip = "127.0.0.1";
localport = 8001;   //recive port from ma3
remoteip = "127.0.0.1";
remoteport = 8000;  //send port to ma3


//MIDI
//display info
console.log("BCF2000 MA3 OSC");
console.log(" ");

//display all midi devices
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());

console.log(" ");

console.log("Connecting to midi device: " + midi_in);

var input = new easymidi.Input(midi_in);
var output = new easymidi.Output(midi_out);

midiclear();

// Create an osc.js UDP Port listening on port 8000.
var udpPort = new osc.UDPPort({
  localAddress: localip,
  localPort: localport,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {

  if (oscMsg.address == "/Fader201") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 0 });
  } else if (oscMsg.address == "/Fader202") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 1 });
  } else if (oscMsg.address == "/Fader203") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 2 });
  } else if (oscMsg.address == "/Fader204") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 3 });
  } else if (oscMsg.address == "/Fader205") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 4 });
  } else if (oscMsg.address == "/Fader206") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 5 });
  } else if (oscMsg.address == "/Fader207") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 6 });
  } else if (oscMsg.address == "/Fader208") {
    output.send('pitch', { value: oscMsg.args[0].value, channel: 7 });
  }
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {

  console.log("READY");

});

input.on('pitch', function (msg) {//recive fader midi and send osc

  if (msg.channel == 0) {
    udpPort.send({ address: "/Fader201", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);

  }

  else if (msg.channel == 1) {
    udpPort.send({ address: "/Fader202", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 2) {
    udpPort.send({ address: "/Fader203", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 3) {
    udpPort.send({ address: "/Fader204", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 4) {
    udpPort.send({ address: "/Fader205", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 5) {
    udpPort.send({ address: "/Fader206", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 6) {
    udpPort.send({ address: "/Fader207", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

  else if (msg.channel == 7) {
    udpPort.send({ address: "/Fader208", args: [{ type: "i", value: (msg.value) }] }, remoteip, remoteport);
  }

});


input.on('cc', function (msg) {

});


input.on('noteon', function (msg) {

  if (msg.note == 46 && msg.velocity == 127) {
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: "Previous Page" }] }, remoteip, remoteport);
  }

  else if (msg.note == 47 && msg.velocity == 127) {
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: "Next Page" }] }, remoteip, remoteport);
  }

});


input.on('noteoff', function (msg) {

});


//midi clear function
function midiclear() {
  for (i = 0; i < 128; i++) {
    output.send('noteon', { note: i, velocity: 0, channel: 0 });
    //sleep(10, function () { });
  }
  return;
}


