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
let wall5; 
let wall6; 
let wall7; 
let wall8; 
let wall9; 
let wall10; 

box1 = new component(20, 20,   "blue",   15, 15, clientId, "box"); 
box2 = new component(440, 20,  "brown",  15, 15, clientId, "box");

//horizontal walls
wall1 = new component(15, 15,  "green",   30, 2,  -1, "wall");
wall3 = new component(75, 15, "yellow",   70, 2,  -1, "wall");
wall5 = new component(175, 15, "green",   20, 2,  -1, "wall");
wall8 = new component(175, 32, "black",   90, 2,  -1, "wall");



//vertical walls
wall2 = new component(45,  0, "green",  2, 16,  -1, "wall");
wall4 = new component(220, 0, "black",  2, 16,  -1, "wall");
wall6 = new component(175, 15, "green", 2, 18,  -1, "wall");
wall7 = new component(115, 15, "purple",  2, 32, -1, "wall");
wall9 = new component(260, 0, "yellow",  2, 32,  -1, "wall");
wall10 = new component(70, 15, "green",  2, 15,  -1, "wall");

boxes = [box1, box2]; 
walls = [wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10]; 

//var interval = setInterval(collisionCheck, 60);      
function moveLeft(box)  { if(box.canMoveL) { box.x -= 1; setHoriBounds(box); } }
function moveRight(box) { if(box.canMoveR) { box.x += 1; setHoriBounds(box); } }
function moveUp(box)    { if(box.canMoveU) { box.y -= 1; setVertBounds(box); } }
function moveDown(box)  { if(box.canMoveB) { box.y += 1; setVertBounds(box); } }

function setHoriBounds(box)
{
    box.boundL = box.x;
    box.boundR = box.x + box.width;
}

function setVertBounds(box)
{
    box.boundT = box.y;
    box.boundB = box.y + box.height;
}


function collisionCheckLeft(box)
{
    process.stdout.write("-");
    
    let noWallHit = true;
        
    let L1 = box.boundL;
    let T1 = box.boundT;
    let B1 = box.boundB;
        
    for(let i = 0; i < walls.length; i++)
    {
        let R2 = walls[i].boundR;
        let T2 = walls[i].boundT;
        let B2 = walls[i].boundB;
        
        if(L1 == R2 && ((T1 > T2 && B1 < B2) || ( T1 == T2 ) || (T2 > T1 && T2 < B1) || ( B1 == B2 ) || (B2 > T1 && B2 < B1) || (T1 == T2 && B1 == B2 )))
        {
            //left side
            console.log("Left: ", walls[i].color);
            box.canMoveL = false;
            noWallHit = false;
        }
    }

    if(box.boundL == 0)
    {
        box.canMoveL = false;
        noWallHit = false;
    }    

        //if no wall has been hit then player can move anywhere
    if(noWallHit)
    {
        box.canMoveL = true;
    }
    
} 

function collisionCheckRight(box)
{
    process.stdout.write("-");
    
    let noWallHit = true;
        
    let R1 = box.boundR;
    let T1 = box.boundT;
    let B1 = box.boundB;
        
    for(let i = 0; i < walls.length; i++)
    {
        let L2 = walls[i].boundL;
        let T2 = walls[i].boundT;
        let B2 = walls[i].boundB;
        
        if(R1 == L2 && ((T1 > T2 && B1 < B2) || ( T1 == T2  ) || (T2 > T1 && T2 < B1) || ( B1 == B2 ) || (B2 > T1 && B2 < B1) || (T1 == T2 && B1 == B2 ) ))
        {
            //left side
            console.log("Right: ", walls[i].color);
            box.canMoveR = false;
            noWallHit = false;
        }

    }

    if(box.boundR == 500)
    {
        box.canMoveR = false;
        noWallHit = false;
    } 

    //if no wall has been hit then player can move anywhere
    if(noWallHit)
    {
        box.canMoveR = true;
    }
    
    
} 

function collisionCheckUp(box)
{
    process.stdout.write("-");
    
    let noWallHit = true;
        
    let L1 = box.boundL;
    let R1 = box.boundR;
    let T1 = box.boundT;
        
    for(let i = 0; i < walls.length; i++)
    {
        let L2 = walls[i].boundL;
        let R2 = walls[i].boundR;
        let B2 = walls[i].boundB;
        
        if(T1 == B2 && ((L1 < L2 && R1 > L2) || (L1 == L2) || (L2 < L1 && R1 < R2) || (R1 == R2) || (L1 < R2 && R2 < R1) || (R1 == R2 && L1 == L2 )))
        {
            //left side
            console.log("Up: ", walls[i].color);
            box.canMoveU = false;
            noWallHit = false;
        }

    }

    if(box.boundT == 0)
    {
        box.canMoveU = false;
        noWallHit = false;
    } 

        //if no wall has been hit then player can move anywhere
    if(noWallHit)
    {
        box.canMoveU = true;
    }
    
    
} 

function collisionCheckBottom(box)
{
    process.stdout.write("-");
    
    let noWallHit = true;
        
    let L1 = box.boundL;
    let R1 = box.boundR;
    let B1 = box.boundB;
        
    for(let i = 0; i < walls.length; i++)
    {
        let L2 = walls[i].boundL;
        let R2 = walls[i].boundR;
        let T2 = walls[i].boundT;
        
        if(B1 == T2 && ((L1 < L2 && R1 > L2) || (L1 == L2) || (L2 < L1 && R1 < R2) || (R1 == R2) || (L1 < R2 && R2 < R1) || (R1 == R2 && L1 == L2 )))
        {
            //left side
            console.log("Bot: ", walls[i].color);
            box.canMoveB = false;
            noWallHit = false;
        }

    }

    if(box.boundB == 500)
    {
        box.canMoveB = false;
        noWallHit = false;
    } 

        //if no wall has been hit then player can move anywhere
    if(noWallHit)
    {
        box.canMoveB = true;
    }
    
} 



function component(x, y, color, width, height, player, type) {
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.x = x;
    this.y = y;    
    this.color = color;
    this.player = player;
    this.boundL = this.x;
    this.boundR = this.x + width;
    this.boundT = this.y;
    this.boundB = this.y + height;

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
            collisionCheckLeft(boxes[id-1]);
            moveLeft(boxes[id-1]);
        }

        if(msg.action == "right")
        {
            collisionCheckRight(boxes[id-1]);
            moveRight(boxes[id-1]);
        }

        if(msg.action == "up")
        {
            collisionCheckUp(boxes[id-1]);
            moveUp(boxes[id-1]);
        }

        if(msg.action == "down")
        {
            collisionCheckBottom(boxes[id-1]);
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


