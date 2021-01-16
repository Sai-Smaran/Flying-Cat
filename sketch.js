var Play = 1;
var End = 0;
var GameState = 1;

var bg, bgimg;
var cat, catimg1, catimg2, catimg3
var helicopter, heliimg;

var score;

var obstacles;


function preload() {
  bgimg = loadImage("imgs/bluesky.png");
  heliimg = loadImage("imgs/helicopter.png");
  catimg1 = loadImage("imgs/cat1flying-a.png");

  obstacles = new Group();
}

function setup() {
  createCanvas(600, 600);
  bg = createSprite(200, 200, 100, 100);
  bg.addImage(bgimg);
  bg.scale = 1.5;
  
  cat = createSprite(200, 200);
  cat.addImage(catimg1);
}

function draw() {
  background(0);
  camera.position.x = cat.x;
  camera.position.y = cat.y;
  if (GameState === Play) {
    if (bg.x < 100) {
      bg.x = 300;
    }
    if (keyDown("up")) {
      cat.y = cat.y - 5;
    }
    if (keyDown("down")) {
      cat.y = cat.y + 5;
    }
    if (obstacles.isTouching(cat)) {
      GameState = End;
    }
    score = frameCount;
    text("Score: "+score, 400, 20);
    textSize(20);
    spawn();
    drawSprites();
  }
  if (GameState === End) {
    camera.position.x = width/2;
    camera.position.y = height/2;
    fill("blue");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

function spawn() {
  if (frameCount % 200 === 0) {
    helicopter = createSprite(800, 300);
    helicopter.addImage(heliimg);
    helicopter.scale = 0.9;
    helicopter.velocityX = -3.5;
    helicopter.y = Math.round(random(50, 300));
    helicopter.lifetime = 300;
    obstacles.add(helicopter);
    helicopter.debug = true;
  }
}