var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var heart1image,heart2image,heart3image;
var heart1,heart2,heart3;
var ZombieGroup;

var bullets=70;
var gameState="fight";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/BG2.jpg")
  zombieImg=loadImage("assets/zombie.png");
  
  heart1image = loadImage("assets/heart_1.png");

  heart2image = loadImage("assets/heart_2.png");

  heart3image = loadImage("assets/heart_3.png");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   //creating a sprite for remaing life

   heart1=createSprite(displayWidth-150,40,20,20)
   heart1.visible=false
   heart1.addImage("heart1",heart1image)
   heart1.scale=0.4

   heart2=createSprite(displayWidth-100,40,20,20)
   heart2.visible=false
   heart2.addImage("heart2",heart2image)
   heart2.scale=0.4

   heart3=createSprite(displayWidth-150,40,20,20)
  
   heart3.addImage("heart3",heart3image)
   heart3.scale=0.4

   
// creating a group for Zombies and bullets
ZombieGroup=new Group()

bulletsGroup=new Group()


        

}

function draw() {
  background(0); 

  if(gameState==="fight"){
// moving the player UP and DOWN and Making the game Mobile Compatible
if(keyDown("UP_ARROW")||touches.length>0){
  player.y=player.y-30;
}

if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y=player.y+30;
}
  

// realease Bullest and change the Image of shooter to shoooting Position when "SPACE" is pressed
if(keyWentDown("space")){
bullet=createSprite(displayWidth-1150,player.y-30,20,10)

bullet.velocityX=20

bulletsGroup.add(bullet)
player.depth=bullet.depth
player.depth=player.depth+2;
player.addImage(shooter_shooting)
bullets=bullets-1;
  }

  // player goes back to orignal Standind Image once we stop pressing space bar
  else if(keyWentUp("space")){
 player.addImage(shooterImg)

  }

  // Go to Gamestate Bullet when player runs out of Bullets

  if(bullets==0){
    gameState="bullet"
  }

  //destory the Zombie when the Bullet touchese it
  if(ZombieGroup.isTouching(bulletsGroup)){
for(var i=0;i<ZombieGroup.length;i++){

  if(ZombieGroup[i].isTouching(bulletsGroup)){
    ZombieGroup[i].destroy()
    bulletsGroup.destroyEach()
  }
}

  }



  

//destory Zombie when player touches it
if(ZombieGroup.isTouching(player)){
  for(var i=0;i<ZombieGroup.length;i++){
    if(ZombieGroup[i].isTouching(player)){
      ZombieGroup[i].destroy()
    }
  }
}
//calling the function to spawn Zombies
enemy();
}





drawSprites();

//destory Zombie and Player and Display message in game state lost
if(gameState=="lost"){
  textSize(100)
  fill("red")
  text("You Lost",400,400)
  ZombieGroup.destroyEach()
  player.destroy();

}

//destory Zombie and Player and Display Message gamestate WON

else if(gameState=="Won"){

  textSize(100)
  fill("yellow")
  text("You Won",400,400)
  ZombieGroup.destroyEach()
  player.destroy();

}

//destory Zombie player and bullets and Display message Gamestsate Bullet

else if(gameState=="bullet"){
  textSize(50)
  fill("red")
  text("You Ran Out of bullets!!!",400,400)
  ZombieGroup.destroyEach()
  player.destroy();
  bulletsGroup.destroyEach()


}

}
//creating a function to spawn Zombies
function enemy(){
if(frameCount%50===0){
  // creating Random Position of ZOmbie in X and Y position
  zombie=createSprite(random (500,1100),random(100,500),40,40)

  zombie.addImage(zombieImg)
  zombie.scale=0.15
  zombie.velocityX=-3
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,400,400)

  zombie.lifetime=400
  ZombieGroup.add(zombie);

}


}

