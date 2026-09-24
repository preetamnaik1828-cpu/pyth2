let board;
const rowcount=21;
const columncount=19;
const tilesize=32;
const boardwidth = columncount*tilesize;
const boardheight = rowcount*tilesize;
let context;
//image
let blueghostimage;
let orangeghostimage;
let pinklghostimage;
let redghostimage;
let pacmanupimage;
let pacmandownimage;
let pacmanrightimage;
let pacmanleftimage;
let wallimage;

//X=wall,O=skip,P=pac man, ' '=food
//ghosts: b=blue,o=orange ,p=pink, r=red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();

let pacman;

const directions =['U','D','L','R'];
let score =0;
let lives =3;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext('2d');

    loadimage();
    loadMap();
    // console.log(walls.size);
    // console.log(foods.size);
    // console.log(ghosts.size);
    for (let ghost of ghosts.values()){
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);

    }
    update();
    document.addEventListener('keyup',movePacman);


};

 
function loadimage() {
    wallimage = new Image();
    wallimage.src= "./wall.png";

    blueghostimage = new Image();
    blueghostimage.src = "./blueGhost.png";

    orangeghostimage = new Image();
    orangeghostimage.src ="./orangeGhost.png";

    pinklghostimage = new Image();
    pinklghostimage.src ="./pinkGhost.png";

    redghostimage = new Image();
    redghostimage.src="./redGhost.png";

    pacmanupimage = new Image();
    pacmanupimage.src="./pacmanUp.png";

    pacmandownimage = new Image();
    pacmandownimage.src="./pacmanDown.png";

    pacmanleftimage = new Image();
    pacmanleftimage.src="./pacmanLeft.png";

    pacmanrightimage = new Image();
    pacmanrightimage.src="./pacmanRight.png";
}

function loadMap(){
    walls.clear();
    foods.clear();
    ghosts.clear();

    for(let r=0; r< rowcount; r++){
        for(let c=0; c< columncount; c++){
            const row =tileMap[r];
            const tileMapChar =row[c];
            const x=c*tilesize;
            const y=r*tilesize;
            if(tileMapChar=='X'){
                const wall =new block(wallimage,x,y,tilesize,tilesize);
                walls.add(wall);

            }
            else if (tileMapChar == "b" ){//bule ghost
                const ghost = new block(blueghostimage, x, y, tilesize, tilesize);
                ghosts.add(ghost);

            }
             else if (tileMapChar == "o" ){//bule ghost
                const ghost = new block(orangeghostimage, x, y, tilesize, tilesize);
                ghosts.add(ghost);
        }
            else if (tileMapChar == "p" ){//bule ghost
                const ghost = new block(pinklghostimage, x, y, tilesize, tilesize);
                ghosts.add(ghost);
    }
                else if (tileMapChar == "r" ){//bule ghost
                const ghost = new block(redghostimage, x, y, tilesize, tilesize);
                ghosts.add(ghost);
}
          else if(tileMapChar=="P"){
            pacman= new block(pacmanrightimage,x,y,tilesize,tilesize)
          }
          else if(tileMapChar== " "){
               const food = new block(null,x+14,y+14,4,4)
               foods.add(food);
          }


}


}};

function update(){
    if (gameOver){
        return;
    }
    move();
    draw();
    setTimeout(update,50);
}
function draw(){
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for(let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }
    for (let wall of walls.values()){
        context.drawImage(wall.image, wall.x, wall.y, wall.width,wall.height )
    }
context.fillStyle = "white";
    for (let food of foods.values()) {
            context.fillRect(food.x, food.y, food.width, food.height);
        }; 
        //score
        context.fillStyle="white";
        context.font="14px sans-serif";
        if(gameOver){
            context.fillText("game over:" + String(score), tilesize/2, tilesize/2)
        }
        else{
            context.fillText("X" + String(lives) +" " + String(score), tilesize/2, tilesize/2);
        } 
    };

function move(){
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    for(let wall of walls.values()){
        if(collision(pacman,wall)){
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break
        }
    }
    for(let ghost of ghosts.values()){
        if (collision(ghost,pacman)){
            lives -= 1;
            if(lives == 0){
                gameOver = true;
                return;
            }
            resetPositions();


        }
   
        if(ghost.y == tilesize*9 && ghost.direction !='U' && ghost.direction !='D'){
            ghost.updateDirection("U");
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;
        for(let wall of walls.values()){
            if(collision(ghost,wall) || ghost.x <= 0|| ghost.x + ghost.width >= boardwidth){
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random()*4)];
                ghost.updateDirection(newDirection);
            }
        }
    }
    //check food collision
    let foodEaten= null;
    for(let food of foods.values()){
        if(collision(pacman,food)){
            foodEaten = food;
            score += 10;
            break
        }
    }
    foods.delete(foodEaten);
    //next level
    if(foods.size == 0){
        loadMap();
        resetPositions();
    }

}

function movePacman(e){
    if(gameOver){
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        update();
        return
}

    if(e.code == "ArrowUp"||e.code == "KeyW"){
        pacman.updateDirection("U");
    }
    else if(e.code == "ArrowDown"||e.code == "KeyS"){
        pacman.updateDirection("D");               
        }
        
    else if(e.code == "ArrowLeft"||e.code == "KeyA"){
        pacman.updateDirection("L");
    }
    else if(e.code == "ArrowRight"||e.code == "KeyD"){
        pacman.updateDirection("R");
    }
    //upadet
    if(pacman.direction == 'U'){
       pacman.image = pacmanupimage;
    }
    else if(pacman.direction== "D"){
        pacman.image = pacmandownimage;}
    else if(pacman.direction == "L")  {
        pacman.image = pacmanleftimage
    }
    else if(pacman.direction == "R"){
        pacman.image = pacmanrightimage
    }  
}   
    

function collision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetPositions(){
    pacman.reset();
    pacman.velocityX =0;
    pacman. velocityY=0;
    for (let ghost of ghosts.values()){
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
}
class block{
    constructor(image,x,y,width,height){
        this.image=image;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.startX=x;
        this.startY=y;


        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }
    updateDirection(direction){
        const preDirection  = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()){
            if (collision(this,wall)){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = preDirection;
                this.updateVelocity();
                return;
            }
        }

    }
    updateVelocity(){
        if(this.direction=="U"){
            this.velocityX=0;
            this.velocityY= -tilesize/4;
        }
        else if(this.direction=="D"){
            this.velocityX=0;
            this.velocityY= tilesize/4;
        }
        else if(this.direction=="L"){
            this.velocityX= -tilesize/4;
            this.velocityY= 0;
        }
            else if(this.direction=="R"){
            this.velocityX= tilesize/4;
            this.velocityY= 0;
        }
    }
    reset(){
        this.x =this.startX;
        this.y =this.startY;

    }
}