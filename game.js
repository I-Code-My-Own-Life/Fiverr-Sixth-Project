// console.log('This is my file for the game I am going to make for my client and this is going to be an amazing game.');
// Game Concept : 
// This game is going to be 
// Our current scene is here : 
let currentScene = 0;
// Our scenes : 
let LOADING = 0;
let MENU = 1
let GAME = 2;
let GAMEOVER = 3;
let WIN = 4;
let GAME_LEVEL2 = 5;
let INSTRUCTIONS = 6;
let GAME_LEVEL3 = 7;
// Game Variables :     
let timeForLoading = 6000;
let canvas;
let keys = {
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    arrowDown: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
    control: {
        pressed: false
    },
    j: {
        pressed: false
    }
}
let enemies = [];
let enemies2 = [];
let enemies3 = [];
let enemies4 = [];
let livesArr = [];
let bombs = [];
let projectileBalls = [];
let particles = [];
let projectiles = [];
let projectiles2 = [];
let projectiles3 = [];
let ricochets = [];
let destroyed = false;
let diameter = 1;
let c;
let fire = false;
let enemyImg;
let spawnBigEnemy = false;
let showRicochets = false;
// Our font variables : 
let font1;
let font2;
let font3;
let font4;
let font5;
let font6;
let kj = 0;
function preload(){
    // Loading some fonts for our game : 
    font1 = loadFont("Fonts/font1.ttf");
    font2 = loadFont("Fonts/font2-bold.ttf");
    font3 = loadFont("Fonts/font3-bold.ttf");
    font4 = loadFont("Fonts/font4.ttf");
    font5 = loadFont("Fonts/font5.ttf");
    font6 = loadFont("Fonts/font6.ttf");
}

function setup(){
    canvas = createCanvas(innerWidth, innerHeight)
    angleMode(RADIANS)
}
let increment = 0;
let color1 = 200;
let monsterlives = 10;
function draw(){
    background(0);
    if(currentScene == LOADING){
        // Loading scene here : 
        loadingScene();
    }
    if(currentScene == MENU){
        menuScene();
    }
    if(currentScene == GAME){
        for(let i = 0; i < enemies.length; i++){
            if(enemies2[i] != undefined){
                enemies2[i].attack();
            }
        }
        if(spawnBigEnemy){
            for(let i = 0; i < enemies3.length; i++){
                enemies3[i].follow();
            }
            textSize(30);
            fill(255)
            drawingContext.shadowBlur = 0;
            text("Monster's lives :",900,50);
            fill("red");
            text(monsterlives,1100,50);
            showRicochets = true;
        }
        DisplayScoreandLives();
        if(lives == 0){
            currentScene = GAMEOVER;
            setTimeout(()=>{
                if(lives == 0){
                    location.reload()
                }
            },3000)
    }
    if(!moveBackground){
        for(let i = 0; i < tiles.length; i++){
            tiles[i].dx = 0;
        }

    }
    for(let i = 0; i < tiles.length; i++){
        tiles[i].drawTile();
    }
    player.spawn();
    for(let i = 0; i < enemies.length; i++){
        enemies[i].attack();
        if(enemies[i].x + enemies[i].width < 0 || enemies[i].x > innerWidth){
            enemies.splice(i,1);
        }
    }
    if (keys.arrowRight.pressed) {  
        player.dx = SPEED;
    }
    else if (keys.arrowLeft.pressed) {
        player.dx = -SPEED;
    }
    else{
        player.dx = 0;
    }
    CollisionDetection()
    for(let i = 0; i < ricochets.length; i++){
        ricochets[i].throw();
        if(ricochets[i].x < 0 ){
            ricochets.splice(i,1)
        }
    }
    for(let i = 0; i < particles.length; i++){
        particles[i].spawnParticles();
    }
    for(let i = 0; i < projectiles.length; i++){
        if(projectiles[i].x > innerWidth || projectiles[i].x < 0){
            projectiles.splice(i,1)
        }
        if(projectiles[i] != undefined){
            projectiles[i].shoot()
        }
    }
    for(let i = 0; i < projectiles2.length; i++){
        if(projectiles2[i].y < 0){
            projectiles2.splice(i,1)
        }
        if(projectiles2[i] != undefined){
            projectiles2[i].shoot()
        }
    }
    for(let i = 0; i < projectiles3.length; i++){
        if(projectiles3[i].y > innerHeight){
            projectiles3.splice(i,1)
        }
        if(projectiles3[i] != undefined){
            projectiles3[i].shoot()
        }
    }
    // Going to the next level here : 
    if(monsterlives <= 0){
        enemies3.splice(0,1)
        level++;
        currentScene = WIN;
        if(kj <= 0){
            setTimeout(()=>{
                currentScene = GAME_LEVEL2;
            },2000)
        }
        kj++;
    }
    }
    if(currentScene == GAMEOVER){
        Gameover();
    }
    if(currentScene == WIN){
        ShowWinScene()
    }
    if(currentScene == GAME_LEVEL2){
        Level2();   
    }
    if(currentScene == INSTRUCTIONS){
        InstructionsMenu();
    }
    if(currentScene == GAME_LEVEL3){
        Level3();
    }
}
// Some Utility Functions : 
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function Level3(){
    textSize(35);
    textAlign(CENTER);
    text("Level 3 here",width/2,height/2)
}
// Variables related to our loading scene are here :
let sizeofcircle = 5; 
let x = 600;
let y = 400;
let vel = 0.09;
let radians = 0;
let radius = 120;
// Our Loading scene :
function loadingScene(){
  textSize(sizeofcircle);
  textAlign(CENTER);
  textFont(font1)
  fill(255)
  text("Loading...",600,100);
  push();
  translate(x, y);
  rotate(radians);
//   Our rotating circles : 
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(252, 3, 3);
  fill(252, 3, 3)
  circle(radius,0,20);
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(3, 252, 53);
  fill(3, 252, 53)
  circle(-radius,0,20)

  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(2, 250, 225);
  fill(2, 250, 225)
  circle(0,radius,20);
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(250, 242, 2);
  fill(250, 242, 2)
  circle(0,-radius,20);
  radius -= 0.4
  pop()
  radians = radians + vel;
  if(sizeofcircle < 50){
    sizeofcircle+= 0.6
  }
}
// Our Menu Scene is here : 
let colorofText = 250;
let colorofText2 = 300;
let colorofText3 = 250;
let colorofText4 = 250;
// let colorofText = 10;
// let colorofText2 = 10;
// let colorofText3 = 10;
// let colorofText4 = 10;
let showButton = false;
let difficulty = "Normal"
let click = 1;
function menuScene(){
    textSize(40);
    fill(colorofText)
    textAlign(CENTER)
    colorofText-= 2
    text("Are you ready ?",600,100)
    if(colorofText < 0){
        textSize(34);
        fill(colorofText2)
        text("You need to fight the waves of enemies approaching you !",570,100)
        colorofText2-=2
    }
    if(colorofText2 < 0){
        textSize(40);
        fill(colorofText3)
        text("Press Space to fire ahead !",550,100)
        colorofText3-=2
    }
    if(colorofText3 < 0){
        textSize(40);
        fill(colorofText4)
        text("and A to fire above you !",550,100)
        colorofText4-=8
        showButton = true;
    }
    if(showButton){
        fill(255)
        textSize(20)
        text("Press to start the game",width/2 - 150,height - 130)
        let button = createButton('Start the Game');
        button.position(width/2 - 220, height - 100);
        let col = color(252, 11, 3)
        button.style('background-color', col);
        button.style('width',"180px")
        button.style('height',"60px")
        button.style("cursor",'pointer')
        button.style('font-size',"18px")
        button.style("border-radius",'10px')
        fill(255)
        textSize(20)
        text("Select Difficulty",width/2 + 180,height - 130)
        let button2 = createButton(difficulty);
        button2.position(width/2 + 100, height - 100);
        button2.style('background-color', color(127, 3, 252));
        button2.style('width',"150px")
        button2.style('height',"60px")
        button2.style("cursor",'pointer')
        button2.style('font-size',"20px")
        button2.style("border-radius",'10px')
        let button3 = createButton('Instructions');
        button3.position(width/2 - 60, height - 420);
        let col3 = color(202, 100, 50)
        button3.style('background-color', col3);
        button3.style('width',"180px")
        button3.style('height',"60px")
        button3.style("cursor",'pointer')
        button3.style('font-size',"18px")
        button3.style("border-radius",'10px')
        button.mousePressed(()=>{
            removeElements()
            currentScene = GAME
        })
        button2.mousePressed(()=>{
            click++;
            if(click % 2 == 0){
                difficulty = "Hard"
            }
            else{
                difficulty = "Normal"
            } 
        });
        button3.mousePressed(()=>{
            removeElements()
            currentScene = INSTRUCTIONS
        })
        // Showing Instructions : 
        textSize(40);
        textAlign(CENTER);
        fill("red")
        text("The Last Hunter",width/2,height/2 - 200)
    }
}
// Our Instructions screen is here : 
function InstructionsMenu(){
    textSize(30)
    fill("red")
    text("Use Arrow Keys to move!",600,100);
    fill(5, 223, 247)
    text("Press a and space to shoot Fireballs and Up Arrow key to jump!",600,200)
    fill(5, 247, 29)
    text("Keep your eyes open. An extra life may drop from the sky !",600,300)
    fill("white")
    textSize(40);
    text("Level 1 ",200,420)
    textSize(17);
    text("Be aware of the titan that lies there! ",220,520)
    textSize(40);
    text("Level 2 ",600,420)
    textSize(17)
    text("The phantoms there are really powerful! ",620,520)
    textSize(40);
    text("Level 3 ",1000,420)
    textSize(18);
    text("Incompleted",1000,520)
    // The button that teleports us to the game : 
    let button = createButton("Let's Go!");
    button.position(width/2 - 60, height - 100);
    let col = color(252, 11, 3)
    button.style('background-color', col);
    button.style('width',"180px")
    button.style('height',"60px")
    button.style("cursor",'pointer')
    button.style('font-size',"18px")
    button.style("border-radius",'10px')
    button.mousePressed(()=>{
        removeElements()
        currentScene = GAME
    })
}
// Some variables related to our gameOver scene are here : 
let textsize = 0;
let rads = 0;
// This function here displays our gameover scene in the game :
function Gameover(){
    push();
    fill(65, 50, 249)
    translate(width/2,height/2);
    textAlign(CENTER)
    textSize(textsize);
    textFont(font6);
    if(textsize < 50){
        textsize += 0.8
    }
    rotate(rads)
    text("Game Over",0,0)
    if(rads <= Math.PI * 2){
        rads+=0.1
    }
    pop();
} 
// This function here displays our Win scene : 
function ShowWinScene(){
    // This is just temporary : 
    background(0)
    textSize(50);
    textAlign(CENTER)
    textFont(font3)
    text("You have successfully passed the stage!",width/2,height/2)
}
// Some variables related to this function are here :
let lives = 3;
let score = 0;
let level = 1;
function DisplayScoreandLives(){
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(255,255,255)
    fill('rgba(255,255,255, 1)')
    textSize(30);
    text("Lives :",80,50)
    textSize(30);
    fill("red")
    text(lives,180,50);
    // Displaying our level here : 
    fill('rgba(255,255,255, 1)')
    textSize(30);
    text("Level :",350,50)
    fill("red")
    textSize(30);
    text(level,440,50);
    // Displaying our score here : 
    fill('rgba(255,255,255, 1)')
    text("Score :",width/2 + 40,50);
    textAlign(CENTER);
    fill("red")
    text(score,width/2 + 150,50);
}

// All of our classes are going to be here : 
class Tile{
    constructor(x,y,dx,width,height,r,g,b){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.width = width;
        this.height = height;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    drawTile(){
    // Creating our glowing tiles here :
    drawingContext.shadowBlur = 32;
    drawingContext.shadowColor = color(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    noStroke()
    rect(this.x,this.y,this.width,this.height);
    this.x += this.dx;
    }
}
class Particle {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.dx = dx;
        this.dy = dy;
        this.color = color
    }
    makeParticle() {
        fill(this.color);
        circle(this.x, this.y,this.radius);
    }
    spawnParticles() {
        this.makeParticle();
        this.x += this.dx;
        this.x -= this.dy;
        this.y -= this.dy;
        this.x += this.dy;
        if (this.radius > 0) {
            this.radius -= 0.5
        }
        if (this.radius <= 0 || this.radius < 1 || this.x > innerWidth || this.y > innerHeight) {
            particles.splice(particles.indexOf(this), 1)
        }
    }
}
let particle;
// Our Class Player :
// Defining some variable related to our player :
let SPEED = 10;
let JUMP_SPEED = 14;
let GRAVITY = 0.7;
let moveBackground = false;
let particleCount = 5;
let hit = false;
let inc = 0;
let makeExplosionbool = false;
class Player{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    spawn(){
        drawingContext.shadowBlur = 0;
        textSize(30)
        fill(215,100,0)
        text("Player",this.x + 10,this.y - 15)
        fill(255,255,255)
        rect(this.x,this.y,this.width,this.height)
        if(this.y < 0){
            this.y = 10;
            this.dy += GRAVITY
        }
        // Stopping the player from going off the screen from the left side : 
        if(this.x < 40 && !keys.arrowRight.pressed){
            this.dx = 0;
        }
        this.y += this.dy;
        this.x += this.dx;
        if(this.y + this.height + this.dy <= innerHeight){
            this.dy += GRAVITY;
            // hit = true;
        }
        else{
            this.dy = 0;
        }

    }
}
function makeExplosion(x,y){
    fill(110)
    circle(x,y,diameter)
    if(diameter != 0 && diameter < 110){
        diameter +=5;
    }
    if(diameter > 110){
        for(let i = 0; i < 20; i++){
            let dx = randomIntFromInterval(-25, 25);
            let dy = randomIntFromInterval(-20, 20);
            particles.push(new Particle(x,y,8,dx,dy,"red"))
        }
        diameter = 1;
    }
}
let diam = 8
function makeExplosionWithoutParticles(x,y){
    fill(150)
    circle(x,y,diam)
    if(diam != 0 && diam < 110){
        diam +=5;
    }
    if(diam > 110){
        diam = 1;
    }
}
let alpha = 0.1;
let incrementinalpha = 0.01
class Enemy{
    constructor(x,y,width,height,dx,dy,hit){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.hit = hit;
    }
    attack(){
        // fill('red');
        drawingContext.shadowBlur = 0;
        fill(43, 155, 252)
        textSize(25)
        textAlign(CENTER)
        text("Spirit",this.x + 25,this.y - 10);
        noFill();
        stroke(150);
        // stroke(`rgba(120,200,160,${alpha})`);
        // alpha = sin(incrementinalpha) + 0.1;
        // console.log(alpha + 0.1)
        // incrementinalpha++
        drawingContext.shadowBlur = 32;
        rect(this.x,this.y,this.width,this.height);
        this.x += this.dx;
    }
}
let ra = 0.1
class Enemy2{
    constructor(x,y,width,height,dx,dy,hit){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.hit = hit;
    }
    attack(){ 
        drawingContext.shadowBlur = 0;
        fill(104, 2, 237)
        textSize(20)
        textAlign(CENTER)
        text("Phantom",this.x + 20,this.y - 15);
        fill('red');    
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = color("red")
        rect(this.x,this.y,this.width,this.height);
        if(this.x + this.width > innerWidth || this.x - this.width < 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        // console.log("The x is ",this.x)
    }
}
class Enemy3{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    follow(){
        drawingContext.shadowBlur = 0;
        fill(20, 145, 68)
        textSize(31)
        textAlign(CENTER)
        text("Titan",this.x + 35,this.y - 15);
        fill("blue");
        rect(this.x,this.y,this.width,this.height);
        this.y += this.dy;
        this.x += this.dx;
        if(this.x + this.width > innerWidth || this.x - this.width < 400){
            this.dx = -this.dx;
        }
        if(this.y + this.height + this.dy <= innerHeight){
            this.dy += GRAVITY;
            hit = true;
        }
        else{
            this.dy = 0;
        }
    }
}
let enemy2 = new Enemy2(randomIntFromInterval(200,900),150,40,40,10,10,false);
enemies2.push(enemy2)
// Projectile that moves to the right : 
class Projectile{
    constructor(x,y,width,height,d,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.d = d;
        this.dx = dx;
        this.dy = dy;
    }
    shoot(){
        drawingContext.shadowBlur = 0;
        fill("blue");
        rect(this.x,this.y,this.width,this.height);
        this.x += this.dx;
    }
}
class Projectile2{
    constructor(x,y,width,height,d,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.d = d;
        this.dx = dx;
        this.dy = dy;
    }
    shoot(){
        drawingContext.shadowBlur = 0;
        fill("blue");
        rect(this.x,this.y,this.width,this.height);
        this.y += this.dy;
    }
}
class Projectile3{
    constructor(x,y,width,height,d,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.d = d;
        this.dx = dx;
        this.dy = dy;
    }
    shoot(){
        drawingContext.shadowBlur = 0;
        fill("blue");
        rect(this.x,this.y,this.width,this.height);
        this.y += this.dy;
    }
}
let gravityforricochet = 0.8;
let friction = 0.89
class Ricochet{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    throw(){
        fill(255)
        rect(this.x,this.y,this.width,this.height);
        this.y += this.dy
        if(this.y + this.height > innerHeight){
            this.dy = -this.dy * friction;
        }
        else{
            this.dy += gravityforricochet
        }
        this.x += this.dx;
        console.log("Making the ricochet!")
    }
}
// Let's make our player : 
let tiles = [];
let player = new Player(200,230,30,80,0,0)
let tile1 = new Tile(100,500,-4,200,20,230,30,10);
let tile2 = new Tile(350,350,-4,200,20,50,140,230);
let tile3 = new Tile(550,480,-4,200,20,90,240,130);
let tile4 = new Tile(780,400,-4,200,20,10,100,130);
tiles.push(tile1)
tiles.push(tile2)
tiles.push(tile3)
tiles.push(tile4)
function KeyboardInputHandler(){
    addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    keys.arrowRight.pressed = true;
                    if(player.x > 300){
                        moveBackground = true;
                    }
                    break;
                case "ArrowLeft":
                    keys.arrowLeft.pressed = true;
                    break;
                case " ":
                    if(currentScene == GAME){
                        fire = true;
                        projectiles.push(new Projectile(player.x + player.width ,player.y + (player.height / 2) - 25,20,20,18,18,1));
                    }
                    if(currentScene == GAME_LEVEL2){
                        projectileBalls.push(new ProjectileBall(player.x + player.width,player.y + (player.height / 2) - 25,12,18,0))
                    }
                    break;
                case "a":
                    if(currentScene == GAME){
                        projectiles2.push(new Projectile2(player.x + (player.width / 2),player.y,20,20,true,0,-18))
                    }
                    if(currentScene == GAME_LEVEL2){
                        projectileBalls.push(new ProjectileBall(player.x + (player.width/ 2), player.y,12,0,-18))
                    }
                        break;
                case "ArrowUp":
                    if(player.y > 0){
                        player.dy -= JUMP_SPEED;
                    }
                    break;
                case "Control":
                    keys.control.pressed = true;
                    break;
            }
    })
    addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    keys.arrowRight.pressed = false;
                    moveBackground = false;
                    break;
                case "ArrowLeft":
                    keys.arrowLeft.pressed = false;
                    break;
                case " ":
                    fire = false;
                    break;
                case "ArrowUp":
                    // keys.arrowUp.pressed = false;
                    // player.dy -= JUMP_SPEED;
                    break;
                case "Control":
                    keys.control.pressed = false;
                    break;
            }
    })
}
KeyboardInputHandler();
let r = 0;
let r1 = 0;
let t = 0;
function CollisionDetection(){
    // This is platform collision detection : 
    // Platoform collision detection : 
    for(let i = 0; i < tiles.length; i++){
        if(player.y + player.height <= tiles[i].y && player.y + player.height + player.dy >= tiles[i].y && player.x + player.width >= tiles[i].x && player.x <= tiles[i].x + tiles[i].width){
            if(r <= 0){
                for(let j = 0; j < particleCount; j++){
                    // console.log("Added Particles into the particles array!")
                    let dx = randomIntFromInterval(-25, 25);
                    let dy = randomIntFromInterval(-20, 20);
                    particles.push(new Particle(player.x + (player.width / 2),player.y + player.height,8,dx,dy,"red"));
                }
                r++;
            }
            player.dy = 0;
        }
    }
    // This is enemy and player's collision detection : 
    for(let i = 0; i < enemies.length; i++){
        if(dist(player.x,player.y, enemies[i].x,enemies[i].y) < 30){
            // Game over scene here : 
            if(lives <= 0){
                t++;
            }
            makeExplosion(enemies[i].x,enemies[i].y);
            for(let k = 0; k < 20; k++){
                let dx = randomIntFromInterval(-25, 25);
                let dy = randomIntFromInterval(-20, 20);
                particles.push(new Particle(player.x,player.y,6,dx,dy,"red"))
            }
            enemies.splice(i,1);
            lives-=1
            if( t <= 0 ){      
                if(lives == 0){
                    currentScene = GAMEOVER;
                    setTimeout(()=>{
                            location.reload()
                    },3000)
                }
            }
        }
    }
    // This is the collision detection for our player's projectile and the enemy : 
    for(let i = 0; i < projectiles.length; i++){
        for(let j = 0; j < enemies.length; j++){
            if(projectiles[i] != undefined && enemies[j] != undefined){
            if(projectiles[i].x < enemies[j].x + enemies[j].width && projectiles[i].x + projectiles[i].width > enemies[j].x && projectiles[i].y < enemies[j].y + enemies[j].height && projectiles[i].y + projectiles[i].height > enemies[j].y){
                makeExplosionWithoutParticles(enemies[j].x,enemies[j].y);
                score++;
                for(let i = 0; i < 12; i++){
                    // let dx = randomIntFromInterval(-25, 25);
                    // let dy = randomIntFromInterval(-20, 20);
                    enemies[j].dx = 0;
                    // particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                    makeExplosionWithoutParticles(enemies[j].x,enemies[j].y);
                }
                projectiles.splice(i,1);
                enemies.splice(j,1);
                // console.log("Destroyed the enemy by using the default method");
            }
            else if(dist(projectiles[i].x, projectiles[i].y, enemies[j].x, enemies[j].y) < 80){
                makeExplosionWithoutParticles(enemies[j].x,enemies[j].y)
                score++;
                for(let i = 0; i < 12; i++){
                    // let dx = randomIntFromInterval(-25, 25);
                    // let dy = randomIntFromInterval(-20, 20);
                    enemies[j].dx = 0;
                    // particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                    makeExplosionWithoutParticles(enemies[j].x,enemies[j].y);
                }
                projectiles.splice(i,1);
                enemies.splice(j,1);
                // console.log("Destroyed the enemy by using the dist method");
                }
            }    
        }
    }
    // This is the collision detection between our player's fire and our second enemy : 
    for(let i = 0; i < projectiles2.length; i++){
        if(projectiles2[i] != undefined ){
            if(dist(projectiles2[i].x, projectiles2[i].y, enemy2.x, enemy2.y) < 80){
                if(!destroyed){
                    makeExplosion(enemy2.x,enemy2.y)
                    score+=10;
                    for(let i = 0; i < 7; i++){
                        let dx = randomIntFromInterval(-25, 25);
                        let dy = randomIntFromInterval(-20, 20);
                        enemy2.dx = 0;
                        particles.push(new Particle(enemy2.x,enemy2.y,8,dx,dy,"red"));
                        makeExplosion(enemy2.x,enemy2.y);
                    }
                    projectiles2.splice(i,1);
                }
                destroyed = true;
                enemies2.splice(0,1)
                }
            } 
    }
    // Second Projetile collision detection : 
      // This is the collision detection for our player's second projectile and the enemy : 
      for(let i = 0; i < projectiles2.length; i++){
        for(let j = 0; j < enemies.length; j++){
            if(projectiles2[i] != undefined && enemies[j] != undefined){
                    if(projectiles2[i].x < enemies[j].x + enemies[j].width && projectiles2[i].x + projectiles2[i].width > enemies[j].x && projectiles2[i].y < enemies[j].y + enemies[j].height && projectiles2[i].y + projectiles2[i].height > enemies[j].y){
                        makeExplosion(enemies[j].x,enemies[j].y);
                        score++;
                        for(let i = 0; i < 7; i++){
                            let dx = randomIntFromInterval(-25, 25);
                            let dy = randomIntFromInterval(-20, 20);
                            enemies[j].dx = 0;
                            particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                            makeExplosion(enemies[j].x,enemies[j].y);
                        }
                        projectiles2.splice(i,1);
                        enemies.splice(j,1);
                        // console.log("Destroyed the enemy by using the default method");
                    }
                    else if(dist(projectiles2[i].x, projectiles2[i].y, enemies[j].x, enemies[j].y) < 30){
                        makeExplosion(enemies[j].x,enemies[j].y)
                        score++;
                        for(let i = 0; i < 7; i++){
                            let dx = randomIntFromInterval(-25, 25);
                            let dy = randomIntFromInterval(-20, 20);
                            enemies[j].dx = 0;
                            particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                            makeExplosion(enemies[j].x,enemies[j].y);
                        }
                        projectiles2.splice(i,1);
                        enemies.splice(j,1);
                        // console.log("Destroyed the enemy by using the dist method");
                        }
                    }
                }
        }
            // This is for the enemy's bullet when hit the player: 
      for(let i = 0; i < projectiles3.length; i++){
            if(projectiles3[i] != undefined){
                    if(projectiles3[i].x < player.x + player.width && projectiles3[i].x + projectiles3[i].width > player.x && projectiles3[i].y < player.y + player.height && projectiles3[i].y + projectiles3[i].height > player.y){
                        makeExplosion(player.x,player.y);
                        lives--
                        for(let i = 0; i < 7; i++){
                            let dx = randomIntFromInterval(-25, 25);
                            let dy = randomIntFromInterval(-20, 20);
                            particles.push(new Particle(player.x,player.y,8,dx,dy,"red"));
                            makeExplosion(player.x,player.y);
                        }
                        projectiles3.splice(i,1);
                    }
                    else if(dist(projectiles3[i].x, projectiles3[i].y, player.x, player.y) < 40){
                        makeExplosion(player.x,player.y)
                        lives--;
                        for(let i = 0; i < 7; i++){
                            let dx = randomIntFromInterval(-25, 25);
                            let dy = randomIntFromInterval(-20, 20);
                            particles.push(new Particle(player.x,player.y,8,dx,dy,"red"));
                            makeExplosion(player.x,player.y);
                        }
                        projectiles3.splice(i,1);
                    }
                }
        }
    // All the collisions related to our big enemy : 
    // Collision Detection between our player and our enemy :
    // if(enemy3 != undefined){
    //     if(dist(player.x,player.y,enemy3.x,enemy3.y) < 50){
    //         lives--
    //     }
    // }
    // Collision Detection between our player's projectile and our big enemy :
    for(let i = 0; i < projectiles.length; i++){
        if(enemy3 != undefined && projectiles[i] != undefined){
            if(dist(projectiles[i].x,projectiles[i].y,enemy3.x,enemy3.y) < 60){
                makeExplosion(enemy3.x,enemy3.y)
                    score+=3;
                    monsterlives--
                    for(let i = 0; i < 7; i++){
                        let dx = randomIntFromInterval(-25, 25);
                        let dy = randomIntFromInterval(-20, 20);
                        particles.push(new Particle(enemy3.x,enemy3.y,8,dx,dy,"red"));
                        makeExplosion(enemy3.x + (enemy3.width / 2),enemy3.y + (enemy3.height / 2));
                    }
                projectiles.splice(i,1)
            }
        }
    }
    // Collision detection between our player and our ricochets : 
    for(let i = 0; i < ricochets.length; i++){
        if(dist(ricochets[i].x,ricochets[i].y,player.x,player.y) < 50){
            console.log("Hit by the enemy!");
            lives--
            ricochets.splice(i,1)
            for(let i = 0; i < 10; i++){
                let dx = randomIntFromInterval(-25, 25);
                let dy = randomIntFromInterval(-20, 20);
                particles.push(new Particle(player.x + (player.width / 2),player.y + player.height,8,dx,dy,"red"));
            }
        }
    }
}
// Resizing the canvas whenever the windows is resized :
window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

setInterval(()=>{
    if(currentScene == GAME){
        let x = innerWidth - 100;;
        let dx;
        dx = randomIntFromInterval(-2,-6);
        let xs = [0,1];
        let r = xs[Math.floor(Math.random() * xs.length)]
        if(r == 0){
        }
        else{
            // dx = randomIntFromInterval(2,6);
        }
        let y = randomIntFromInterval(90 , innerHeight - 50);
        enemies.push(new Enemy(x, y,50,50,dx,0,false));
    }
},2000);

// Going to the GAME scene after some time : 
setTimeout(()=>{
    currentScene = MENU
},timeForLoading)

setInterval(()=>{
    if(currentScene == GAME && !destroyed){
        projectiles3.push(new Projectile3(enemy2.x + (enemy2.width / 2),enemy2.y + enemy2.height,10,10,false,18,18));
    }
},2000)
let dothis = true;
let enemy3;
// Big enemy spawning is here :
setInterval(()=>{
    if(currentScene == GAME && dothis){
        enemy3 = new Enemy3(innerWidth - 120,-90,70,120,4,0.1);
        enemies3.push(enemy3)
        spawnBigEnemy = true;   
        dothis = false;
    }
},30000)
setInterval(()=>{
    if(showRicochets){
        ricochets.push(new Ricochet(enemy3.x,enemy3.y,20,20,-10,0.01))
    }
},3000)
// Everything for level 2 will be here : 
// Variables : 
let Ghost_Speed = 3;
// Functions and classes for level 2 are here : 
// All the enemeis for level 2 : 
// Programming the enemy class here : 
// This is the enemy class that follows the player around everywhere :
class Enemy4{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    attack(){
        fill("red")
        textAlign(CENTER)
        textSize(20);
        drawingContext.shadowBlur = 0;
        text("Ghost",this.x + 15,this.y - 10)
        fill("green");
        rect(this.x,this.y,this.width,this.height);
        this.x += this.dx;
        this.y += this.dy;
        if(this.y + this.height + this.dy <= innerHeight){
            this.dy += GRAVITY;
        }
        else{
            this.dy = 0;
        }
    }
}
class Bomb{
    constructor(x,y,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    explode(){
        textSize(25);
        textAlign(CENTER);
        fill("red")
        text("Bomb!!",this.x,this.y - 15)
        fill("grey");
        drawingContext.shadowBlur = 0;
        circle(this.x,this.y,this.radius * 2)
        this.y += this.dy;
        if(this.y + this.radius + this.dy <= innerHeight){
            this.dy += 0.4;
        }
        else{
            this.dy = 0;
        }
    }
}
let ang = 0;
class Life{
    constructor(x,y,dx,dy,radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }
    bless(){
        ang+=0.03;
        push();
        drawingContext.shadowBlur = 20;
        fill(255, 247, 0);
        translate(this.x,this.y)
        rotate(ang)
        circle(0,0,this.radius * 2);
        textSize(20);
        fill("black");
        text("L",0,5);
        this.x += this.dx;
        this.y += this.dy;
        pop();
        if(this.y + this.radius + this.dy <= innerHeight){
            this.dy += GRAVITY;
        }
        else{
            this.dy = 0;
        }
    }
}
class ProjectileBall{
    constructor(x,y,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    shoot(){
        drawingContext.shadowBlur = 0;
        fill("red");
        circle(this.x,this.y,this.radius * 2);
        this.x += this.dx;
        this.y += this.dy;
    }
}
function CollisionDetectionforLevel2(){
      // This is platform collision detection : 
    // Platoform collision detection : 
    for(let i = 0; i < tiles.length; i++){
        if(player.y + player.height <= tiles[i].y && player.y + player.height + player.dy >= tiles[i].y && player.x + player.width >= tiles[i].x && player.x <= tiles[i].x + tiles[i].width){
            tiles[i].dx = 0;
            player.dy = 0;
        }
    }
    // Collision Detection for enemy4 and our player :
    for(let i = 0 ; i < enemies4.length; i++){
        if(dist(enemies4[i].x,enemies4[i].y,player.x,player.y) < 50){
            lives--;
            for(let i = 0; i < 3; i++){
                if(enemies4[i] != undefined){
                    let dx = randomIntFromInterval(-25, 25);
                    let dy = randomIntFromInterval(-20, 20);
                    player.x -= 100
                    particles.push(new Particle(enemies4[i].x,enemies4[i].y,8,dx,dy,"red"));
                }
            }
            enemies4.splice(i,1);
        }
    } 
    // Collision Detection for enemy4 and our player's fire : 
    // So, I have a ball which is our projectile and I want to detect collision detection for this : 
    for(let i = 0; i < enemies4.length; i++){
        for(let j = 0; j < projectileBalls.length; j++){
            if(projectileBalls[j] != undefined && enemies4[i] != undefined){
                if(CollisionDetectionofSquareAndCircle(projectileBalls[j].x,projectileBalls[j].y, projectileBalls[j].radius,enemies4[i].x,enemies4[i].y,enemies4[i].width,enemies4[i].height)){
                    score++;
                    for(let k = 0; k < 4; k++){
                        let dx = randomIntFromInterval(-25, 25);
                        let dy = randomIntFromInterval(-20, 20);
                        let radius = 5;
                        particles.push(new Particle(enemies4[i].x,enemies4[i].y,radius,dx,dy,"red"))
                    }
                    enemies4.splice(i,1);
                    projectileBalls.splice(j,1);
                }
            }
        }
    }
    // Ok, so let's do collision detection between player and lives : 
    for(let i = 0; i < livesArr.length; i++){
        if(livesArr[i] != undefined){
            if(CollisionDetectionofSquareAndCircle(livesArr[i].x,livesArr[i].y,livesArr[i].radius,player.x,player.y,player.width,player.height)){
                livesArr.splice(i,1);
                lives++
            }   
        }
    }
    // Collision Detection between our player and bomb : 
    for(let i = 0; i < bombs.length; i++){
        if(bombs[i] != undefined){
            if(CollisionDetectionofSquareAndCircle(bombs[i].x,bombs[i].y,bombs[i].radius,player.x,player.y,player.width,player.height)){
                for(let j = 0 ; j < 8; j++){
                    makeExplosionWithoutParticles(player.x,player.y);
                }
                bombs.splice(i,1)
                lives--
            }
        }
    }
}
// Collision Detection function for circle and rectangle : 
function CollisionDetectionofSquareAndCircle(cx, cy, rad, rx, ry, rw, rh){
    let testX = cx;
    let testY = cy;
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
    let d = dist(cx, cy, testX, testY);
    if (d <= rad) {
    return true;
    }
    return false;
}
// Defining all of our level2 class instances here : 
// The concept for level 2 of the game is here:
// So, in this level our player  
let tile5 = new Tile(randomIntFromInterval(100, innerWidth - 100),randomIntFromInterval(200,innerHeight - 50),0,randomIntFromInterval(90, 180),30,randomIntFromInterval(0,255),randomIntFromInterval(0,255),randomIntFromInterval(0,255))
tiles.push(tile5)
function Level2(){
    // Let's make level 2 right here :
    textAlign(CENTER);
    textSize(35); 
    // fill("red")
    // text("Level 2",width/2,height/2);
    player.spawn();
    // Throwing life : 
    for(let i = 0; i < livesArr.length; i++){
        livesArr[i].bless();
    }
    // Throwing bombs : 
    for(let i = 0; i < bombs.length; i++){
        bombs[i].explode();
        if(bombs[i] != undefined){
            if(bombs[i].y >= innerHeight - 20){
                for(let j = 0; j < 5; j++){
                    makeExplosionWithoutParticles(bombs[i].x,bombs[i].y)
                }
                bombs.splice(i,1)
            }
        }
    }
    // bomb.explode();
    for(let i = 0; i < enemies4.length; i++){
        enemies4[i].attack();
        let angle = atan2(player.y - enemies4[i].y, player.x - enemies4[i].x);
        let dx = Math.cos(angle) * Ghost_Speed;
        let dy = Math.sin(angle) * Ghost_Speed;
        enemies4[i].dx = dx;
        enemies4[i].dy = dy;
    }
    DisplayScoreandLives();

    // When lives get less than zero then go to the gameover scene : 
    if(lives <= 0){
        currentScene = GAMEOVER;
        console.log("Go to game over scene!")
        setTimeout(()=>{
            if(lives == 0){
                location.reload()
            }
        },3000)
    }
    // Making tiles : 
    for(let i = 0; i < tiles.length; i++){
        tiles[i].dx = 0;
        tiles[i].drawTile();
    }
    if (keys.arrowRight.pressed) {  
        player.dx = SPEED;
    }
    else if (keys.arrowLeft.pressed) {
        player.dx = -SPEED;
    }
    else{
        player.dx = 0;
    }
    CollisionDetectionforLevel2()
    for(let i = 0; i < particles.length; i++){
        particles[i].spawnParticles();
    }
    // Shooting ball projectiles : 
    for(let i = 0; i < projectileBalls.length; i++){
        if(projectileBalls[i].x > innerWidth || projectileBalls[i].x < 0){
            projectileBalls.splice(i,1);
        }
        if(projectileBalls[i] != undefined){
            projectileBalls[i].shoot();
        }
    }
    if(score >= 55){
        currentScene = GAME_LEVEL3;
    }
    // Going to the next level here : 
    // if(monsterlives <= 0){
    //     enemies3.splice(0,1)
    //     currentScene = GAME_LEVEL2;
    // }
    // The main logic comes here :
}
setInterval(()=>{
    Ghost_Speed += 0.01
    if(currentScene == GAME_LEVEL2){
        let enemy4x = 1000;
        let enemy4y = 100;
        let angle = atan2(player.y - enemy4y, player.x - enemy4x);
        let dx = Math.cos(angle) * Ghost_Speed;
        let dy = Math.sin(angle) * Ghost_Speed;
        enemies4.push(new Enemy4(1100,randomIntFromInterval(-20 , 900),40,40,dx,dy));
    }
},3000)
let done = true;
setInterval(()=>{
    if(currentScene == GAME_LEVEL2 && done){
        livesArr.push(new Life(randomIntFromInterval(50, innerWidth - 50),0,0.6,4,17));
        done = false;
    }
},14000)
setInterval(()=>{
    if(currentScene == GAME_LEVEL2){
            bombs.push(new Bomb(randomIntFromInterval(100,700),100,13,13,1))
    }
},5000)