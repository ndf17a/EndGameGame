// IT325 
// Brent Reeves
// socket.io example for 2 clients and keyboard events
//
$(function () {
var maze = true;
var tag = false;

	let  canvas = document.getElementById("canvas");
	let  ctx = canvas.getContext("2d");
	let  socket = io();
	let  myId = "";
	let  winnerColor = "";

	////////////////////
	let  myGameArea = {
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

		if(myId < 3 && maze)
		{
			if (myGameArea.keys && myGameArea.keys[37]) //left
			{
				socket.emit("boxesMaze", {sender: myId, action: 'left', text: '(' + myId + ') left!'});
			}
			if (myGameArea.keys && myGameArea.keys[39]) //right
			{
				socket.emit("boxesMaze", {sender: myId, action: 'right', text: '(' + myId + ') right!'});
			}
			if (myGameArea.keys && myGameArea.keys[38]) // up 
			{
				socket.emit("boxesMaze", {sender: myId, action: 'up', text: '(' + myId + ') up!'});
			}
			if (myGameArea.keys && myGameArea.keys[40]) //down
			{
				socket.emit("boxesMaze", {sender: myId, action: 'down', text: '(' + myId + ') down!'});
			}
		}

		if(myId < 5 && tag)
		{
			if (myGameArea.keys && myGameArea.keys[37])  //left
			{
				socket.emit("boxesTag", {sender: myId, action: 'left', text: '(' + myId + ') left!'});
			}
			if (myGameArea.keys && myGameArea.keys[39]) //right
			{
				socket.emit("boxesTag", {sender: myId, action: 'right', text: '(' + myId + ') right!'});
			}
			if (myGameArea.keys && myGameArea.keys[38]) // up 
			{
				socket.emit("boxesTag", {sender: myId, action: 'up', text: '(' + myId + ') up!'});
			}
			if (myGameArea.keys && myGameArea.keys[40]) //down
			{
				socket.emit("boxesTag", {sender: myId, action: 'down', text: '(' + myId + ') down!'});
			}
		}

	}


		///////////////////
			

		function drawMaze(boxes, walls, winner)
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
			if(maze)
				socket.emit("restartMaze", {sender: myId});
			if(tag)
				socket.emit("restartTag", {sender: myId});


		})

		

		socket.on("restartReadyMaze", function (msg) {
			drawMaze(msg.boxes, msg.walls, 0);
		});



		socket.on("startMaze", function (msg) {
			myGameArea.stop();
			maze = true;
			tag = false;
			myGameArea.start(msg.boxes);
		});

		//myId goes 1,2
		socket.on("boxesMaze", function (msg) {
			drawMaze(msg.boxes, msg.walls, 0);
		});

		socket.on("endMaze", function (msg) {
			winnerColor = msg.winner;
			drawMaze(msg.boxes, msg.walls, 1);
			myGameArea.stop();

			
		});

		socket.on("welcomeMaze", function (msg) {
			myId = msg.id;
			console.log(msg.id);
			let  c = document.getElementById("p");

			if(myId > 2 )
				c.textContent = "You are just viewer (" + myId +  ")";
			else 
				c.textContent = "You are player " + msg.id + " (" + msg.boxes[myId-1].color + ")";

			
		});
	

		///////////////////
			

		function drawboxesTag(boxes)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for(let i = 0; i < 4; i++)
			{
				ctx.fillStyle = boxes[i].color;
				ctx.beginPath();
				// x y w h
				ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
				ctx.stroke();

				//if they are not the tagger give them a black outline else red outline
				if(boxes[i].tagger == 0) { ctx.strokeStyle = "black"; }
				else { ctx.strokeStyle = "#FF0000"; }
				ctx.beginPath();
				ctx.moveTo(boxes[i].boundL, boxes[i].boundT);
				ctx.lineTo(boxes[i].boundL, boxes[i].boundB);
				ctx.lineTo(boxes[i].boundR, boxes[i].boundB);
				ctx.lineTo(boxes[i].boundR, boxes[i].boundT);
				ctx.lineTo(boxes[i].boundL, boxes[i].boundT);
				ctx.stroke();

				if(boxes[i].tagger == 0) { ctx.strokeStyle = "black"; }
				else { ctx.strokeStyle = "#FF0000"; }
				ctx.beginPath();
				ctx.moveTo(boxes[i].boundL+10, boxes[i].boundT+10);
				ctx.lineTo(boxes[i].boundL+10, boxes[i].boundB-10);
				ctx.lineTo(boxes[i].boundR-10, boxes[i].boundB-10);
				ctx.lineTo(boxes[i].boundR-10, boxes[i].boundT+10);
				ctx.lineTo(boxes[i].boundL+10, boxes[i].boundT+10);
				ctx.stroke();

				let str = "" + (i+1);
				if(myId == i+1)
				{
					ctx.fillStyle = "white";
					ctx.font = "20px Arial";
					ctx.fillText(str, boxes[i].boundL+14, boxes[i].boundT+28);
				}
				else
				{
					ctx.fillStyle = "black";
					ctx.font = "10px Arial";
					ctx.fillText(str, boxes[i].boundL+17, boxes[i].boundT+24);
				}
				
				if(boxes[i].restart)
				{
					console.log("restartfromdraw");
					let a = i + 1 + " wants to restart...";
					ctx.fillStyle = "black";
					ctx.font = "10px Arial";
					ctx.fillText(a, boxes[i].boundL-10, boxes[i].boundB+10);
				}
				
			}

			
		}

		
		$("#gameMode").click(function (e) {
			if(maze)
			{
				document.getElementById("gameMode").textContent = "maze";
				socket.emit("restartTag", {sender: myId, action: 'start' });

			}
			if(tag)
			{
				//document.getElementById("gameMode").textContent = "tag";
				//socket.emit("restartMaze", {sender: myId, action: 'start' });
			}

		})

		socket.on("startTag", function (msg) {
			myGameArea.stop();
			tag = true;
			maze = false;
			console.log("starting tag");
			myGameArea.start(msg.boxes);
		});

		//myId goes 1,2,3,4
		socket.on("boxesTag", function (msg) {
			drawboxesTag(msg.boxesTag);
		});

		socket.on("restartReadyTag", function (msg) {
			drawboxesTag(msg.boxesTag);
		});

		socket.on("welcomeTag", function (msg) {
			myId = msg.id;
			console.log(msg.id);
			let  c = document.getElementById("p");
			if(myId > 4 )
				c.textContent = "You are just viewer (" + myId +  ")";
			else 
				c.textContent = "You are player " + msg.id + " (" + msg.boxesTag[myId-1].color + ")";

			
		});

		
		socket.on("connect", function (msg) {
			console.log("i'm connected...");
		});
	
	

});
