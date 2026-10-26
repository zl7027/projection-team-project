
let mushrooms = []
let spores = []

function setup() {
  createCanvas(600, 400)
  angleMode(DEGREES)

  let colors = [[255, 120, 210], [120, 180, 255], [190, 130, 255]]

  for (let i = 0; i < 16; i++) {
    let x = random(width)
    let h = random(35, 110)
    let c = random(colors)

    mushrooms.push(new Mushroom(x, 315, h, c))
  }

  for (let i = 0; i < 90; i++) {
    spores.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      speed: random(0.3, 1.2),
      phase: random(360),
      blinkSpeed: random(0.5, 1.5)
    })
  }
}

function draw() {
  background(8, 7, 25)

  noStroke()

  for (let i = 0; i < 35; i++) {
    fill(80, 50, 150, 5)
    ellipse(300, 300, 600 - i * 10, 250 - i * 4)
  }

  fill(18, 17, 48)
  rect(0, 315, width, 85)

  stroke(110, 90, 190, 100)
  strokeWeight(2)
  line(0, 315, width, 315)

  for (let x = 5; x < width; x += 12) {
    stroke(65, 75, 115, 120)
    strokeWeight(1)

    line(x, 315, x - 3, 307)
    line(x, 315, x + 3, 309)
  }

  noStroke()

  for (let m of mushrooms) {
    m.display()
  }

  for (let s of spores) {
    let blink = pow(
      (sin(frameCount * s.blinkSpeed + s.phase) + 1) / 2,
      10
    )

    fill(190, 170, 255, 100 + blink * 155)
    ellipse(s.x, s.y, s.size + blink * 2)

    // Small glow when flashing
    fill(210, 190, 255, blink * 35)
    ellipse(s.x, s.y, s.size + 10)

    s.y -= s.speed
    s.x += sin(frameCount + s.y) * 0.15

    if (s.y < 0) {
      s.y = height
      s.x = random(width)
    }
  }
}

class Mushroom {
  constructor(x, y, h, c) {
    this.x = x
    this.y = y
    this.h = h
    this.c = c
    this.phase = random(360)
    this.speed = random(0.6, 1.5)
  }

  display() {
    let sway = sin(frameCount * this.speed + this.phase) * 8
    let glow = sin(frameCount * 2 + this.phase) * 0.2 + 1

    push()
    translate(this.x, this.y)

    stroke(this.c[0], this.c[1], this.c[2], 170)
    strokeWeight(this.h * 0.12)
    noFill()

    bezier(0, 0, sway * 0.3, -this.h * 0.4,
           sway, -this.h * 0.7, sway, -this.h)

    translate(sway, -this.h)
    noStroke()

    for (let i = 8; i > 0; i--) {
      fill(this.c[0], this.c[1], this.c[2], 8)
      ellipse(
        0, 0,
        this.h * 0.8 * glow + i * 9,
        this.h * 0.4 * glow + i * 6
      )
    }

    fill(this.c[0], this.c[1], this.c[2], 220)
    arc(0, 0, this.h * 0.8, this.h * 0.45, 180, 360, CHORD)

    fill(255, 220, 255, 180)
    ellipse(-this.h * 0.15, -this.h * 0.1, this.h * 0.07)
    ellipse(this.h * 0.12, -this.h * 0.14, this.h * 0.05)

    pop()
  }
}
