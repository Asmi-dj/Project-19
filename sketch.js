var spaceImg, space;
var doorImg, door, doorsGroup;


var ghost, ghostImg;
var score = 0 
var gameState = "play"

function preload(){
  spaceImg = loadImage("gal.jpg");
  doorImg = loadImage("robot.png");
  

  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300,300);
  space.addImage("tower",spaceImg);
  space.velocityY = 1;
  doorsGroup = new Group()
  ghost = createSprite(300, 300)
  ghost.addImage("ghost", ghostImg);
  ghost.debug = false 
  ghost.setCollider("rectangle", 0, 0, 300, 200);
  ghost.scale = 0.4; 



}

function draw() {

  background("black");
  if(gameState==="play") {
  if(space.y > 400){
      space.y = 300
    }

    if (keyDown("space"))
    {
      ghost.velocityY = -3;
    }

    if (keyDown("right"))
    {
      ghost.x = ghost.x+3; 
    }

    if (keyDown("left"))
    {
      ghost.x = ghost.x -3; 
    }

    if (ghost.isTouching(door))
    {
      ghost.destroy();
      gameState = "end" 
    }

    ghost.velocityY = ghost.velocityY+0.5; 


    if (ghost.y > 600)
    {
       gameState = "end"
    }

    


    spawn_doors();
   
    

    drawSprites();
  }

  if (gameState === "end") 
  {
    fill("orange")
    textSize(33);
    text("GAME OVER! HA, Loser!",100,300);
    
    

  }
}

function spawn_doors() 
{

  if (frameCount%300===0)
{
  door = createSprite(Math.round(random(100,500)), 0, 2, 3)
  door.addImage("door", doorImg);
  door.scale = 0.4
  door.velocityY = 1;
  door.lifetime = 600;
  door.debug = false 
  door.setCollider("rectangle", 0, 0, 200, 300)
  
  doorsGroup.add(door);

  
  ghost.depth = door.depth;
  ghost.depth+=1;
}

}
