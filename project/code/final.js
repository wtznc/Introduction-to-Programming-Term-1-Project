requirejs.config({
            baseUrl: "../src/"
            , urlArgs: "bust=" + Date.now()
        });
        require(["zMIDI", "zMIDIEvent", "MIDINotes"], function (zMIDI, zMIDIEvent, MIDINotes) {
            window.zMIDI = zMIDI;
            window.zMIDIEvent = zMIDIEvent;
            window.MIDINotes = MIDINotes;
        });
        //: Variables
        var connected = false;
        //: Function activated if connection was successful
        function onConnectSuccess() {
            var inputs = zMIDI.getInChannels();
            if (inputs.length === 0) {
                onConnectFailure();
            }
            else {
                var feedback = ""
                    , i = -1;
                inputs.forEach(function (input) {
                    feedback += input.manufacturer + " " + input.name;
                    zMIDI.addMessageListener(++i, messageHandler);
                });
                textSize(13);
                fill(0, 120, 153);
                background(250, 200, 200);
                connected = true;
                text("Connected to: " + inputs[0].manufacturer + " " + inputs[0].name, 5, 100);
            }
        }
        //
        function messageHandler(event) {
            var msg = "";
            switch (event.type) {
            case zMIDIEvent.NOTE_ON:
                var pitch = MIDINotes.getPitchByNoteNumber(event.value);
                msg = "note on event value: " + event.value + " ( note is " + pitch.note + pitch.octave + " @ " + pitch.frequency + "Hz ) " + "@ velocity " + event.velocity;
                break;
            case zMIDIEvent.NOTE_OFF:
                msg = "note off event value: " + event.value + " @ velocity " + event.velocity;
                break;
            case zMIDIEvent.CONTROL_CHANGE:
                msg = "CC event value: " + event.velocity;
                break;
            default:
                msg = "zMIDIEvent type : " + event.type + " with value " + event.value;
                break;
            }
            console.log("received on MIDI port " + event.port + ": " + msg + " coming in on channel " + event.channel + "<br />");
        }

        function onConnectFailure() {
            textSize(13);
            fill(255, 0, 0);
            smooth();
            text("Could not connect to MIDI peripherals... Try again.", 5, 100);
        }

        function showMessage(aMessage) {
            document.getElementById("status").innerHTML += aMessage;
        }

        function setup() {
            createCanvas(1366, 768);
            background(250, 200, 200);
        }

        function draw() {
            textSize(20);
            fill(0, 0, 0);
            smooth();
            text("Term 1 Project - wtyzi001", 5, 30);
            textSize(13);
            smooth();
            text("Introduction to Programming", 5, 50);
            text("Goldsmiths, University of London", 5, 70);
            if (connected == false) {
                drawConnectionButton();
                connectionButtonClicked();
            }
            if (connected == true) {
                drawPads();
            }
        }

        function drawConnectionButton() {
            fill(0, 100, 200);
            rect(250, 15, 150, 55);
            textSize(20);
            fill(0, 0, 0);
            text("Click to connect", 255, 50);
        }

        function connectionButtonClicked() {
            if ((mouseX > 250 && mouseX < 400) && (mouseY > 15 && mouseY < 70) && mouseIsPressed) {
                zMIDI.connect(onConnectSuccess, onConnectFailure);
            }
        }

        function drawPads() {
            var length = 100;
            var tmpY = 150;
            var tmpX = 10;
            var space = 100;
            for(var i = 0; i < 4; i++) {
                tmpX = 10;
                for(var j = 0; j < 4; j++) {
                    rect(tmpX, tmpY, length, length);
                    tmpX += space+20;
                }
                tmpY += space+20;
            }
        }

        function Pad() {

        }