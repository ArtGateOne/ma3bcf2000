//ma3bcf2000v 1.0.8 by ArtGateOne

var easymidi = require('easymidi');
var osc = require("osc")

//config
midi_in = 'BCF2000';     //set correct midi in device name
midi_out = 'BCF2000';    //set correct midi out device name
localip = "127.0.0.1";
localport = 8001;   //recive port from ma3
remoteip = "127.0.0.1";
remoteport = 8000;  //send port to ma3

var auto_led_feedback = 1; //led feedback on controller (0 = off, 1 = on)
var auto_fader_feedback = 1;  //fader stay ion position - without feedback from MA3 (0 = off, 1 = on)

//Config (u can set any command)
//Right side buttons (10)
var command_0 = "ViewButton 1.1"; //Top right Up
var command_1 = "ViewButton 1.2"; //Top right 2
var command_2 = "Macro 9";        //Sore button
var command_3 = "ViewButton 1.3"; //Learn button
var command_4 = "Macro 10";       //Edit button
var command_5 = "ViewButton 1.4"; //Exit button
var command_6 = "Previous Page";  //Preset left arrow
var command_7 = "Next Page";      //Preset right arrow
var command_8 = "Macro 11";       //bottom left up
var command_9 = "ViewButton 1.5 ";//bottom right up
var command_10 = "Macro 12";      //bottom left
var command_11 = "ViewButton 1.7";//bottom right
//Encoder click (8)
var encoder1_click = "Macro 1";  //set command
var encoder2_click = "Macro 2";
var encoder3_click = "Macro 3";
var encoder4_click = "Macro 4";
var encoder5_click = "Macro 5";
var encoder6_click = "Macro 6";
var encoder7_click = "Macro 7";
var encoder8_click = "Macro 8";

//-----------------------------------------------END_Config



var F301 = 0;
var F302 = 0;
var F303 = 0;
var F304 = 0;
var F305 = 0;
var F306 = 0;
var F307 = 0;
var F308 = 0;

var keypressed = 0;

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

var input = new easymidi.Input(midi_in);  //Open midi in
var output = new easymidi.Output(midi_out);//Open midi out

midiclear();

// Create an osc.js UDP Port listening on port 8000.
var udpPort = new osc.UDPPort({
  localAddress: localip,
  localPort: localport,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {

  if (oscMsg.address == "/Fader201") { move_fader(0, oscMsg.args[0].value); }//if get Fader2xx ---> control midi fader
  else if (oscMsg.address == "/Fader202") { move_fader(1, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader203") { move_fader(2, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader204") { move_fader(3, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader205") { move_fader(4, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader206") { move_fader(5, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader207") { move_fader(6, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader208") { move_fader(7, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Fader301") {
    F301 = oscMsg.args[0].value;
    light_encoder(48, F301);
  }
  else if (oscMsg.address == "/Fader302") {//if get Fader3xx ---> control encoder led
    F302 = oscMsg.args[0].value;
    light_encoder(49, F302);
  }
  else if (oscMsg.address == "/Fader303") {
    F303 = oscMsg.args[0].value;
    light_encoder(50, F303);
  }
  else if (oscMsg.address == "/Fader304") {
    F304 = oscMsg.args[0].value;
    light_encoder(51, F304);
  }
  else if (oscMsg.address == "/Fader305") {
    F305 = oscMsg.args[0].value;
    light_encoder(52, F305);
  }
  else if (oscMsg.address == "/Fader306") {
    F306 = oscMsg.args[0].value;;
    light_encoder(53, F306);
  }
  else if (oscMsg.address == "/Fader307") {
    F307 = oscMsg.args[0].value;
    light_encoder(54, F307);
  }
  else if (oscMsg.address == "/Fader308") {
    F308 = oscMsg.args[0].value;
    light_encoder(55, F308);
  }
  else if (oscMsg.address == "/Key301") {//if get Keyxxx ---> control key led
    output.send('noteon', { note: 16, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key302") {
    output.send('noteon', { note: 17, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key303") {
    output.send('noteon', { note: 18, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key304") {
    output.send('noteon', { note: 19, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key305") {
    output.send('noteon', { note: 20, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key306") {
    output.send('noteon', { note: 21, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key307") {
    output.send('noteon', { note: 22, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key308") {
    output.send('noteon', { note: 23, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key201") {
    output.send('noteon', { note: 24, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key202") {
    output.send('noteon', { note: 25, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key203") {
    output.send('noteon', { note: 26, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key204") {
    output.send('noteon', { note: 27, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key205") {
    output.send('noteon', { note: 28, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key206") {
    output.send('noteon', { note: 29, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key207") {
    output.send('noteon', { note: 30, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
  else if (oscMsg.address == "/Key208") {
    output.send('noteon', { note: 31, velocity: (oscMsg.args[0].value * 127), channel: 0 });
  }
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {

  console.log("READY");

});

input.on('pitch', function (msg) {//recive fader midi and send to osc

  if (auto_fader_feedback == 1) {
    output.send('pitch', { channel: msg.channel, value: msg.value });
  }

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


input.on('cc', function (msg) {//ENCODERS
  if (msg.value == 1) { encodervalue = 163.68; }
  else if (msg.value == 2) { encodervalue = 327.36; }
  else if (msg.value == 3) { encodervalue = 654.72; }
  else if (msg.value == 4) { encodervalue = 1309.44; }
  else if (msg.value == 65) { encodervalue = -163.68; }
  else if (msg.value == 66) { encodervalue = -327.36; }
  else if (msg.value == 67) { encodervalue = -654.72; }
  else if (msg.value == 68) { encodervalue = -1309.44; }

  if (msg.controller == 16) {//recive encoder midi - and send to osc
    F301 = add_value(F301, encodervalue);
    light_encoder(48, F301);
    udpPort.send({ address: "/Fader301", args: [{ type: "i", value: F301 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 17) {
    F302 = add_value(F302, encodervalue);
    light_encoder(49, F302);
    udpPort.send({ address: "/Fader302", args: [{ type: "i", value: F302 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 18) {
    F303 = add_value(F303, encodervalue);
    light_encoder(50, F303);
    udpPort.send({ address: "/Fader303", args: [{ type: "i", value: F303 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 19) {
    F304 = add_value(F304, encodervalue);
    light_encoder(51, F304);
    udpPort.send({ address: "/Fader304", args: [{ type: "i", value: F304 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 20) {
    F305 = add_value(F305, encodervalue);
    light_encoder(52, F305);
    udpPort.send({ address: "/Fader305", args: [{ type: "i", value: F305 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 21) {
    F306 = add_value(F306, encodervalue);
    light_encoder(53, F306);
    udpPort.send({ address: "/Fader306", args: [{ type: "i", value: F306 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 22) {
    F307 = add_value(F307, encodervalue);
    light_encoder(54, F307);
    udpPort.send({ address: "/Fader307", args: [{ type: "i", value: F307 }] }, remoteip, remoteport);
  }
  else if (msg.controller == 23) {
    F308 = add_value(F308, encodervalue);
    light_encoder(55, F308);
    udpPort.send({ address: "/Fader308", args: [{ type: "i", value: F308 }] }, remoteip, remoteport);
  }
});


input.on('noteon', function (msg) {//recive midi keys and send to osc

  if (auto_led_feedback == 1) {
    output.send('noteon', { note: msg.note, velocity: msg.velocity, channel: 0 });
  }

  if (msg.velocity == 127) {
    keypressed = 1;
  } else {
    keypressed = 0;
  }

  if (msg.note >= 16 && msg.note <= 23) {
    udpPort.send({
      address: "/Key" + (msg.note + 285),
      args: [
        {
          type: "i",
          value: keypressed
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 24 && msg.note <= 31) {
    udpPort.send({
      address: "/Key" + (msg.note + 177),
      args: [
        {
          type: "i",
          value: keypressed
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note == 32)//Encoder1 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder1_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 33)//Encoder2 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder2_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 34)//Encoder3 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder3_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 35)//Encoder4 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder4_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 36)//Encoder5 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder5_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 37)//Encoder6 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder6_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 38)//Encoder7 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder7_click }] }, remoteip, remoteport); }
    } else { }

  else if (msg.note == 39)//Encoder8 CLick
    if (msg.velocity == 127) {
      { udpPort.send({ address: "/cmd", args: [{ type: "s", value: encoder8_click }] }, remoteip, remoteport); }
    } else { }

  //Right side buttons
  else if (msg.note == 40) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_1 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 41) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_0 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 42) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_4 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 43) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_3 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 44) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_2 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 45) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_5 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 46) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_6 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 47) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_7 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 91) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_8 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 92) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_9 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 93) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_10 }] }, remoteip, remoteport); }
  }
  else if (msg.note == 94) {
    if (msg.velocity == 127) { udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_11 }] }, remoteip, remoteport); }
  }

});

//midi clear function
function midiclear() {
  for (i = 0; i < 128; i++) {
    output.send('noteon', { note: i, velocity: 0, channel: 0 });
    output.send('cc', { controller: i, value: 0, channel: 0});
    if (i < 9){
      output.send('pitch', { value: 0, channel: i});
    }
    //sleep(10, function () { });
  }
  return;
}

function add_value(fader_value, encodervalue) {

  fader_value = fader_value + encodervalue;
  if (fader_value < 0) {
    fader_value = 0;
  } else if (fader_value > 16368) {
    fader_value = 16368;
  }

  return fader_value;
}


function light_encoder(controller_nr, fader_value) {
  var led = 0;
  if (fader_value == -1) { led = 32; }
  else if (fader_value == 0) { led = 33; }
  else if (fader_value > 0 && fader_value <= 1636) { led = 34; }
  else if (fader_value > 1636 && fader_value <= 3273) { led = 35; }
  else if (fader_value > 3273 && fader_value <= 4910) { led = 36; }
  else if (fader_value > 4910 && fader_value <= 6547) { led = 37; }
  else if (fader_value > 6547 && fader_value <= 8184) { led = 38; }
  else if (fader_value > 8184 && fader_value <= 9820) { led = 39; }
  else if (fader_value > 9820 && fader_value <= 11457) { led = 40; }//70
  else if (fader_value > 11457 && fader_value <= 13094) { led = 41; }
  else if (fader_value > 13094 && fader_value <= 14731) { led = 42; }
  else if (fader_value > 14731 && fader_value <= 16368) { led = 43; }
  output.send('cc', { controller: controller_nr, value: led, channel: 0 });

  return;
}

function move_fader(channel_nr, fader_value) {
  if (fader_value == -1) {
    fader_value = 0;
  }

  output.send('pitch', { value: fader_value, channel: channel_nr });

  return;
}

