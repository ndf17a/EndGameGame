// IT325 Spring 2020
// Brent Reeves
// socket.io example for 4 clients
//
const express = require("express");
const path = require("path");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
const production = false;

app.use(express.static(path.join(__dirname, "./static")));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "./index.html");
});

var clients = new Map();
var clientId = 0;

var boxes;
var walls;

//when a user gets their id give them a box and put it in the boxes array
let box1;
let box2; 
let wall1; 
let wall2; 
let wall3; 
let wall4; 

box1 = new component(20, 20,   "blue",   10, 10, clientId, "box"); 
box2 = new component(440, 20,  "brown",  10, 10, clientId, "box");

wall1 = new component(70, 80,  "red",      30, 2,  -1, "wall");
wall2 = new component(70, 80,  "yellow",   2, 30,  -1, "wall");
wall3 = new component(90, 200, "black",    60, 2,  -1, "wall");
wall4 = new component(110, 220, "purple",    80, 2,  -1, "wall");

boxes = [box1, box2]; 
walls = [wall1,wall2,wall3,wall4]; 

//var interval = setInterval(collisionCheck, 60);      
function moveLeft(box)  {  if(box.canMoveL) { box.x -= 1; setBounds(box); } }
function moveRight(box) {  if(box.canMoveR) { box.x += 1; setBounds(box); } }
function moveUp(box)    {  if(box.canMoveU) { box.y -= 1; setBounds(box); } }
function moveDown(box)  {  if(box.canMoveB) { box.y += 1; setBounds(box); } }
var upDown = true;
var leftRight = true;
var wallMoveSpeed = 10;
function moveWalls()  { 
    process.stdout.write("w");
    for(let i = 0; i < walls.length; i++)
    {
        if(walls[i].color == "red" || walls[i].color == "yellow")
            if(leftRight)
            {
                walls[i].x += wallMoveSpeed; 
                setBounds(walls[i]);  
            }
            else
            {  
                walls[i].x -= wallMoveSpeed; 
                setBounds(walls[i]); 
            }


        if(walls[i].color == "black" || walls[i].color == "purple")
            if(upDown)
            {
                walls[i].y += wallMoveSpeed; 
                setBounds(walls[i]);  
            }
            else
            {  
                walls[i].y -= wallMoveSpeed; 
                setBounds(walls[i]); 
            }

        

        if(walls[i].y == 0 || walls[i].y == 500)
        {
            upDown = !upDown; 
        }  
        
        if(walls[i].x == 0 || walls[i].x == 500)
        {
            leftRight = !leftRight; 
        }     
    }

    io.emit("boxes", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all

}





function setBounds(box)
{
    box.Lx = box.x-1; 
    box.Ly = box.y + box.height/2;

    box.Rx = box.x + box.width + 1; 
    box.Ry = box.y + box.height/2;

    box.Tx = box.x + box.width/2; 
    box.Ty = box.y-1;

    box.Bx = box.x + box.width/2;
    box.By = box.y + box.height + 1;
}

function collisionCheck()
{
    process.stdout.write("|");
    for(let j = 0; j < 2; j++)
    {
        let noWallHit = true;
        
        let Lx1 = boxes[j].Lx;
        let Ly1 = boxes[j].Ly;
        let Rx1 = boxes[j].Rx;
        let Ry1 = boxes[j].Ry;
        let Tx1 = boxes[j].Tx;
        let Ty1 = boxes[j].Ty;
        let Bx1 = boxes[j].Bx;
        let By1 = boxes[j].By;
        
        for(let i = 0; i < walls.length; i++)
        {
            let Lx2 = walls[i].Lx;
            let Rx2 = walls[i].Rx;
            let Ty2 = walls[i].Ty;
            let By2 = walls[i].By;
        
            if(Lx1 > Lx2 && Lx1 < Rx2 && Ly1 > Ty2 && Ly1 < By2 )
            {
                //left side
                console.log("left: ", walls[i].color);
                boxes[j].canMoveL = false;
                noWallHit = false;
            }

            if(Tx1 > Lx2 && Tx1 < Rx2 && Ty1 > Ty2 && Ty1 < By2 )
            {
                //top
                console.log("top: ", walls[i].color);
                boxes[j].canMoveU = false;
                noWallHit = false;
            }

            if(Rx1 > Lx2 && Rx1 < Rx2 && Ry1 > Ty2 && Ry1 < By2 )
            {
                //bottom
                console.log("right: ", walls[i].color);
                boxes[j].canMoveR = false;
                noWallHit = false;

                //io.emit("boxes", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from collisionCheck" }); 
            }

            if(Bx1 > Lx2 && Bx1 < Rx2 && By1 > Ty2 && By1 < By2 )
            {
                //right side
                console.log("bottom: ", walls[i].color);
                boxes[j].canMoveB = false;
                noWallHit = false;
            }
        }

        //if no wall has been hit then player can move anywhere
        if(noWallHit)
        {
            boxes[j].canMoveL = true;
            boxes[j].canMoveR = true;
            boxes[j].canMoveU = true;
            boxes[j].canMoveB = true;
        }
    }
    
}


function component(x, y, color, width, height, player, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.x = x;
    this.y = y;    
    this.color = color;

    this.Lx = x; 
    this.Ly = y + height/2;

    this.Rx = x + width; 
    this.Ry = y + height/2;

    this.Tx = x + width/2; 
    this.Ty = y;

    this.Bx = x + width/2;
    this.By = y + height;
    
    this.canMoveL = true;
    this.canMoveR = true;
    this.canMoveT = true;
    this.canMoveB = true;

    if(type == "box")
        this.player = player;
    else if(type == "wall")
        this.player = -1;

}

function aKey(aSocket) {
    if (production) return aSocket.handshake.address;
    else return aSocket.id;
}

io.on("connection", function (socket) {

    // remember this socket id
    clientId += 1;
    // var aKey = socket.handshake.address; // production ok, but testing difficult
    aKey = socket.id;
    clients.set(aKey, { id: clientId });
    console.log("connection: " + socket.id + " clientId: " + clientId + " key: " + aKey );
    socket.emit("welcome", { id: clientId });

    //console.log(clientId);
    if(clientId > 2)
    {
        //dont let the do anything 
        boxes.push(new component(0, 0,  "", 0, 0, clientId, 0));
    }
    var interval = setInterval(moveWalls, 30);

    //Start the game
    io.emit("start", {boxes: boxes, walls: walls}); // io.emit sends to all
    io.emit("boxes", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all

    socket.on("start", function (msg) {
        io.emit("start", {boxes: boxes, walls: walls}); // io.emit sends to all
        io.emit("boxes", {boxes: boxes, walls: walls}); // io.emit sends to all
    });


    //Game things
    socket.on("boxes", function (msg) {
        var info = clients.get(socket.id);
        var id = info.id;

        if(msg.action == "left")
        {
            collisionCheck();
            moveLeft(boxes[id-1]);
        }

        if(msg.action == "right")
        {
            collisionCheck();
            moveRight(boxes[id-1]);
        }

        if(msg.action == "up")
        {
            collisionCheck();
            moveUp(boxes[id-1]);
        }

        if(msg.action == "down")
        {
            collisionCheck();
            moveDown(boxes[id-1]);
        }

        io.emit("boxes", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all
    });



});


io.on("disconnect", function (socket) {
    console.log(
	"disconnect from: " + socket.io + "  ip: " + socket.handshake.address
    );
});

http.listen(port, function () {
    console.log("listening on port " + port);
});


