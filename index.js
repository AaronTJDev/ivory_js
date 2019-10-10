var five = require('johnny-five');
var board = new five.Board();

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

board.on("ready", function(){
    // SLIDER INITIALIZATION 

    var s1 = new five.Sensor({
        pin: "A0",
        freq: 50,
        threshold:3
    });

    var s2 = new five.Sensor({
        pin: "A1",
        freq: 50,
        threshold:3
    });

    var s3 = new five.Sensor({
        pin: "A2",
        freq: 50,
        threshold:3
    });

    var s4 = new five.Sensor({
        pin: "A3",
        freq: 50,
        threshold:2
    });

    // ROTARY ENCODER INITIALIZATION

    var e1 = {
        pinA : new five.Sensor({
            pin:8,
            type: "digital",
            threshold:2,
            freq:4
        }),
        pinB : new five.Sensor({
            pin:9,
            type: "digital",
            threshold:2,
            freq:4
        }),
        press: new five.Button(10)
    }

    var e2 = {
        pinA : new five.Sensor({
            pin:2,
            type: "digital",
            threshold:2,
            freq:4
        }),
        pinB : new five.Sensor({
            pin:3,
            type: "digital",
            threshold:2,
            freq:4
        }),
        press: new five.Button(4)
    }

    var e3 = {
        pinA : new five.Sensor({
            pin:5,
            type: "digital",
            threshold:2,
            freq:4
        }),
        pinB : new five.Sensor({
            pin:6,
            type: "digital",
            threshold:2,
            freq:4
        }),
        press: new five.Button(7)
    }

    var e4 = {
        pinA : new five.Sensor({
            pin:11,
            type: "digital",
            threshold:2,
            freq:4
        }),
        pinB : new five.Sensor({
            pin:12,
            type: "digital",
            threshold:2,
            freq:4
        }),
        press: new five.Button(13)
    }

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html');
    });

    app.use(express.static(__dirname + '/public/'));

    io.on('connection', function(socket){
        s1.on("change", function(){
            let pos = this.scaleTo(1, 255);
            socket.emit('s1', pos);
        });

        s2.on("change", function(){
            let pos = this.scaleTo(1, 255);
            socket.emit('s2', pos);
        });

        s3.on("change", function(){
            let pos = this.scaleTo(1, 255);
            socket.emit('s3', pos);
        });
    
        s4.on("change", function(){
            let pos = this.scaleTo(1, 100);
            socket.emit('s4', pos/100);
        });

        // SOCKETS FOR ROTARY ENCODERS

        e1.pinA.on('change', function(){
            values.push(1)
            manageInputs('e1');
        });

        e1.pinB.on('change', function(){
            values.push(0)
            manageInputs('e1');
        });

        e1.press.on('press', function(){
            console.log('e1 pressed')
            socket.emit('e1', 2)
        })
      
        e2.pinA.on('change', function(){
            values.push(1)
            manageInputs('e2');
        });

        e2.pinB.on('change', function(){
            values.push(0)
            manageInputs('e2');
        });

        e2.press.on('press', function(){
            console.log('e2 pressed')
            socket.emit('e2', 2)
        })

        e3.pinA.on('change', function(){
            values.push(1)
            manageInputs('e3');
        });

        e3.pinB.on('change', function(){
            values.push(0)
            manageInputs('e3');
        });

        e3.press.on('press', function(){
            console.log('e3 pressed')
            socket.emit('e3', 2)
        })

        e4.pinA.on('change', function(){
            values.push(1)
            manageInputs('e4');
        });

        e4.pinB.on('change', function(){
            values.push(0)
            manageInputs('e4');
        });

        e4.press.on('press', function(){
            console.log('e4 pressed')
            socket.emit('e4', 2)
        });

        let values = [];
        
        /**
            Background:
                For rotary encoders there are two values that occur when rotating it
                Pin A and Pin B
                If you turn the encoder clockwise you will get Pin A's value first followed by the value of Pin B
                You will get the opposite if you turn the encoder counter-clockwise
            
            Problem:
                The Pins come from two different inputs
                This presents the problem of keeping track of the sequence of the values.
         * @param {object} socketName 
         */
        function manageInputs(socketName){
            if( values[0] === 1 && values[1] === 0  && values[2] === 1 ){
                console.log('up');
                socket.emit(socketName, 1);
            } else if( values[0] === 0 && values[1] === 1 && values[2] === 0  ){
                console.log('down');
                socket.emit(socketName, 0);
            }
            if(values.length > 5){
                values = []
            }
        }
    
    })
    
    http.listen(8000, function(){
        console.log('listening on *:8000');
    });
    
});



