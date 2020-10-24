//Global Variables
var bananaImage;

var obstacleImage, obstacleGroup;

var background;

var score = 0;

var play = 1;

var end = 0;
var gameState = play;

function preload(){
  backgroundImage = loadImage("jungle.jpg");
  
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  //groundImage = loadImage("ground.jpg");
  
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200,700);
  
  //bground = createSprite(200,180,400,20);
  //bground.addImage("jungle",backgroundImage);
  //bground.scale = 1.5;
  //bground.x = bground.width /2;
  
  //ground = createSprite(600,220,10,40);
  //ground.addImage("ground",groundImage);
  
  //invisibleGround = createSprite(200,190,400,10)
  //invisibleGround.visible = false;
  
  player = createSprite(50,220,20,50);
  player.addAnimation("monkey",playerRunning);
  player.scale = 0.15;
  player.velocityX = 2;
  
  bananaGroup = new Group();
  
  obstacleGroup = new Group();
}


function draw(){
  background(backgroundImage);
  edges = createEdgeSprites();

  stroke ("white");
  textSize(20);
  fill("white")
  
  if (gameState === play){
  if(keyDown("space")) {
    player.velocityY = -10;
  }

  camera.position.x = player.x;
  
  player.velocityY = player.velocityY + 0.8
  
  
  if(bananaGroup.isTouching(player)){
    score = score + 2;
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(player)){
    gameState = end;
  }

        
  switch(score){
    case 10: player.scale=0.12;
    break;
    case 20: player.scale=0.14;
    break;
    case 30: player.scale=0.16;
    break;
    case 40: player.scale=0.18;
    break;
    default: break;
  }
  
  //if(obstaclesGroup.isTouching(player)){
   // player.scale = 0.2;
  //}
  
  
  spawnBanana();
  
  spawnObstacle();
  }
  else if(gameState === end){
    gameOver = createSprite(player.x,350,20,20);
    gameOver.addImage("over",gameOverImage);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    player.velocityX = 0;
    player.velocityY = 0;
    //bground.velocityX = 0;
  }
  
  player.collide(edges[3]);
  
  drawSprites();
  text("score:" + score,player.x,50);
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(player.x+500,350,40,10);
    banana.y = Math.round(random(300,350));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 700;
    bananaGroup.add (banana);
  }
}

function spawnObstacle() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(player.x+500,700,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 700;
    obstacleGroup.add (obstacle);
  }
}