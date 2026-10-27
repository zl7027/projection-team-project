let pMapper;
let quadMap, quadMap2, quadMap3, quadMap4, quadMap5;
let buf1, buf2, buf3, buf4, buf5;

let worm;
let wormBufs = [];
let wormGif;

// BELLA SKETCH 
let mushrooms = []
let spores = []
let colors_mushrooms = [[255, 120, 210], [120, 180, 255], [190, 130, 255]]

//Nicole's sketch
let groundY = 300; 

let ghostX = -50;
let ghostSpeed = 0.65;

let stars = [];

// jenny's sketch
let cloudImg;
let cloudX = 40;
let cloudX2 = 300;


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  quadMap2 = pMapper.createQuadMap(300, 200, 20, 20);
  quadMap3 = pMapper.createQuadMap(300, 300, 20, 20);
  quadMap4 = pMapper.createQuadMap(300, 300, 20, 20);
  quadMap5 = pMapper.createQuadMap(300, 300, 20, 20);


  // all buffers 2D so the worm (and waves) use the same top-left origin
  buf1 = createGraphics(400, 400);
  buf2 = createGraphics(400, 400);
  buf3 = createGraphics(400, 400);
  buf4 = createGraphics(400, 400);
  buf5 = createGraphics(400, 400);



   // BELLA SKETCH 
  for (let i = 0; i < 16; i++) {
    let x = random(buf2.width)
    let h = random(35, 110)
    let c = random(colors_mushrooms)
    mushrooms.push(new Mushroom(x, 315, h, c))
  }
 
  for (let i = 0; i < 90; i++) {
    spores.push({
      x: random(buf2.width),
      y: random(buf2.height),
      size: random(1, 4),
      speed: random(0.3, 1.2),
      phase: random(360),
      blinkSpeed: random(0.5, 1.5)
    })
  }

    // Nicole
 for (let i = 0; i < 25; i++) {
  stars.push({
    x: random(15, 385),
    y: random(15, 150),
    size: random(2, 5),
    phase: random(TWO_PI)
  });
}
 
  // jenny's sketch
  cloudImg = await loadImage("cloud.png");
 
  wormGif = await loadImage("worm.gif");
  wormBufs = [buf1, buf2, buf3, buf4, buf5];
  worm = new CHARACTER(wormBufs, wormGif);
 
pMapper.load("map.json");

}



// let colors = ['#FFD4D4', '#FF9FE5', '#2B50AA', '#FF858D'];
//   let colors = ['#7FA3C4', '#4F77A3', '#2B4A7A', '#11274F'];
let cols_t = ['#BA3F1D', '#A77E58', '#EEE3AB', '#80A1C1']
let freqs = [0.005, 0.008, 0.012, 0.013];
let waveSpeeds = [0.01, 0.015, 0.03, 0.035];

function tanvi_sketch(pg) {
    pg.background(255); 
    pg.noStroke();

    let t = frameCount;

    for (let i = 0; i < 4; i++) {
        let baseY = pg.height * 0.3 + i * pg.height * 0.15;
        let amp = pg.height * 0.1 - i * 4;
        let freq = freqs[i];
        let nAmp = pg.height * 0.1;
        let shift = t * waveSpeeds[i]; 

        pg.fill(cols_t[i]);
        pg.beginShape();
        pg.vertex(0, pg.height + 10);
        for (let x = 0; x <= pg.width; x += 10) {
            let y = baseY
                    + sin(x * freq + i * 1.5 + shift) * amp
                    + (noise(x * 0.005 + shift * 0.5, i * 10) - 0.5) * nAmp;
            pg.vertex(x, y);
            }
        pg.vertex(pg.width, pg.height + 10);
        pg.endShape(CLOSE);
    }
}

// BELLA MUSHROOM


class Mushroom {
  constructor(x, y, h, c) {
    this.x = x
    this.y = y
    this.h = h
    this.c = c
    this.phase = random(360)
    this.speed = random(0.6, 1.5)
  }

  display(pg) {
    let sway = sin(radians(frameCount * this.speed + this.phase)) * 8
    let glow = sin(radians(frameCount * 2 + this.phase)) * 0.2 + 1
    pg.push()
    pg.translate(this.x, this.y)

    pg.stroke(this.c[0], this.c[1], this.c[2], 170)
    pg.strokeWeight(this.h * 0.12)
    pg.noFill()

    pg.bezier(0, 0, sway * 0.3, -this.h * 0.4,
           sway, -this.h * 0.7, sway, -this.h)

    pg.translate(sway, -this.h)
    pg.noStroke()

    for (let i = 8; i > 0; i--) {
        pg.fill(this.c[0], this.c[1], this.c[2], 8)
        pg.ellipse( 0, 0,
            this.h * 0.8 * glow + i * 9,
            this.h * 0.4 * glow + i * 6
      )
    }

    pg.fill(this.c[0], this.c[1], this.c[2], 220)
    pg.arc(0, 0, this.h * 0.8, this.h * 0.45, PI, TWO_PI, CHORD)

    pg.fill(255, 220, 255, 180)
    pg.ellipse(-this.h * 0.15, -this.h * 0.1, this.h * 0.07)
    pg.ellipse(this.h * 0.12, -this.h * 0.14, this.h * 0.05)

    pg.pop()
  }
}


function blue_bg(pg) {
    // pg.angleMode(DEGREES)
  pg.background(8, 7, 23);
  pg.noStroke()

  for (let i = 0; i < 35; i++) {
    pg.fill(80, 50, 150, 5)
    pg.ellipse(300, 300, 600 - i * 10, 250 - i * 4)
  }

  pg.fill(18, 17, 48)
  pg.rect(0, 315, width, 85)

  pg.stroke(110, 90, 190, 100)
  pg.strokeWeight(2)
  pg.line(0, 315, width, 315)

  for (let x = 5; x < width; x += 12) {
    pg.stroke(65, 75, 115, 120)
    pg.strokeWeight(1)

    pg.line(x, 315, x - 3, 307)
    pg.line(x, 315, x + 3, 309)
  }

  pg.noStroke()

  for (let m of mushrooms) {
    m.display(pg)
  }

  for (let s of spores) {
    let blink = pow(
      (sin(radians(frameCount * s.blinkSpeed + s.phase)) + 1) / 2,
      10
    )

    pg.fill(190, 170, 255, 100 + blink * 155)
    pg.ellipse(s.x, s.y, s.size + blink * 2)

    // Small glow when flashing
    pg.fill(210, 190, 255, blink * 35)
    pg.ellipse(s.x, s.y, s.size + 10)

    s.y -= s.speed
    s.x += sin(radians(frameCount + s.y)) * 0.15

    if (s.y < 0) {
      s.y = pg.height
      s.x = random(pg.width)
    }
  }


}


//Nicole's sketch

function nicole_bg(pg) {
  pg.push();

  pg.angleMode(RADIANS);
  pg.colorMode(RGB);
  pg.rectMode(CORNER);
  pg.ellipseMode(CENTER);

  pg.background("#302039");

  // sky
  let topCol = color("#35234f");
  let bottomCol = color("#bd82a5");

  pg.noStroke();

  for (let y = 0; y < groundY; y++) {
    let amount = y / (groundY - 1);
    let col = lerpColor(topCol, bottomCol, amount);

    pg.fill(col);
    pg.rect(0, y, 400, 1);
  }

  drawMoon(pg);

  // star small
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    let light =
      (Math.sin(frameCount * 0.065 + s.phase) + 1) / 2;

    pg.fill(255, 225, 160, 20 + light * 235);
    pg.circle(s.x, s.y, s.size * (0.5 + light));
  }

  // star big
  drawStar(pg, 32.5, 122.5, 11, 0);
  drawStar(pg, 195, 42.5, 13, 2);
  drawStar(pg, 359, 75, 13.5, 4);

  // hills
  pg.noStroke();

  pg.fill("#626b39");
  pg.ellipse(60, 300.5, 285, 107.5);

  pg.fill("#727d43");
  pg.ellipse(346, 309, 235, 115);

  // pumpkin
  drawPumpkin(pg, 73.5, 264.5, 0.56, false);
  drawPumpkin(pg, 175.5, 225, 1.15, true);
  drawPumpkin(pg, 277, 268, 0.53, false);

  // cat
  drawCat(pg, 338, 255);

  
  for (let i = 0; i < 15; i++) {
    pg.push();
    pg.translate(14 + i * 27, 294.5);
    pg.rotate(-0.7 + (i % 3) * 0.6);
    pg.noStroke();

    if (i % 2 === 0) {
      pg.fill("#d48735");
    } else {
      pg.fill("#394f37");
    }

    pg.ellipse(0, -6.5, 7.5, 18);
    pg.pop();
  }

  // ghost
  ghostX += ghostSpeed;

  if (ghostX > 450) {
    ghostX = -50;
  }


  let ghostY =
    140 + Math.sin(frameCount * 0.035) * 11;

  drawGhost(pg, ghostX, ghostY);

  // underground
  pg.noStroke();
  pg.fill("#302039");
  pg.rect(0, groundY, 400, 400 - groundY);

  pg.pop();
}


// moon
function drawMoon(pg) {
  pg.push();
  pg.translate(77.5, 70);

  pg.noStroke();
  pg.fill("#ffe19a");

  pg.bezierOrder(3);
  pg.beginShape();

  pg.bezierVertex(17.5, -37.5);

  pg.bezierVertex(-32.5, -42.5);
  pg.bezierVertex(-52.5, 17.5);
  pg.bezierVertex(-10, 37.5);

  pg.bezierVertex(5, 45);
  pg.bezierVertex(22.5, 40);
  pg.bezierVertex(32.5, 27.5);

  pg.bezierVertex(-7.5, 35);
  pg.bezierVertex(-27.5, -10);
  pg.bezierVertex(17.5, -37.5);

  pg.endShape(CLOSE);
  pg.pop();
}


function drawStar(pg, x, y, size, phase) {
  let light =
    (Math.sin(frameCount * 0.06 + phase) + 1) / 2;

  pg.push();
  pg.translate(x, y);

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

  
    radius *= 0.6 + light * 0.5;

    pg.vertex(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
  }

  pg.endShape(CLOSE);
  pg.pop();
}


// pumpkin
function drawPumpkin(pg, x, y, size, face) {
  pg.push();
  pg.translate(x, y);

  
  pg.scale(size);


  pg.noFill();
  pg.stroke("#3d5136");
  pg.strokeWeight(9);

  pg.bezier(
    0, -41.5,
    -5, -64,
    9.5, -75.5,
    20, -67
  );

  
  pg.noStroke();

  pg.fill("#db6627");
  pg.ellipse(-29, 0, 51.5, 82);
  pg.ellipse(29, 0, 51.5, 82);

  pg.fill("#ef812e");
  pg.ellipse(-15.5, 0, 52.5, 93.5);
  pg.ellipse(15.5, 0, 52.5, 93.5);

  pg.fill("#f18c35");
  pg.ellipse(0, 0, 42, 98);

  // texture
  pg.noFill();
  pg.stroke("#9c4729");
  pg.strokeWeight(1);

  pg.bezier(
    -16, -43,
    -32, -22.5,
    -32, 22.5,
    -16, 43
  );

  pg.bezier(
    16, -43,
    32, -22.5,
    32, 22.5,
    16, 43
  );

  // face
  if (face) {
    pg.noStroke();
    pg.fill("#30282a");

    pg.triangle(
      -28.5, -8.5,
      -17.5, -26.5,
      -8.5, -8.5
    );

    pg.triangle(
      8.5, -8.5,
      17.5, -26.5,
      28.5, -8.5
    );

    pg.triangle(-5, 5.5, 0, -4.5, 6, 5.5);

    pg.arc(0, 11, 59.5, 39, 0, PI, CHORD);

    pg.fill("#f18c35");
    pg.rect(-14.5, 10.5, 6, 9);
    pg.rect(7, 23.5, 6, 7);
  }

  pg.pop();
}


// cat
function drawCat(pg, x, y) {
  pg.push();
  pg.translate(x, y);

  let tailSwing = Math.sin(frameCount * 0.045) * 12;

  // tail
  pg.noFill();
  pg.stroke("#211d28");
  pg.strokeWeight(6.5);
  pg.strokeCap(ROUND);

  pg.bezier(
    12.5, 32.5,
    48.5 + tailSwing * 0.3, 35,
    22 + tailSwing, -9,
    39 + tailSwing, -6
  );

  
  pg.noStroke();
  pg.fill("#211d28");

  pg.ellipse(0, 12.5, 41.5, 60);
  pg.ellipse(0, -21.5, 46, 36.5);

  
  pg.triangle(
    -21.5, -27.5,
    -21, -51.5,
    -5, -38
  );

  pg.triangle(
    6, -38.5,
    20, -52.5,
    22, -26.5
  );

  
  pg.ellipse(-9, 35, 14.5, 10);
  pg.ellipse(9, 35, 14.5, 10);

  
  let blink = frameCount % 240 > 229;

  pg.fill("#f5cc72");

  if (blink) {
    pg.ellipse(-10.5, -22, 12.5, 1.5);
    pg.ellipse(10.5, -22, 12.5, 1.5);
  } else {
    pg.ellipse(-10.5, -22, 12.5, 7);
    pg.ellipse(10.5, -22, 12.5, 7);

    pg.fill("#211d28");
    pg.ellipse(-10.5, -22, 2.5, 7.5);
    pg.ellipse(10.5, -22, 2.5, 7.5);
  }

  
  pg.fill("#d98967");
  pg.triangle(-2.5, -14.5, 2.5, -14.5, 0, -12);

  
  pg.stroke("#211d28");
  pg.strokeWeight(1);

  for (let i = 0; i < 3; i++) {
    pg.line(
      -22, -14.5 + i * 3.5,
      -31.5, -18 + i * 5
    );

    pg.line(
      22, -14.5 + i * 3.5,
      31.5, -18 + i * 5
    );
  }

  pg.pop();
}


// ghost
function drawGhost(pg, x, y) {
  pg.push();
  pg.translate(x, y);

  pg.rotate(Math.sin(frameCount * 0.025) * 0.08);

  pg.noStroke();
  pg.fill("#fff0c9");

  pg.bezierOrder(3);
  pg.beginShape();

  pg.bezierVertex(-21, 10);

  pg.bezierVertex(-24.5, -6.5);
  pg.bezierVertex(-20.5, -26);
  pg.bezierVertex(-5, -27.5);


  pg.bezierVertex(12, -30);
  pg.bezierVertex(20.5, -17);
  pg.bezierVertex(21, -4);


  pg.bezierVertex(21.5, 7);
  pg.bezierVertex(26.5, 12);
  pg.bezierVertex(32, 15.5);


  pg.bezierVertex(23.5, 27);
  pg.bezierVertex(17.5, 12.5);
  pg.bezierVertex(11, 20);

  pg.bezierVertex(2.5, 29);
  pg.bezierVertex(-1, 14.5);
  pg.bezierVertex(-7.5, 20.5);

  pg.bezierVertex(-15.5, 25.5);
  pg.bezierVertex(-19, 17);
  pg.bezierVertex(-21, 10);

  pg.endShape(CLOSE);

  pg.fill("#30282a");
  pg.ellipse(-6, -8.5, 4.5, 7.5);
  pg.ellipse(6, -8.5, 4.5, 7.5);
  pg.ellipse(0.5, 2, 4, 5.5);

  pg.pop();
}

//jenny

function jenny_bg(pg) {
  let groundY = pg.height - 80; 
 
  pg.background(92, 148, 252);
  pg.noStroke();
 

  pg.image(cloudImg, cloudX, 30, 100, 50);
  pg.image(cloudImg, cloudX2, 80, 70, 35);
  cloudX = cloudX + 0.5;
  cloudX2 = cloudX2 + 0.3;
  if (cloudX > pg.width) cloudX = -100;
  if (cloudX2 > pg.width) cloudX2 = -70;
 

  drawHill(pg, 100, groundY, 200, 120);
  drawHill(pg, 320, groundY, 260, 160);
 
  drawGround(pg, groundY);
 

  drawBlock(pg, 120, groundY - 80);
  drawBlock(pg, 280, groundY - 120);
  drawBlock(pg, 310, groundY - 120);
  drawBlock(pg, 340, groundY - 120);
}
 
function drawHill(pg, x, y, w, h) {
  pg.fill(0, 168, 0);
  pg.ellipse(x, y, w, h);
}
 
function drawGround(pg, groundY) {
  pg.fill(200, 76, 12);
  pg.rect(0, groundY, pg.width, pg.height - groundY);
 
  pg.stroke(0);
  pg.line(0, groundY + 20, pg.width, groundY + 20);
  pg.line(0, groundY + 40, pg.width, groundY + 40);
  pg.line(0, groundY + 60, pg.width, groundY + 60);
 
  for (let x = 0; x < pg.width; x = x + 40) {
    pg.line(x, groundY, x, pg.height);
  }
  pg.noStroke();
}
 
function drawBlock(pg, x, y) {
  pg.fill(252, 160, 68);
  pg.rect(x, y, 30, 30);
 
  pg.fill(0);
  pg.textSize(22);
  pg.textAlign(CENTER, CENTER);
  pg.text("?", x + 15, y + 15);
}
 
function another_bg(pg) {
  pg.background(10, 100, 50);
}



function green_bg(pg) {
  pg.background(0, 255, 0);
}

function another_bg(pg) {
  pg.background(10, 100, 50);
}

function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());


  if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class CHARACTER {
  constructor(buffers, img) {
    this.buffers = buffers;
    this.img = img;
    this.index = 0;
    this.speed = 4; 
    this.vSpeed = 0.01;
    this.dir = 1;
    this.yLim = 0.5;

    this.w = 180;
    this.h = 200
    this.x = this.w / 2;
  }

  get pg() {
    return this.buffers[this.index];
  }

  nextIndex() {
    return (this.index + 1) % this.buffers.length;
  }

  prevIndex() {
    return (this.index - 1 + this.buffers.length) % this.buffers.length;
  }

  update() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      this.dir = 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      this.dir = -1;
    }

    if (keyIsDown(UP_ARROW)) this.yLim -= this.vSpeed;
    if (keyIsDown(DOWN_ARROW)) this.yLim += this.vSpeed;

    // constrain on y axis
    let margin = (this.h / 2) / this.pg.height;
    this.yLim = constrain(this.yLim, margin, 1 - margin);

    // pass worm to next page
    if (this.x > this.pg.width) {
      this.x -= this.pg.width;
      this.index = this.nextIndex();
    } else if (this.x < 0) {
      this.index = this.prevIndex();
      this.x += this.pg.width;
    }
  }

  display() {
    let pg = this.pg;
    this.drawBody(pg, this.x, this.yLim * pg.height);
  }

  drawBody(pg, x, y) {
    pg.push();
    pg.translate(x, y);
    pg.scale(this.dir, 1);
    pg.imageMode(CENTER);
    pg.image(this.img, 0, 0, this.w, this.h);
    pg.pop();
  }
}

function draw() {
    background(0);

    // tanvi_sketch(buf1);
    // blue_bg(buf2);
    // jenny_bg(buf3);
    // nicole_bg(buf4);
    // jenny_bg(buf5)

    jenny_bg(buf1);
    jenny_bg(buf2);
    nicole_bg(buf3);
    tanvi_sketch(buf4);
    blue_bg(buf5);

    if (worm) {
        worm.update();
        worm.display();
    }
    quadMap.displayTexture(buf4);
    quadMap2.displayTexture(buf5);
    quadMap3.displayTexture(buf1);
    quadMap4.displayTexture(buf3);
    quadMap5.displayTexture(buf2);



}