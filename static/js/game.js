// IT325 
// Brent Reeves
// socket.io example for 2 clients and keyboard events
//
$(function () {

		
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var socket = io();
	var myId = "";
	var winnerColor = "";

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
			this.interval = setInterval(updateGameArea, 10);
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
		if(myId < 3)
		{
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
		

	}
	///////////////////
		

	function draw(boxes, walls, winner)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for(let i = 0; i < 2; i++)
		{
			ctx.fillStyle = boxes[i].color;
			ctx.beginPath();
			// x y w h
			ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
			ctx.stroke();


		}

		for(let i = 0; i < walls.length; i++)
		{
			ctx.fillStyle = walls[i].color;
			ctx.beginPath();
			// x y w h
			ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
			ctx.stroke();
		}

		for(let i = 0; i < 2; i++)
		{
			if(boxes[i].restart)
			{
				let str = boxes[i].color + " wants to restart...";
				ctx.font = "30px Arial";
				ctx.fillStyle = boxes[i].color;
				ctx.fillText(str, 10, 195);
			}
		}

		

		
		if(winner)
		{
			let str = winnerColor + " won!";
			ctx.font = "30px Arial";
			ctx.fillStyle = winnerColor;
			ctx.fillText(str, 50, 50);

		}
		else
		{
			ctx.fillStyle = "pink";
			ctx.beginPath();
			// x y w h
			ctx.fillRect(205, 153, 5, 5);
			ctx.stroke();

			ctx.fillStyle = "pink";
			ctx.beginPath();
			// x y w h
			ctx.fillRect(205, 353, 5, 5);
			ctx.stroke();
		}
		
	}

	//Controls for the buttons
	$("#restart").click(function (e) {
		console.log("restart");
		socket.emit("restart", {sender: myId});
    })

	

	socket.on("restartReady", function (msg) {
		draw(msg.boxes, msg.walls, 0);
    });

	socket.on("start", function (msg) {
		myGameArea.stop();
		myGameArea.start(msg.boxes);
    });

	//myId goes 1,2
	socket.on("boxes", function (msg) {
		draw(msg.boxes, msg.walls, 0);
    });

	socket.on("end", function (msg) {
		winnerColor = msg.winner;
		draw(msg.boxes, msg.walls, 1);
		myGameArea.stop();

		
	});

	

    socket.on("welcome", function (msg) {
		myId = msg.id;
		console.log(msg.id);
		var c = document.getElementById("p");
		if(myId > 2 )
			c.textContent = "You are just viewer (" + myId +  ")";
		else 
			c.textContent = "You are player " + msg.id + " (" + msg.boxes[myId-1].color + ")";

		
	});

});
