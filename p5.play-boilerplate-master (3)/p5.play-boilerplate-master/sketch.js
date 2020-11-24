var diver;
var score;
var bg, scene;
var diverImg, bioImg;
var facts1, facts2, facts3, facts4;
var trash;
var trash2;
var obstacleGroup;
var fish1, fish2;
var fishGroup;

function preload(){
  scene = loadImage("pictures/Background3.png");
  diverImg = loadImage("pictures/Scuba Diver2.png");
  facts1 = loadImage("pictures/Fact1.png");
  bioImg = loadImage("pictures/Biologist.png");
  facts2 = loadImage("pictures/Fact2.png");
  facts3 = loadImage("pictures/Fact3.png");
  facts4 = loadImage("pictures/Fact4.png");
  trash = loadImage("pictures/Fishing.png");
  trash2 = loadImage("pictures/Trash.png");
  fish1 = loadImage("pictures/Fish1.png");
  fish2 = loadImage("pictures/Fish2.png");
}

function setup() {
  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);

  score = 0;

  bg = createSprite(350,200,400,400);
  bg.addImage(scene);
 
  bg.x = bg.width/2;
  bg.velocityX = -2;

  diver = createSprite(75, 250, 40, 20);
  diver.addImage(diverImg);
  diver.scale = 0.2;

  obstacleGroup = new Group;
  fishGroup = new Group;
}

function draw() {
  background(255,255,255);

  console.log(frameCount)

  text("Score: "+ score, 750, 50)
  
  //making background scroll
  if(bg.x < 0){
    bg.x = bg.width/2;
  }

  //making the scuba diver move up
  if(keyDown(UP_ARROW) && diver.y > 215){
    diver.y = diver.y-20
  }

  //making the scuba diver move down
  if(keyDown(DOWN_ARROW) && diver.y < 390){
    diver.y = diver.y+20
  }

  //changing points if diver is touching the obstacles(trash)
  if(obstacleGroup.isTouching(diver)){
    score = score+20
    obstacleGroup.destroyEach();
  }

  //chegning points if the diver is touching the fish(saving the fish)
  if(fishGroup.isTouching(diver)){
    score = score+20
    fishGroup.destroyEach();
    textSize(20);
    text("You saved a fish!", 400, 50);
  }

  //running functions
  obstacle();
  facts();
  fish();

  drawSprites();
}

//function for spawing the obstackes(trash)
function obstacle(){
  if(frameCount % 200 === 0){
    var obstacles = createSprite(790, 200, 30, 30);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacles.addImage(trash);
      break;
      
      case 2: obstacles.addImage(trash2);
              obstacles.scale = 0.05;
      break;
      
      default: break;
    }
    obstacles.y = random(225, 380);
    obstacles.velocityX = -4;
    obstacles.lifetime = 200;

    obstacleGroup.add(obstacles);
  }
}

//function for spawning the fish
function fish(){
  if(frameCount % 175 === 0){
    var fish = createSprite(790, 250, 30, 30);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: fish.addImage(fish1);
              fish.scale = 0.5;
      break;

      case 2: fish.addImage(fish2);
              fish.scale = 0.4;
      break;

      default: break;
    }
    fish.y = random(225, 390);
    fish.velocityX = -4;
    fish.lifetime = 200;

    fishGroup.add(fish);
  }
}

function facts(){
  
  if(frameCount % 250 === 0){

    var biologist = createSprite(650, 350, 60, 60);
    biologist.visible = false;

    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: biologist.addImage("fact1",facts1);
              biologist.scale = 0.5;
              biologist.visible = true;
      break;
   
      case 2: biologist.addImage("fact2",facts2);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      case 3: biologist.addImage("fact3", facts3);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      case 4: biologist.addImage("fact4", facts4);
              biologist.scale = .5;
              biologist.visible = true;
      break;
   
      default: break;
    }
    if(frameCount % 54 === 0){
      biologist.visible = false;
    }
  }  
}
