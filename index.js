// IT325 Spring 2020
// Brent Reeves
// socket.io example for 4 clients
//
const express = require("express");
const path = require("path");
const { finished } = require("stream");
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
let wall11; 
let wall12; 
let wall13; 
let wall14; 
let wall15; 
let wall16; 
let wall17; 
let wall18; 
let wall19; 
let wall20; 
let wall21; 
let wall22; 
let wall23; 
let wall24; 
let wall25; 
let wall26; 
let wall27; 
let wall28; 
let wall29; 
let wall30; 
let wall31; 
let wall32; 
let wall33; 
let wall34; 
let wall35; 
let wall36; 
let wall37; 
let wall38; 
let wall39; 
let wall40; 
let wall41; 
let wall42; 
let wall43; 
let wall44; 
let wall45; 
let wall46; 
let wall47; 
let wall48; 


box1 = new component(30, 0,   "blue",   15, 15, clientId, "box"); 
box2 = new component(30, 200,  "red",  15, 15, clientId, "box");

//horizontal walls
wall1 = new component(15, 15,  "black",   30, 2,  -1, "wall");
wall3 = new component(72, 15, "black",   72, 2,  -1, "wall");
wall5 = new component(175, 15, "black",   20, 2,  -1, "wall");
wall8 = new component(175, 32, "black",   68, 2,  -1, "wall");
wall12 = new component(30, 35, "black",   60, 2,  -1, "wall");
wall13 = new component(30, 35, "black",   60, 2,  -1, "wall");
wall14 = new component(30, 105, "black",  70, 2, -1,  "wall");
wall15 = new component(50, 85, "black",  70, 2, -1,   "wall");
wall17 = new component(33, 65, "black",  65, 2, -1, "wall");
wall18 = new component(55, 130, "black",  120, 2, -1, "wall");
wall19 = new component(140, 90, "black",  66, 2,  -1, "wall");
wall20 = new component(160, 110, "black",  43, 2,  -1, "wall");
wall19 = new component(140, 90, "black",  66, 2,  -1, "wall");
wall23 = new component(120, 65, "black",  30, 2,  -1, "wall");
wall25 = new component(0, 165, "black",  260, 2,  -1, "wall");
wall27 = new component(100, 150, "black",  40, 2,  -1, "wall");
wall30 = new component(55, 148, "black",  20, 2,  -1, "wall");
wall31 = new component(145, 32, "black",  30, 2,  -1, "wall");
wall32 = new component(172, 52, "black",  60, 2,  -1, "wall");
wall33 = new component(200, 72, "black",  60, 2,  -1, "wall");
wall38 = new component(200, 130, "black",  40, 2,  -1, "wall");
wall39 = new component(223, 90, "black",  18, 2,  -1, "wall");
wall41 = new component(230, 110, "black",  30, 2,  -1, "wall");
wall43 = new component(200, 147, "black",  40, 2,  -1, "wall");
wall48 = new component(0, -1, "black",  260, 1,  -1, "wall");


//vertical walls
wall2 = new component(45,  0, "black",  2, 17,  -1, "wall");
wall4 = new component(220, 0, "black",  2, 16,  -1, "wall");
wall6 = new component(175, 15, "black", 2, 18,  -1, "wall");
wall7 = new component(120, 15, "black",  2, 24, -1, "wall");
wall9 = new component(260, 0, "black",  2, 167,  -1, "wall");
wall10 = new component(70, 15, "black",  2, 20,  -1, "wall");
wall11 = new component(30, 55, "black",  2, 95,  -1, "wall");
wall16 = new component(120, 65, "black",  2, 66,  -1, "wall");
wall21 = new component(140, 90, "black",  2, 20,  -1, "wall");
wall22 = new component(172, 52, "black",  2, 40,  -1, "wall");
wall24 = new component(175, 130, "black",  2, 10,  -1, "wall");
wall26 = new component(100, 150, "black",  2, 17,  -1, "wall");
wall28 = new component(120, 130, "black",  2, 20,  -1, "wall");
wall29 = new component(55, 132, "black",  2, 18,  -1, "wall");
wall34 = new component(240, 15, "black",  2, 18,  -1, "wall");
wall35 = new component(200, 34, "black",  2, 18,  -1, "wall");
wall36 = new component(60, 52, "black",  2, 15,  -1, "wall");
wall37 = new component(170, 112, "black",  2, 20,  -1, "wall");
wall40 = new component(230, 90, "black",  2, 40,  -1, "wall");
wall42 = new component(200, 147, "black",  2, 18,  -1, "wall");
wall44 = new component(70, 85, "black",  2, 20,  -1, "wall");
wall45 = new component(140, 50, "black",  2, 17,  -1, "wall");
wall46 = new component(160, 150, "black",  2, 15,  -1, "wall");
wall47 = new component(-1, 0, "black",  1, 170,  -1, "wall");




var walls1;
var walls2;

walls1 = [wall47,wall48,wall46,wall45,wall44,wall43,wall42,wall41,wall40,wall39,wall38,wall37,wall36,wall35,wall34,wall33,wall32,wall31,wall30,wall29,wall28,wall27,wall26,wall25,wall24,wall23,wall22,wall21,wall20,wall19,wall18,wall17,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16]; 
var a = 200;
wall1 = new component(15, 15+a,  "black",   30, 2,  -1, "wall");
wall3 = new component(72, 15+a, "black",   72, 2,  -1, "wall");
wall5 = new component(175, 15+a, "black",   20, 2,  -1, "wall");
wall8 = new component(175, 32+a, "black",   68, 2,  -1, "wall");
wall12 = new component(30, 35+a, "black",   60, 2,  -1, "wall");
wall13 = new component(30, 35+a, "black",   60, 2,  -1, "wall");
wall14 = new component(30, 105+a, "black",  70, 2, -1,  "wall");
wall15 = new component(50, 85+a, "black",  70, 2, -1,   "wall");
wall17 = new component(33, 65+a, "black",  65, 2, -1, "wall");
wall18 = new component(55, 130+a, "black",  120, 2, -1, "wall");
wall19 = new component(140, 90+a, "black",  66, 2,  -1, "wall");
wall20 = new component(160, 110+a, "black",  43, 2,  -1, "wall");
wall19 = new component(140, 90+a, "black",  66, 2,  -1, "wall");
wall23 = new component(120, 65+a, "black",  30, 2,  -1, "wall");
wall25 = new component(0, 165+a, "black",  260, 2,  -1, "wall");
wall27 = new component(100, 150+a, "black",  40, 2,  -1, "wall");
wall30 = new component(55, 148+a, "black",  20, 2,  -1, "wall");
wall31 = new component(145, 32+a, "black",  30, 2,  -1, "wall");
wall32 = new component(172, 52+a, "black",  60, 2,  -1, "wall");
wall33 = new component(200, 72+a, "black",  60, 2,  -1, "wall");
wall38 = new component(200, 130+a, "black",  40, 2,  -1, "wall");
wall39 = new component(223, 90+a, "black",  18, 2,  -1, "wall");
wall41 = new component(230, 110+a, "black",  30, 2,  -1, "wall");
wall43 = new component(200, 147+a, "black",  40, 2,  -1, "wall");
wall48 = new component(0, -1+a, "black",  260, 1,  -1, "wall");


//vertical walls
wall2 = new component(45,  0+a, "black",  2, 17,  -1, "wall");
wall4 = new component(220, 0+a, "black",  2, 16,  -1, "wall");
wall6 = new component(175, 15+a, "black", 2, 18,  -1, "wall");
wall7 = new component(120, 15+a, "black",  2, 24, -1, "wall");
wall9 = new component(260, 0+a, "black",  2, 167,  -1, "wall");
wall10 = new component(70, 15+a, "black",  2, 20,  -1, "wall");
wall11 = new component(30, 55+a, "black",  2, 95,  -1, "wall");
wall16 = new component(120, 65+a, "black",  2, 66,  -1, "wall");
wall21 = new component(140, 90+a, "black",  2, 20,  -1, "wall");
wall22 = new component(172, 52+a, "black",  2, 40,  -1, "wall");
wall24 = new component(175, 130+a, "black",  2, 10,  -1, "wall");
wall26 = new component(100, 150+a, "black",  2, 17,  -1, "wall");
wall28 = new component(120, 130+a, "black",  2, 20,  -1, "wall");
wall29 = new component(55, 132+a, "black",  2, 18,  -1, "wall");
wall34 = new component(240, 15+a, "black",  2, 18,  -1, "wall");
wall35 = new component(200, 34+a, "black",  2, 18,  -1, "wall");
wall36 = new component(60, 52+a, "black",  2, 15,  -1, "wall");
wall37 = new component(170, 112+a, "black",  2, 20,  -1, "wall");
wall40 = new component(230, 90+a, "black",  2, 40,  -1, "wall");
wall42 = new component(200, 147+a, "black",  2, 18,  -1, "wall");
wall44 = new component(70, 85+a, "black",  2, 20,  -1, "wall");
wall45 = new component(140, 50+a, "black",  2, 17,  -1, "wall");
wall46 = new component(160, 150+a, "black",  2, 15,  -1, "wall");
wall47 = new component(-1, 0+a, "black",  1, 170,  -1, "wall");

walls2 = [wall47,wall48,wall46,wall45,wall44,wall43,wall42,wall41,wall40,wall39,wall38,wall37,wall36,wall35,wall34,wall33,wall32,wall31,wall30,wall29,wall28,wall27,wall26,wall25,wall24,wall23,wall22,wall21,wall20,wall19,wall18,wall17,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16]; 


console.log(walls1[0].y);

var walls = walls1.concat(walls2);

for(let p = 0; p < walls1.length; p++)
{
    console.log(walls1[p].y);
}

for(let p = 0; p < walls2.length; p++)
{
    console.log(walls2[p].y);
}

boxes = [box1, box2]; 

//var interval = setInterval(collisionCheck, 60);    
var speed = 1;  
function moveLeft(box)  { if(box.canMoveL) { box.x -= speed; setHoriBounds(box); } }
function moveRight(box) { if(box.canMoveR) { box.x += speed; setHoriBounds(box); } }
function moveUp(box)    { if(box.canMoveU) { box.y -= speed; setVertBounds(box); } }
function moveDown(box)  { if(box.canMoveB) { box.y += speed; setVertBounds(box); } }

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

function playerEnd(box)
{
    let L1 = box.boundL;
    let R1 = box.boundR;
    let B1 = box.boundB;
    let T1 = box.boundT;

    //if they ate the end cube
    if(L1 < 205 && R1 > 205 && T1 < 153 && B1 > 153 || L1 < 205 && R1 > 205 && T1 < 353 && B1 > 353)
    {
        return true;
    }    
    return false;

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

        if(playerEnd(boxes[id-1]))
        {
            let c = boxes[id-1].color;
            io.emit("end", {boxes: boxes, walls: walls, winner: c});
        }
        else 
        {
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
        }

        
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


