// IT325 
// Brent Reeves
// socket.io example for 2 clients and keyboard events
//
$(function () {

		
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var socket = io();
	var myId = "";

	////////////////////

	
	

	var myGameArea = {
		canvas : document.getElementById("canvas"),
		start : function() {
			updateGameArea();
			this.canvas.width = 500;
			this.canvas.height = 500;
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			this.interval = setInterval(updateGameArea, 20);
			window.addEventListener('keydown', function (e) {
				e.preventDefault();
				myGameArea.keys = (myGameArea.keys || []);
				myGameArea.keys[e.keyCode] = (e.type == "keydown");
			})
			window.addEventListener('keyup', function (e) {
				myGameArea.keys[e.keyCode] = (e.type == "keydown");
			})
		},
		stop : function() {
			clearInterval(this.interval);
		},    
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	function updateGameArea() {
		//controls for arrow keys
		if (myGameArea.keys && myGameArea.keys[37])  //left
		{
			socket.emit("boxes", {sender: myId, action: 'left', text: '(' + myId + ') left!'});
		}
		if (myGameArea.keys && myGameArea.keys[39]) //right
		{
			socket.emit("boxes", {sender: myId, action: 'right', text: '(' + myId + ') right!'});
		}
		if (myGameArea.keys && myGameArea.keys[38]) // up 
		{
			socket.emit("boxes", {sender: myId, action: 'up', text: '(' + myId + ') up!'});
		}
		if (myGameArea.keys && myGameArea.keys[40]) //down
		{
			socket.emit("boxes", {sender: myId, action: 'down', text: '(' + myId + ') down!'});
		}

	}
	///////////////////
		

	function draw(boxes, walls)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for(let i = 0; i < 2; i++)
		{
			ctx.fillStyle = boxes[i].color;
			ctx.beginPath();
			// x y w h
			ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			ctx.stroke();

	
			ctx.strokeStyle = "red"; 
			ctx.beginPath();
			ctx.moveTo(boxes[i].Lx, boxes[i].Ly);
			ctx.lineTo(boxes[i].Lx-1, boxes[i].Ly);
			ctx.stroke();

			ctx.strokeStyle = "red"; 
			ctx.beginPath();
			ctx.moveTo(boxes[i].Rx, boxes[i].Ry);
			ctx.lineTo(boxes[i].Rx+1, boxes[i].Ry);
			ctx.stroke();

			ctx.strokeStyle = "red"; 
			ctx.beginPath();
			ctx.moveTo(boxes[i].Tx, boxes[i].Ty);
			ctx.lineTo(boxes[i].Tx, boxes[i].Ty-1);
			ctx.stroke();

			ctx.strokeStyle = "red"; 
			ctx.beginPath();
			ctx.moveTo(boxes[i].Bx, boxes[i].By);
			ctx.lineTo(boxes[i].Bx, boxes[i].By+1);
			ctx.stroke();
		}

		for(let i = 0; i < walls.length; i++)
		{
			ctx.fillStyle = walls[i].color;
			ctx.beginPath();
			// x y w h
			ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
			ctx.stroke();

			//if they are not the tagger give them a black outline else red outline
			// if(boxes[i].tagger == 0) { ctx.strokeStyle = "black"; }
			// else { ctx.strokeStyle = "red"; }
			// ctx.beginPath();
			// ctx.moveTo(boxes[i].boundL, boxes[i].boundT);
			// ctx.lineTo(boxes[i].boundL, boxes[i].boundB);
			// ctx.lineTo(boxes[i].boundR, boxes[i].boundB);
			// ctx.lineTo(boxes[i].boundR, boxes[i].boundT);
			// ctx.lineTo(boxes[i].boundL, boxes[i].boundT);
			// ctx.stroke();
		}
	}



	
	//Controls for the buttons
    $("#left").click(function (e) {
		socket.emit("boxes", {sender: myId, action: 'left',  text: myId + ' user is asking to go left!'  });
    })
	$("#right").click(function (e) {
		socket.emit("boxes", {sender: myId, action: 'right', text:  myId + ' user is asking to go right!'});
    })
	$("#up").click(function (e) {
		socket.emit("boxes", {sender: myId, action: 'up',    text:  myId + ' user is asking to go up!'   });
    })
	$("#down").click(function (e) {
		socket.emit("boxes", {sender: myId, action: 'down',  text:  myId + ' user is asking to go down!' });
    })
	$("#start").click(function (e) {
		socket.emit("start", {sender: myId, action: 'start' });
    })

	socket.on("start", function (msg) {
		myGameArea.start(msg.boxes);
    });

	//myId goes 1,2
	socket.on("boxes", function (msg) {
		draw(msg.boxes, msg.walls);

    });

	socket.on("welcome", function (msg) {
		console.log(msg);
		myId = msg.id;
		
	});

    socket.on("connect", function (msg) {
		console.log("i'm connected...");
    });

});
