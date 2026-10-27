let groundY = 600;

let ghostX = -100;
let ghostSpeed = 1.3;

let stars = [];
let sky;

let pg;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  angleMode(RADIANS);


  pg = createGraphics(400, 400);
  pg.pixelDensity(1);
  pg.angleMode(RADIANS);

 
  sky = createGraphics(800, 800);
  sky.pixelDensity(1);

  let topCol = color("#35234f");
  let bottomCol = color("#bd82a5");

  for (let y = 0; y < groundY; y++) {
    let amount = y / (groundY - 1);
    let col = lerpColor(topCol, bottomCol, amount);

    sky.stroke(col);
    sky.line(0, y, 800, y);
  }

  for (let i = 0; i < 25; i++) {
    stars.push({
      x: random(30, 770),
      y: random(30, 300),
      size: random(4, 10),
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  
  drawScene();


  image(pg, 0, 0);
}



function drawScene() {
  pg.background("#302039");

  pg.push();

 
  pg.scale(0.5);

  pg.image(sky, 0, 0);
  pg.noStroke();

  drawMoon();

  // star small
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    let light =
      (sin(frameCount * 0.065 + s.phase) + 1) / 2;

    pg.fill(255, 225, 160, 20 + light * 235);
    pg.circle(s.x, s.y, s.size * (0.5 + light));
  }

  // star big
  drawStar(65, 245, 22, 0);
  drawStar(390, 85, 26, 2);
  drawStar(718, 150, 27, 4);

  // hills
  pg.noStroke();
  pg.fill("#626b39");
  pg.ellipse(120, 601, 570, 215);

  pg.fill("#727d43");
  pg.ellipse(692, 618, 470, 230);

  
  drawPumpkin(147, 529, 0.56, false);
  drawPumpkin(351, 450, 1.15, true);
  drawPumpkin(554, 536, 0.53, false);

  drawCat(676, 510);


  for (let i = 0; i < 15; i++) {
    pg.push();

    pg.translate(28 + i * 54, 589);
    pg.rotate(-0.7 + (i % 3) * 0.6);
    pg.noStroke();

    if (i % 2 === 0) {
      pg.fill("#d48735");
    } else {
      pg.fill("#394f37");
    }

    pg.ellipse(0, -13, 15, 36);

    pg.pop();
  }

  // ghost
  ghostX += ghostSpeed;

  if (ghostX > 800 + 100) {
    ghostX = -100;
  }


  let ghostY =
    280 + sin(frameCount * 0.035) * 22;

  drawGhost(ghostX, ghostY);

  // ground
  pg.noStroke();
  pg.fill("#302039");
  pg.rect(0, groundY, 800, 800 - groundY);

  pg.pop();
}


// moon
function drawMoon() {
  pg.push();
  pg.translate(155, 140);
  pg.noStroke();
  pg.fill("#ffe19a");

  pg.beginShape();
  pg.vertex(35, -75);
  pg.bezierVertex(-65, -85, -105, 35, -20, 75);
  pg.bezierVertex(10, 90, 45, 80, 65, 55);
  pg.bezierVertex(-15, 70, -55, -20, 35, -75);
  pg.endShape(CLOSE);

  pg.pop();
}


// big star
function drawStar(x, y, size, phase) {
  let light =
    (sin(frameCount * 0.06 + phase) + 1) / 2;

  pg.push();
  pg.translate(x, y);
  pg.scale(0.6 + light * 0.5);

  pg.noStroke();
  pg.fill(255, 225, 160, 25 + light * 230);

  pg.beginShape();

  for (let i = 0; i < 16; i++) {
    let angle = i * TWO_PI / 16;
    let radius;

    if (i % 2 === 0) {
      radius = size;
    } else {
      radius = size * 0.22;
    }

    pg.vertex(
      cos(angle) * radius,
      sin(angle) * radius
    );
  }

  pg.endShape(CLOSE);
  pg.pop();
}


// pumpkin
function drawPumpkin(x, y, size, face) {
  pg.push();
  pg.translate(x, y);
  pg.scale(size);

  
  pg.noFill();
  pg.stroke("#3d5136");
  pg.strokeWeight(18);

  pg.bezier(
    0, -83,
    -10, -128,
    19, -151,
    40, -134
  );

  
  pg.noStroke();

  pg.fill("#db6627");
  pg.ellipse(-58, 0, 103, 164);
  pg.ellipse(58, 0, 103, 164);

  pg.fill("#ef812e");
  pg.ellipse(-31, 0, 105, 187);
  pg.ellipse(31, 0, 105, 187);

  pg.fill("#f18c35");
  pg.ellipse(0, 0, 84, 196);

 
  pg.noFill();
  pg.stroke("#9c4729");
  pg.strokeWeight(2);

  pg.bezier(
    -32, -86,
    -64, -45,
    -64, 45,
    -32, 86
  );

  pg.bezier(
    32, -86,
    64, -45,
    64, 45,
    32, 86
  );

  
  if (face) {
    pg.noStroke();
    pg.fill("#30282a");

    pg.triangle(-57, -17, -35, -53, -17, -17);
    pg.triangle(17, -17, 35, -53, 57, -17);
    pg.triangle(-10, 11, 0, -9, 12, 11);

    pg.arc(0, 22, 119, 78, 0, PI, CHORD);

    pg.fill("#f18c35");
    pg.rect(-29, 21, 12, 18);
    pg.rect(14, 47, 12, 14);
  }

  pg.pop();
}


// cat
function drawCat(x, y) {
  pg.push();
  pg.translate(x, y);

  let tailSwing = sin(frameCount * 0.045) * 24;

  // tail
  pg.noFill();
  pg.stroke("#211d28");
  pg.strokeWeight(13);
  pg.strokeCap(ROUND);

  pg.bezier(
    25, 65,
    97 + tailSwing * 0.3, 70,
    44 + tailSwing, -18,
    78 + tailSwing, -12
  );

  // body&head
  pg.noStroke();
  pg.fill("#211d28");

  pg.ellipse(0, 25, 83, 120);
  pg.ellipse(0, -43, 92, 73);

  
  pg.triangle(-43, -55, -42, -103, -10, -76);
  pg.triangle(12, -77, 40, -105, 44, -53);

  
  pg.ellipse(-18, 70, 29, 20);
  pg.ellipse(18, 70, 29, 20);

  
  let blink = frameCount % 240 > 229;

  pg.fill("#f5cc72");

  if (blink) {
    pg.ellipse(-21, -44, 25, 3);
    pg.ellipse(21, -44, 25, 3);
  } else {
    pg.ellipse(-21, -44, 25, 14);
    pg.ellipse(21, -44, 25, 14);

    pg.fill("#211d28");
    pg.ellipse(-21, -44, 5, 15);
    pg.ellipse(21, -44, 5, 15);
  }

  
  pg.fill("#d98967");
  pg.triangle(-5, -29, 5, -29, 0, -24);

  
  pg.stroke("#211d28");
  pg.strokeWeight(2);

  for (let i = 0; i < 3; i++) {
    pg.line(-44, -29 + i * 7, -63, -36 + i * 10);
    pg.line(44, -29 + i * 7, 63, -36 + i * 10);
  }

  pg.pop();
}



function drawGhost(x, y) {
  pg.push();
  pg.translate(x, y);

  pg.rotate(sin(frameCount * 0.025) * 0.08);

  pg.noStroke();
  pg.fill("#fff0c9");

  pg.beginShape();
  pg.vertex(-42, 20);

  pg.bezierVertex(-49, -13, -41, -52, -10, -55);
  pg.bezierVertex(24, -60, 41, -34, 42, -8);
  pg.bezierVertex(43, 14, 53, 24, 64, 31);
  pg.bezierVertex(47, 54, 35, 25, 22, 40);
  pg.bezierVertex(5, 58, -2, 29, -15, 41);
  pg.bezierVertex(-31, 51, -38, 34, -42, 20);

  pg.endShape(CLOSE);

  pg.fill("#30282a");
  pg.ellipse(-12, -17, 9, 15);
  pg.ellipse(12, -17, 9, 15);
  pg.ellipse(1, 4, 8, 11);

  pg.pop();
}