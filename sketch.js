// Title: Help Tomatito Cross the Road!

// vvv INSTRUCTIONS vvv
// Timer starts when player starts moving
// Refresh to start a new game

// Shoutout to Rafa for completing it with 12 seconds left && playtesting it

let playerX = 275;
let playerY = 615;
let score = 0;
let player;
let isTouching = false;

// Graphics
let tomatito;
let tomatitoWin;
let tomatitoDead;
let defaultCar;
let store;

// Sound Effects and Music from Pixabay
let victory;
let lose;
let step;
let bgMusic;

// Streets from bottom to top
let street1;
let street2;
let street3;
let street4;
let street5;
let street6;

function preload() {
  // Graphics
  tomatito = loadImage("tomatito-v2.png");
  tomatitoWin = loadImage("tomatito-win-v2.png");
  tomatitoDead = loadImage("tomatito-ded.png");
  store = loadImage("Store.png");
  defaultCar = loadImage("Car.png");

  // Sound Effects
  soundFormats('mp3');
  victory = loadSound('victory.mp3');
  lose = loadSound('death_sound_effect.mp3');
  step = loadSound('walk_sound_effect.mp3');

  bgMusic = loadSound('game_music.mp3');

}

function setup() {
  createCanvas(600, 700);
  bgMusic.play(0, 1, 0.1, 0, 20);

  let amount = 1;
  let carX = 0;
  let carGap = random(150, 200);

  street1 = [];
  for (let i = 0; i < amount; i += 1) {
    let y = 560;
    let carVelocity = random(1,3);
    let cars = new Car(carX, y, carVelocity);
    street1.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street1.push(cars);
      
      j += 1;
    }

    carX = 0;

  }

  street2 = [];
  for (let i = 0; i < amount; i += 1) {
    carX = 0;
    let y = 460;
    let carVelocity = random(2,3);
    let cars = new Car(carX, y, carVelocity);
    street2.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street2.push(cars);
      
      j += 1;
    }

  }

  street3 = [];
  for (let i = 0; i < amount; i += 1) {
    carX = 0;
    let carVelocity = random(2,4);
    let y = 360;
    let cars = new Car(carX, y, carVelocity);
    street3.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street3.push(cars);
      
      j += 1;
    }

  }

  street4 = [];
  for (let i = 0; i < amount; i += 1) {
    carX = 0;
    let carVelocity = random(3,4);
    let y = 260;
    let cars = new Car(carX, y, carVelocity);
    street4.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street4.push(cars);
      
      j += 1;
    }

  }

  street5 = [];
  for (let i = 0; i < amount; i += 1) {
    carX = 0;
    let carVelocity = random(3,4);
    let y = 160;
    let cars = new Car(carX, y, carVelocity);
    street5.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street5.push(cars);
      
      j += 1;
    }

  }

  street6 = [];
  for (let i = 0; i < amount; i += 1) {
    carX = 0;
    let carVelocity = random(4,5);
    let y = 60;
    let cars = new Car(carX, y, carVelocity);
    street6.push(cars);

    let j = 0;
    
    while(j < 3) {
      carX += carGap;
      cars = new Car(carX, y, carVelocity);
      street6.push(cars);
      
      j += 1;
    }

  }
}


function draw() {
  background(79, 121, 66);

  mapLayout();

  player = new Player(playerX, playerY);
  player.render();

  for (let i = 0; i < street1.length; i += 1) {
    // Street 1
    street1[i].move();
    street1[i].render();
    street1[i].carTouched();

    // Street 2
    street2[i].move();
    street2[i].render();
    street2[i].carTouched();

    // Street 3
    street3[i].move();
    street3[i].render();
    street3[i].carTouched();

    //Street 4
    street4[i].move();
    street4[i].render();
    street4[i].carTouched();

    // Street 5
    street5[i].move();
    street5[i].render();
    street5[i].carTouched();

    // Street 6
    street6[i].move();
    street6[i].render();
    street6[i].carTouched();
  }

  border();

  scoreKeeper();

  timer();

  print(bgMusic.currentTime());
  
}

function timer() {
  if (bgMusic.currentTime() >= 19) {
    fill(255);
      textSize(50);
      textFont('Courier New');
      textAlign(CENTER, BOTTOM)
      text("Time's Up!", 300, height / 2);
      bgMusic.stop();
      lose.play();
    noLoop()
  }
}

function scoreKeeper() {
  fill(255);
  textSize(20);
  textFont('Courier New');
  textAlign(LEFT, BOTTOM);
  text('Score: ' + score, 30, 685);

  let time = ceil(bgMusic.currentTime());
  let timeLeft = 20 - time;

  textAlign(RIGHT, BOTTOM);
  text('Seconds Left: ' + timeLeft, 560, 685);

}

function border() {
  stroke(255);
  fill(0);
  rect(0, 650, width, 50);
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 35;
  }

  render() {
    // Walking Sprite
    if (this.x > 0 && this.x + this.size < 600) {
      tint(255,255,255);
      image(tomatito, this.x, this.y);
    }

    // Prevent Out of Bounds
    if (this.x < 0 || this.x + this.size > 600) {
      playerX = 275;
      image(tomatito, this.x, this.y);
    }

    else if (this.y + this.size > 650) {
      playerY = 615;
      score = 0;
      image(tomatito, this.x, this.y);
    }

    // Winning Sprite
    // 25 is y coord that shop is at
    if (this.y < 25) {
      image(tomatitoWin, this.x, this.y);

      fill(255);
      textSize(50);
      textFont('Courier New');
      textAlign(CENTER, BOTTOM)
      text("You Made It!", 300, height / 2);

      victory.play();
      bgMusic.stop();

      noLoop();
    }

    // Lose Sprite
    if (isTouching == true) {
      image(tomatitoDead, this.x, this.y);

      fill(255);
      textSize(50);
      textFont('Courier New');
      textAlign(CENTER, BOTTOM)
      text("You Died!", 300, height / 2);

      lose.play();
      bgMusic.stop();

      noLoop();
    }
  
}
}

function keyTyped() {
  let horizontalMovement = 15;

  if (key == 'd') {
    playerX += horizontalMovement;
    step.play(0, 1, 1.5);
    //right
  }

  else if (key == 'a') {
    playerX -= horizontalMovement;
    step.play(0, 1, 1.5);
    //left
  }

  let verticalMovement = 25;

  if (key == 'w') {
    playerY -= verticalMovement;
    score += 15;
    step.play(0, 1, 1.5);
    //up
  }

  else if (key == 's') {
    playerY += verticalMovement;
    score -= 15;
    step.play(0, 1, 1.5);
    //down
  }

}

function mapLayout() {
  fill(128);
  noStroke();

  // Streets
  let gap = 100;
  let startingY = 550;

  for(let i = 0; i <= 5; i += 1) {
    rect(0, startingY, width, 60);
    startingY -= gap;
  }

  // Shop
  tint(255,255,255);
  image(store, 267, 5);
}

class Car {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.size = 45;
    this.gap = random(85, 200);
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
  }

  move() {
    this.x += this.velocity;

    if (this.x - this.size >= width) {
      // Change Values
      this.x = 0;
      this.r = random(0,255);
      this.g = random(0,255);
      this.b = random(0,255);
    }
  }

  render() {
   tint(this.r,this.g,this.b);
   image(defaultCar, this.x, this.y);
  }

  carTouched() {
    let touchX = false;
    let touchY = false;
    let playerSize = 28;

    if ((playerX >= this.x || playerX + playerSize >= this.x) && playerX <= this.x + playerSize) {
      touchX = true;
    }
    else {
      touchX = false;
    }

    if ((playerY >= this.y || playerY + playerSize >= this.y) && playerY <= this.y + playerSize) {
      touchY = true;
    }
    else {
      touchY = false;
    }

    if (touchX == true && touchY == true) {
      isTouching = true;
    }
    
  }
}
