var gamestate="play";

var tower,towerimage;

var door,doorimage,doorsgroup;

var climber,climbersgroup,climbersimage;

var invisible,invisiblesgroup;

var ghost,ghostimage;

var bgsound;

var score=0;


function preload(){
  towerimage = loadImage("tower.png");
  
  doorimage = loadImage("door.png");
  
  climbersimage = loadImage("climber.png");
  
  ghostimage = loadImage("ghost-standing.png");
  
  bgsound = loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerimage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostimage);
  
  bgsound.play();
  
  invisiblesgroup = new Group();
  
  doorsgroup = new Group();
  
  climbersgroup = new Group();
  
  //ghost.debug=true;
  
}

function draw(){
  
  background(0);
  if(gamestate==="play"){
    
    score=score+Math.round(frameRate()/60);
    
   if(tower.y>400){
     tower.y=300;
    }
  
   if(keyDown("space")){
     ghost.velocityY=-5;
    }
    
    if(keyDown("left")){
       ghost.x=ghost.x-3;
       }
    if(keyDown("right")){
       ghost.x=ghost.x+3;
    }
  
    ghost.velocityY = ghost.velocityY  + 0.8;
   
    doors();
    
    if(invisiblesgroup.isTouching(ghost)||ghost.y>600){
       ghost.destroy();
      gamestate="end"
       
       }
    drawSprites();
    
    textSize(20)
    text("score:" + score,500,70);
    
  }
  
  if(gamestate==="end"){
     fill("yellow");
     textSize(25);
    text("GameOver!!",230,280);
    bgsound.stop();
     }
}

function doors(){
  
  if(frameCount%240===0){
     door = createSprite(200,-50);
    climber = createSprite(200,10);
    invisible = createSprite(200,15)
    invisible.width=climber.width;
    invisible.height = 2;
    invisible.visible=false;
    
     door.addImage(doorimage);
    climber.addImage(climbersimage);
    
     door.x=Math.round(random(120,400));
    climber.x = door.x;
    invisible.x = climber.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisible.velocityY = 1;
    
    door.lifetime=800;
    climber.lifetime=800;
    invisible.lifetime=800;
    
    
    doorsgroup.add(door);
    climbersgroup.add(climber);
    invisiblesgroup.add(invisible);
    
    //invisible.debug=true;
     }
}