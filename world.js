let cloudImg;
let cloudX = 50;
let cloudX2 = 400;
let groundY = 400; 
 
function preload() {
  cloudImg = loadImage("cloud.png");
}
 
function setup() {
  createCanvas(500, 500);
  noStroke();
}
 
function draw() {
  background(92, 148, 252);
 
  image(cloudImg, cloudX, 40, 120, 60);
  image(cloudImg, cloudX2, 90, 90, 45);
  cloudX = cloudX + 0.5;
  cloudX2 = cloudX2 + 0.3;
  if (cloudX > width) cloudX = -120;
  if (cloudX2 > width) cloudX2 = -90;
 
  drawHill(120, groundY, 250, 150);
  drawHill(400, groundY, 320, 200);
 
  drawGround();
 
  drawBlock(150, groundY - 100);
  drawBlock(350, groundY - 150);
  drawBlock(380, groundY - 150);
  drawBlock(410, groundY - 150);
}
 
function drawHill(x, y, w, h) {
  fill(0, 168, 0);
  ellipse(x, y, w, h);
}
 
function drawGround() {
  fill(200, 76, 12);
  rect(0, groundY, width, height - groundY);
 
  stroke(0);
  line(0, groundY + 25, width, groundY + 25);
  line(0, groundY + 50, width, groundY + 50);
  line(0, groundY + 75, width, groundY + 75);
 
  for (let x = 0; x < width; x = x + 50) {
    line(x, groundY, x, height);
  }
  noStroke();
}
 
function drawBlock(x, y) {
  fill(252, 160, 68);
  rect(x, y, 30, 30);
 
  fill(0);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("?", x + 15, y + 15);
}
 