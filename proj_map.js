let pMapper;
let quadMap, quadMap2, quadMap3, quadMap4;
let buf1, buf2, buf3, buf4;

let worm;
let wormBufs = [];
let wormGif;

// BELLA SKETCH 
let mushrooms = []
let spores = []
let colors_mushrooms = [[255, 120, 210], [120, 180, 255], [190, 130, 255]]

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

  // all buffers 2D so the worm (and waves) use the same top-left origin
  buf1 = createGraphics(400, 400);
  buf2 = createGraphics(400, 400);
  buf3 = createGraphics(400, 400);
  buf4 = createGraphics(400, 400);


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
 
  // jenny's sketch
  cloudImg = await loadImage("cloud.png");
 
  wormGif = await loadImage("worm.gif");
  wormBufs = [buf1, buf2, buf3, buf4];
  worm = new CHARACTER(wormBufs, wormGif);
 
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

    tanvi_sketch(buf1);
    blue_bg(buf2);
    jenny_bg(buf3);
    another_bg(buf4);

    if (worm) {
        worm.update();
        worm.display();
    }

    quadMap3.displayTexture(buf3);
    quadMap4.displayTexture(buf4);
    quadMap2.displayTexture(buf2);
    quadMap.displayTexture(buf1);



}