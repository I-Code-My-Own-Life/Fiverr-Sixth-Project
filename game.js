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
            text("Monster's lives :",950,50);
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
        currentScene = GAME_LEVEL2;
    }
    }
    if(currentScene == GAMEOVER){
        Gameover();
    }
    if(currentScene == WIN){
        ShowWinScene()
    }
}
// Some Utility Functions : 
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
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
let colorofText = 400;
let colorofText2 = 550;
let colorofText3 = 400;
let colorofText4 = 400;
// let colorofText = 10;
// let colorofText2 = 10;
// let colorofText3 = 10;
// let colorofText4 = 10;
let showButton = false;
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
        colorofText4-=2
        showButton = true;
    }
    if(showButton){
        textSize(30);
        fill(0, 255, 170)
        textAlign(CENTER);
        text("Be Careful you only have three lives in this game !",width/2,height/2);

        let button = createButton('Start the Game');
        button.position(width/2 - 50, height - 100);
        let col = color(252, 11, 3)
        button.style('background-color', col);
        button.style('width',"150px")
        button.style('height',"60px")
        button.style("cursor",'pointer')
        button.style("border-radius",'10px')
        button.mousePressed(()=>{
            removeElements()
            currentScene = GAME
        });

    }
    console.log(showButton)
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
    text("Level 2 will be here",width/2,height/2)
}
// Some variables related to this function are here :
let lives = 3;
let score = 0;
function DisplayScoreandLives(){
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(255,255,255)
    fill('rgba(255,255,255, 1)')
    textSize(30);
    text("Lives :",150,50)
    textSize(30);
    text(lives,250,50);
    // Displaying our score here : 
    text("Score :",width/2,50);
    textAlign(CENTER);
    text(score,width/2 + 100,50);
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
            hit = true;
        }
        else{
            if(inc <= 0){
                hit = true;
            }
            inc++;
            if(hit){
                for(let i = 0; i < particleCount; i++){
                    let dx = randomIntFromInterval(-25, 25);
                    let dy = randomIntFromInterval(-20, 20);
                    particles.push(new Particle(this.x + (this.width / 2),this.y + this.height,8,dx,dy,"brown"));
                }
                hit = false;
            }
            this.dy = 0;
        }
        // console.log(this.y < 0)

    }
}
function makeExplosion(x,y){
    // console.log("Running the function")
    fill(110)
    circle(x,y,diameter)
    if(diameter != 0 && diameter < 110){
        // console.log("Is this if statement running?")
        diameter +=5;
    }
    if(diameter > 110){
        // console.log('This if statement is runnning!')
        for(let i = 0; i < 20; i++){
            let dx = randomIntFromInterval(-25, 25);
            let dy = randomIntFromInterval(-20, 20);
            particles.push(new Particle(x,y,8,dx,dy,"red"))
        }
        diameter = 1;
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
                    fire = true;
                    projectiles.push(new Projectile(player.x + player.width ,player.y + (player.height / 2) - 25,20,20,18,18,1));
                    break;
                case "a":
                    projectiles2.push(new Projectile2(player.x + (player.width / 2),player.y,20,20,true,-18,-18))
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
                makeExplosion(enemies[j].x,enemies[j].y);
                score++;
                for(let i = 0; i < 7; i++){
                    let dx = randomIntFromInterval(-25, 25);
                    let dy = randomIntFromInterval(-20, 20);
                    enemies[j].dx = 0;
                    particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                    makeExplosion(enemies[j].x,enemies[j].y);
                }
                projectiles.splice(i,1);
                enemies.splice(j,1);
                // console.log("Destroyed the enemy by using the default method");
            }
            else if(dist(projectiles[i].x, projectiles[i].y, enemies[j].x, enemies[j].y) < 80){
                makeExplosion(enemies[j].x,enemies[j].y)
                score++;
                for(let i = 0; i < 7; i++){
                    let dx = randomIntFromInterval(-25, 25);
                    let dy = randomIntFromInterval(-20, 20);
                    enemies[j].dx = 0;
                    particles.push(new Particle(enemies[j].x,enemies[j].y,8,dx,dy,"red"));
                    makeExplosion(enemies[j].x,enemies[j].y);
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
setInterval(()=>{
    if(currentScene == GAME && dothis){
        enemy3 = new Enemy3(innerWidth - 120,-90,70,120,4,0.1);
        enemies3.push(enemy3)
        spawnBigEnemy = true;   
        dothis = false;
    }
},40000)
setInterval(()=>{
    if(showRicochets){
        console.log(ricochets)
        ricochets.push(new Ricochet(enemy3.x,enemy3.y,20,20,-10,0.01))
    }
},3000)
function Level2(){
    // Let's make level 2 right here :
    textAlign(CENTER);
    textSize(35); 
    text("Level 2",width/2,heigh/2);
}