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
var clientId = 2;

var maze = true;
var tag = false;

////////////////
var boxesTag;
var currentTagger = 0;
var pastTagger = -1;
var checkTag = 0;

//when a user gets their id give them a box and put it in the boxesTag array
let box1Tag;
let box2Tag;
let box3Tag;
let box4Tag;

box1Tag = new componentTag(20, 20,   "blue",   40, 40, clientId, 1); 
box2Tag = new componentTag(440, 20,  "purple",    40, 40, clientId, 0);
box3Tag = new componentTag(20, 440, "green",  40, 40, clientId, 0); 
box4Tag = new componentTag(440, 440,  "orange", 40, 40, clientId, 0);

boxesTag = [box1Tag, box2Tag, box3Tag, box4Tag]; 

var interval = setInterval(collisionCheck, 60); 

function moveLeftTag(box) { 

    if(box.boundL >= 0)
    {
        if(box.tagger == 1) 
        { 
            box.x -= 2; 
        } 
        else 
            box.x -= 3.5; 

        setHoriBounds(box); 
    }
    
}

function moveRightTag(box) {

    if(box.boundR <= 500)
    {
        if(box.tagger == 1) 
        { 
            box.x += 2; 
        } 
        else 
            box.x += 3.5; 

        setHoriBounds(box); 
    }
}

function moveUpTag(box) {

    if(box.boundT >= 0)
    {
        if(box.tagger == 1) 
        { 
            box.y -= 2; 
        } 
        else 
            box.y -= 3.5; 

        setVertBounds(box); 
    }
}

function moveDownTag(box) {

    if(box.boundB <= 500)
    {
        if(box.tagger == 1) 
        { 
            box.y += 2; 
        } 
        else 
            box.y += 3.5; 

        setVertBounds(box); 
    }
}



function collisionCheck()
{
    
        //checks if the tagger touches any runners
        let L1 = boxesTag[currentTagger].boundL;
        let R1 = boxesTag[currentTagger].boundR;
        let T1 = boxesTag[currentTagger].boundT;
        let B1 = boxesTag[currentTagger].boundB;
    
        for(let i = 0; i < 4; i++)
        {
            //if we just tagged someone and this is the iteration of the pastTagger skip
            //or if this iteration is the current tagger            
            if((checkTag != 0 && i == pastTagger) || i == currentTagger)
            {
                continue; 
            }
    
            let L2 = boxesTag[i].boundL;
            let R2 = boxesTag[i].boundR;
            let T2 = boxesTag[i].boundT;
            let B2 = boxesTag[i].boundB;
    
            let LL = L1 >= L2;
            let LR = L1 <= R2;
            let TT = T1 >= T2;
            let TB = T1 <= B2;
            let BT = B1 >= T2;
            let BB = B1 <= B2;
            let RL = R1 >= L2;
            let RR = R1 <= R2;
    
            if(LL && LR && TT && TB || LL && LR && BT && BB || RL && RR && BT &&  BB || RL && RR && TT && TB)
            {
                //tagged

                //make checkTag not 0 so collision check doesnt run
                checkTag++;

                boxesTag[currentTagger].tagger = 0;
                setHoriBounds(boxesTag[currentTagger]);
                setVertBounds(boxesTag[currentTagger]);
                
                boxesTag[i].tagger = 1;
                setHoriBounds(boxesTag[i]);
                setVertBounds(boxesTag[i]);
                console.log(boxesTag[currentTagger].color + " tagged " + boxesTag[i].color);

                pastTagger = currentTagger;
                currentTagger = i;

                io.emit("boxesTag", { sender: "server", boxesTag: boxesTag, text: "Sending boxesTag from collisionCheck" }); 
                break;
            }
        }

    //if its not 0
    if(checkTag != 0) 
    { 
        //increment until we hit 15 then make it 0 again 
        //effectively when someone is tagged wait a secound until we tag them again
        checkTag += 1;
        if(checkTag == 10) 
        {   
            checkTag = 0; 
            pastTagger = -1; 
        }
        
    }
}

///////////////
//when a user gets their id give them a box and put it in the boxes array
var boxes;
var player1 = false;
var player2 = false;
var player3 = false;
var player4 = false;

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


box1 = new componentMaze(30, 0,   "blue",   10, 10, clientId, "box"); 
box2 = new componentMaze(30, 200,  "purple",  10, 10, clientId, "box");

//horizontal walls
wall1 = new componentMaze(15, 15,  "black",   30, 2,  -1, "wall");
wall3 = new componentMaze(72, 15, "black",   72, 2,  -1, "wall");
wall5 = new componentMaze(175, 15, "black",   20, 2,  -1, "wall");
wall8 = new componentMaze(175, 32, "black",   68, 2,  -1, "wall");
wall12 = new componentMaze(30, 35, "black",   60, 2,  -1, "wall");
wall13 = new componentMaze(30, 35, "black",   60, 2,  -1, "wall");
wall14 = new componentMaze(30, 105, "black",  70, 2, -1,  "wall");
wall15 = new componentMaze(50, 85, "black",  70, 2, -1,   "wall");
wall17 = new componentMaze(33, 65, "black",  65, 2, -1, "wall");
wall18 = new componentMaze(55, 130, "black",  120, 2, -1, "wall");
wall19 = new componentMaze(140, 90, "black",  66, 2,  -1, "wall");
wall20 = new componentMaze(160, 110, "black",  43, 2,  -1, "wall");
wall19 = new componentMaze(140, 90, "black",  66, 2,  -1, "wall");
wall23 = new componentMaze(120, 65, "black",  30, 2,  -1, "wall");
wall25 = new componentMaze(0, 165, "black",  260, 2,  -1, "wall");
wall27 = new componentMaze(100, 150, "black",  40, 2,  -1, "wall");
wall30 = new componentMaze(55, 148, "black",  20, 2,  -1, "wall");
wall31 = new componentMaze(145, 32, "black",  30, 2,  -1, "wall");
wall32 = new componentMaze(172, 52, "black",  60, 2,  -1, "wall");
wall33 = new componentMaze(200, 72, "black",  60, 2,  -1, "wall");
wall38 = new componentMaze(200, 130, "black",  40, 2,  -1, "wall");
wall39 = new componentMaze(223, 90, "black",  18, 2,  -1, "wall");
wall41 = new componentMaze(230, 110, "black",  30, 2,  -1, "wall");
wall43 = new componentMaze(200, 147, "black",  40, 2,  -1, "wall");
wall48 = new componentMaze(0, -1, "black",  260, 1,  -1, "wall");


//vertical walls
wall2 = new componentMaze(45,  0, "black",  2, 17,  -1, "wall");
wall4 = new componentMaze(220, 0, "black",  2, 16,  -1, "wall");
wall6 = new componentMaze(175, 15, "black", 2, 18,  -1, "wall");
wall7 = new componentMaze(120, 15, "black",  2, 24, -1, "wall");
wall9 = new componentMaze(260, 0, "black",  2, 167,  -1, "wall");
wall10 = new componentMaze(70, 15, "black",  2, 20,  -1, "wall");
wall11 = new componentMaze(30, 55, "black",  2, 95,  -1, "wall");
wall16 = new componentMaze(120, 65, "black",  2, 66,  -1, "wall");
wall21 = new componentMaze(140, 90, "black",  2, 20,  -1, "wall");
wall22 = new componentMaze(172, 52, "black",  2, 40,  -1, "wall");
wall24 = new componentMaze(175, 130, "black",  2, 10,  -1, "wall");
wall26 = new componentMaze(100, 150, "black",  2, 17,  -1, "wall");
wall28 = new componentMaze(120, 130, "black",  2, 20,  -1, "wall");
wall29 = new componentMaze(55, 132, "black",  2, 18,  -1, "wall");
wall34 = new componentMaze(240, 15, "black",  2, 18,  -1, "wall");
wall35 = new componentMaze(200, 34, "black",  2, 18,  -1, "wall");
wall36 = new componentMaze(60, 52, "black",  2, 15,  -1, "wall");
wall37 = new componentMaze(170, 112, "black",  2, 20,  -1, "wall");
wall40 = new componentMaze(230, 90, "black",  2, 40,  -1, "wall");
wall42 = new componentMaze(200, 147, "black",  2, 18,  -1, "wall");
wall44 = new componentMaze(70, 85, "black",  2, 20,  -1, "wall");
wall45 = new componentMaze(140, 50, "black",  2, 17,  -1, "wall");
wall46 = new componentMaze(160, 150, "black",  2, 15,  -1, "wall");
wall47 = new componentMaze(-1, 0, "black",  1, 170,  -1, "wall");




var walls1;
var walls2;

walls1 = [wall47,wall48,wall46,wall45,wall44,wall43,wall42,wall41,wall40,wall39,wall38,wall37,wall36,wall35,wall34,wall33,wall32,wall31,wall30,wall29,wall28,wall27,wall26,wall25,wall24,wall23,wall22,wall21,wall20,wall19,wall18,wall17,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16]; 
var a = 200;
wall1 = new componentMaze(15, 15+a,  "black",   30, 2,  -1, "wall");
wall3 = new componentMaze(72, 15+a, "black",   72, 2,  -1, "wall");
wall5 = new componentMaze(175, 15+a, "black",   20, 2,  -1, "wall");
wall8 = new componentMaze(175, 32+a, "black",   68, 2,  -1, "wall");
wall12 = new componentMaze(30, 35+a, "black",   60, 2,  -1, "wall");
wall13 = new componentMaze(30, 35+a, "black",   60, 2,  -1, "wall");
wall14 = new componentMaze(30, 105+a, "black",  70, 2, -1,  "wall");
wall15 = new componentMaze(50, 85+a, "black",  70, 2, -1,   "wall");
wall17 = new componentMaze(33, 65+a, "black",  65, 2, -1, "wall");
wall18 = new componentMaze(55, 130+a, "black",  120, 2, -1, "wall");
wall19 = new componentMaze(140, 90+a, "black",  66, 2,  -1, "wall");
wall20 = new componentMaze(160, 110+a, "black",  43, 2,  -1, "wall");
wall19 = new componentMaze(140, 90+a, "black",  66, 2,  -1, "wall");
wall23 = new componentMaze(120, 65+a, "black",  30, 2,  -1, "wall");
wall25 = new componentMaze(0, 165+a, "black",  260, 2,  -1, "wall");
wall27 = new componentMaze(100, 150+a, "black",  40, 2,  -1, "wall");
wall30 = new componentMaze(55, 148+a, "black",  20, 2,  -1, "wall");
wall31 = new componentMaze(145, 32+a, "black",  30, 2,  -1, "wall");
wall32 = new componentMaze(172, 52+a, "black",  60, 2,  -1, "wall");
wall33 = new componentMaze(200, 72+a, "black",  60, 2,  -1, "wall");
wall38 = new componentMaze(200, 130+a, "black",  40, 2,  -1, "wall");
wall39 = new componentMaze(223, 90+a, "black",  18, 2,  -1, "wall");
wall41 = new componentMaze(230, 110+a, "black",  30, 2,  -1, "wall");
wall43 = new componentMaze(200, 147+a, "black",  40, 2,  -1, "wall");
wall48 = new componentMaze(0, -1+a, "black",  260, 1,  -1, "wall");


//vertical walls
wall2 = new componentMaze(45,  0+a, "black",  2, 17,  -1, "wall");
wall4 = new componentMaze(220, 0+a, "black",  2, 16,  -1, "wall");
wall6 = new componentMaze(175, 15+a, "black", 2, 18,  -1, "wall");
wall7 = new componentMaze(120, 15+a, "black",  2, 24, -1, "wall");
wall9 = new componentMaze(260, 0+a, "black",  2, 167,  -1, "wall");
wall10 = new componentMaze(70, 15+a, "black",  2, 20,  -1, "wall");
wall11 = new componentMaze(30, 55+a, "black",  2, 95,  -1, "wall");
wall16 = new componentMaze(120, 65+a, "black",  2, 66,  -1, "wall");
wall21 = new componentMaze(140, 90+a, "black",  2, 20,  -1, "wall");
wall22 = new componentMaze(172, 52+a, "black",  2, 40,  -1, "wall");
wall24 = new componentMaze(175, 130+a, "black",  2, 10,  -1, "wall");
wall26 = new componentMaze(100, 150+a, "black",  2, 17,  -1, "wall");
wall28 = new componentMaze(120, 130+a, "black",  2, 20,  -1, "wall");
wall29 = new componentMaze(55, 132+a, "black",  2, 18,  -1, "wall");
wall34 = new componentMaze(240, 15+a, "black",  2, 18,  -1, "wall");
wall35 = new componentMaze(200, 34+a, "black",  2, 18,  -1, "wall");
wall36 = new componentMaze(60, 52+a, "black",  2, 15,  -1, "wall");
wall37 = new componentMaze(170, 112+a, "black",  2, 20,  -1, "wall");
wall40 = new componentMaze(230, 90+a, "black",  2, 40,  -1, "wall");
wall42 = new componentMaze(200, 147+a, "black",  2, 18,  -1, "wall");
wall44 = new componentMaze(70, 85+a, "black",  2, 20,  -1, "wall");
wall45 = new componentMaze(140, 50+a, "black",  2, 17,  -1, "wall");
wall46 = new componentMaze(160, 150+a, "black",  2, 15,  -1, "wall");
wall47 = new componentMaze(-1, 0+a, "black",  1, 170,  -1, "wall");

walls2 = [wall47,wall48,wall46,wall45,wall44,wall43,wall42,wall41,wall40,wall39,wall38,wall37,wall36,wall35,wall34,wall33,wall32,wall31,wall30,wall29,wall28,wall27,wall26,wall25,wall24,wall23,wall22,wall21,wall20,wall19,wall18,wall17,wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16]; 

var walls = walls1.concat(walls2);


boxes = [box1, box2]; 

var speed = 1;  
function moveLeft(box)  { if(box.canMoveL) { box.x -= speed; setHoriBounds(box); } }
function moveRight(box) { if(box.canMoveR) { box.x += speed; setHoriBounds(box); } }
function moveUp(box)    { if(box.canMoveU) { box.y -= speed; setVertBounds(box); } }
function moveDown(box)  { if(box.canMoveB) { box.y += speed; setVertBounds(box); } }

//in both
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

function boxRestart(player)
{
    if(maze)
    {
        console.log("boxRestartMaze")
        if(player==1)
        {
            return(new componentMaze(30, 0,   "blue",   10, 10, boxes[0].player, "box")); 
        }
        if(player==2)
        {
            return(new componentMaze(30, 200,  "purple",  10, 10, boxes[1].player, "box"));
        }
    }

    

    if(tag)
    {

        box1Tag = new componentTag(20, 20,   "blue",   40, 40, boxesTag[0].player, boxesTag[0].tagger); 
        box2Tag = new componentTag(440, 20,  "purple",    40, 40, boxesTag[1].player, boxesTag[1].tagger);
        box3Tag = new componentTag(20, 440, "green",  40, 40, boxesTag[2].player, boxesTag[2].tagger); 
        box4Tag = new componentTag(440, 440,  "orange", 40, 40, boxesTag[3].player, boxesTag[3].tagger);

        console.log("boxRestartTag")
        if(player==1)
        {
            return(box1Tag); 
        }
        if(player==2)
        {
            return(box2Tag);
        }
        if(player==3)
        {
            return(box3Tag); 
        }
        if(player==4)
        {
            return(box4Tag);
        }
    }
    

}


function componentMaze(x, y, color, width, height, player, type) {
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
    this.restart = false;

    if(type == "box")
        this.player = player;
    else if(type == "wall")
        this.player = -1;

}

function componentTag(x, y, color, width, height, player, tagger) {
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.x = x;
    this.y = y;    
    this.color = color;
    this.player = player;
    this.tagger = tagger;
    this.boundL = this.x;
    this.boundR = this.x + width;
    this.boundT = this.y;
    this.boundB = this.y + height;
    this.restart = false;

}

function aKey(aSocket) {
    if (production) return aSocket.handshake.address;
    else return aSocket.id;
}

var playersAr = new Array(50);
for(let i = 0; i < 50; i++)
{
    playersAr[i] = 0;
}

io.on("connection", function (socket) {

    if(maze)
    {    
        // remember this socket id
        console.log(player1,player2);
        if(!player1)
        {
            console.log("No player one... Filling spot")
            player1 = true;
            boxes[0] = boxRestart(1);        
            aKey = socket.id;
            clients.set(aKey, { id: 1 });
            console.log("connection: " + socket.id + " clientId: " + 1 + " key: " + aKey );
            socket.emit("welcomeMaze", { id: 1, boxes: boxes });
            playersAr[0] = 1;
        }
        else if(!player2)
        {
            console.log("No player 2... Filling spot")
            player2 = true;
            boxes[1] = boxRestart(2);        
            aKey = socket.id;
            clients.set(aKey, { id: 2 });
            socket.emit("welcomeMaze", { id: 2, boxes: boxes });
            playersAr[1] = 1;
            console.log("connection: " + socket.id + " clientId: " + 2 + " key: " + aKey );

        }
        else
        {
            console.log("player1 and player2 are here");
            //console.log("clientID", clientId);
            //clientId += 1;

            for(let i = 0; i < playersAr.length; i++)
            {
                console.log(playersAr[i])
                if(playersAr[i] == 0)
                {
                    aKey = socket.id;
                    clients.set(aKey, { id: (i+1) });
                    console.log("connection: " + socket.id + " clientId: " + (i+1) + " key: " + aKey );
                    socket.emit("welcomeMaze", { id: (i+1), boxes: boxes });
                    playersAr[i] = 1;
                    boxes.push(new componentMaze(0, 0,  "", 0, 0, i+1, 0));
                    break;
                }
            }

        }


        //Start the game
        io.emit("startMaze", {boxes: boxes, walls: walls}); // io.emit sends to all
        io.emit("boxesMaze", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all

    }

    if(tag)
    {

           
        // remember this socket id
        console.log(player1,player2);
        if(!player1)
        {
            console.log("No player one... Filling spot")
            player1 = true;
            boxesTag[0] = boxRestart(1);        
            aKey = socket.id;
            clients.set(aKey, { id: 1 });
            console.log("connection: " + socket.id + " clientId: " + 1 + " key: " + aKey );
            socket.emit("welcomeTag", { id: 1, boxesTag: boxesTag });
            playersAr[0] = 1;
        }
        else if(!player2)
        {
            console.log("No player 2... Filling spot")
            player2 = true;
            boxesTag[1] = boxRestart(2);        
            aKey = socket.id;
            clients.set(aKey, { id: 2 });
            socket.emit("welcomeTag", { id: 2, boxesTag: boxesTag });
            playersAr[1] = 1;
            console.log("connection: " + socket.id + " clientId: " + 2 + " key: " + aKey );
    
        }
        else if(!player3)
        {
            console.log("No player 3... Filling spot")
            player3 = true;
            boxesTag[2] = boxRestart(3);        
            aKey = socket.id;
            clients.set(aKey, { id: 3 });
            socket.emit("welcomeTag", { id: 3, boxesTag: boxesTag });
            playersAr[2] = 1;
            console.log("connection: " + socket.id + " clientId: " + 3 + " key: " + aKey );
    
        }
        else if(!player4)
        {
            console.log("No player 4... Filling spot")
            player4 = true;
            boxesTag[3] = boxRestart(4);        
            aKey = socket.id;
            clients.set(aKey, { id: 4 });
            socket.emit("welcomeTag", { id: 4, boxesTag: boxesTag });
            playersAr[3] = 1;
            console.log("connection: " + socket.id + " clientId: " + 4 + " key: " + aKey );
        }
        else
        {
            console.log("player1234 are here");
    
            for(let i = 0; i < playersAr.length; i++)
            {
                console.log(playersAr[i])
                if(playersAr[i] == 0)
                {
                    aKey = socket.id;
                    clients.set(aKey, { id: (i+1) });
                    console.log("connection: " + socket.id + " clientId: " + (i+1) + " key: " + aKey );
                    socket.emit("welcomeTag", { id: (i+1), boxes: boxes });
                    playersAr[i] = 1;
                    boxes.push(new componentTag(0, 0,  "", 0, 0, i+1, 0));
                    break;
                }
            }
    
        }
    

        //Start the game
        io.emit("startTag", {boxesTag: boxesTag}); // io.emit sends to all
        console.log("Starting Tag2" + boxesTag[0].color + " !");
        io.emit("boxesTag", { sender: "server", boxesTag: boxesTag, text: "Sending boxesTag from index.js" }); // io.emit sends to all
    
    
    }


    //Game things
    socket.on("boxesMaze", function (msg) {
        var info = clients.get(socket.id);
        var id = info.id;

        if(playerEnd(boxes[id-1]))
        {
            let c = boxes[id-1].color;
            io.emit("endMaze", {boxes: boxes, walls: walls, winner: c});
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
            io.emit("boxesMaze", {boxes: boxes, walls: walls});

        }


    });

    socket.on("disconnect", function (msg) {
        var info = clients.get(socket.id);
        
        console.log(info.id + " disconnected");
        console.log("size",clients.size);
     

        
            if(info.id == 1)
            {
                player1 = false;
                playersAr[0] = 0;
            }
            else if(info.id == 2)
            {
                player2 = false;
                playersAr[1] = 0;

            }
            else if(info.id == 3)
            {
                player3 = false;
                playersAr[2] = 0;

            }
            else if(info.id == 4)
            {
                player4 = false;
                playersAr[3] = 0;

            }
            else
            {
                playersAr[info.id-1] = 0;
            }
        


        
        
 
        clients.delete(socket.id);

    });

    socket.on("startMaze", function (msg) {
        console.log(msg.sender, " is ready to restart");
        
        maze = true;
        tag = false;
        boxes[0] = boxRestart(1);
        boxes[1] = boxRestart(2);
         
    
        //Start the game
        io.emit("startMaze", {boxes: boxes, walls: walls}); // io.emit sends to all
        io.emit("boxesMaze", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all
        
    });

    socket.on("restartMaze", function (msg) {
        console.log(msg.sender);
        if(msg.sender == 1)
            boxes[0].restart = true;

        if(msg.sender == 2)
            boxes[1].restart = true;

        io.emit("restartReadyMaze", { sender: "server", boxes: boxes, walls: walls}); // io.emit sends to all

        if(boxes[0].restart && boxes[1].restart)
        {
            console.log("Restarting...");
            boxes[0].restart = false;
            boxes[1].restart = false;
            boxes[0] = boxRestart(1);        
            boxes[1] = boxRestart(2);        
            io.emit("startMaze", { boxes: boxes, walls: walls}); // io.emit sends to all
            io.emit("boxesMaze", { sender: "server", boxes: boxes, walls: walls, text: "Sending boxes from index.js" }); // io.emit sends to all
        }
    });

    socket.on("restartTag", function (msg) {
        console.log(msg.sender, " is ready to restart");
        boxesTag[msg.sender-1].restart = true;
        let r = 0;
        for(let i = 0; i < 4; i++)
        {
            if(boxesTag[i].restart)
                r++;   
        }

        if(r >= 3)
        {
            console.log("Restarting...");
            for(let i = 0; i < 4; i++)
            {
                boxesTag[i].restart = false;   
            }

            boxesTag[0] = boxRestart(1);        
            boxesTag[1] = boxRestart(2);        
            boxesTag[2] = boxRestart(3);        
            boxesTag[3] = boxRestart(4);        
            io.emit("startTag", { boxesTag: boxesTag}); // io.emit sends to all
        }

        io.emit("boxesTag", { sender: "server", boxesTag: boxesTag, text: "Sending boxes from index.js" }); // io.emit sends to all
        
    });

    

    socket.on("startTag", function (msg) {
        tag = true;
        maze = false;
        io.emit("startTag", {boxesTag: boxesTag}); // io.emit sends to all
        io.emit("boxesTag", {boxesTag: boxesTag}); // io.emit sends to all
    });
  
    //Game things
    socket.on("boxesTag", function (msg) {
        var info = clients.get(socket.id);
        var id = info.id;

        if(msg.action == "left")
        {
            moveLeftTag(boxesTag[id-1]);
        }

        if(msg.action == "right")
        {
            moveRightTag(boxesTag[id-1]);
        }

        if(msg.action == "up")
        {
            moveUpTag(boxesTag[id-1]);
        }

        if(msg.action == "down")
        {
            moveDownTag(boxesTag[id-1]);
        }

        io.emit("boxesTag", { sender: "server", boxesTag: boxesTag, text: "Sending boxesTag from index.js" }); // io.emit sends to all
    });

});

http.listen(port, function () {
    console.log("listening on port " + port);
});




