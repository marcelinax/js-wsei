const scoreToWin = 20;
let score = 0;

const getRandomPosition = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const detectCollisions = (obj1, obj2, center = false) => {
  const x1 = obj1.positionX,
    y1 = obj1.positionY,
    d1 = obj1.diameter,
    x2 = obj2.positionX,
    y2 = obj2.positionY,
    d2 = obj2.diameter;

  if (center) {
    if (
      x1 + 5 >= x2 - 5 &&
      x1 - 5 <= x2 + 5 &&
      y1 + 5 >= y2 - 5 &&
      y1 - 5 <= y2 + 5
    )
      return true;
    return false;
  }

  if (
    x1 + d1 >= x2 - d2 &&
    x1 - d1 <= x2 + d2 &&
    y1 + d1 >= y2 - d2 &&
    y1 - d1 <= y2 + d2
  ) {
    return true;
  }
  return false;
};

class Canvas {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
  }
}

class Hole {
  constructor() {
    this.canvas = new Canvas();
    this.diameter = getRandomPosition(30, 55);
    this.generateHoleCoordinates();
  }

  generateHoleCoordinates() {
    do {
      this.positionX = getRandomPosition(
        this.diameter,
        this.canvas.canvas.clientWidth - this.diameter
      );
      this.positionY = getRandomPosition(
        this.diameter,
        this.canvas.canvas.clientHeight - this.diameter
      );
    } while (detectCollisions(ball, this));
  }

  drawHole() {
    this.canvas.context.beginPath();
    this.canvas.context.arc(
      this.positionX,
      this.positionY,
      this.diameter - 15,
      0,
      2 * Math.PI
    );
    this.canvas.context.fillStyle = "#FFFFFF";
    this.canvas.context.strokeStyle = "#000000";
    this.canvas.context.lineWidth = 1;
    this.canvas.context.shadowColor = "#6c757d";
    this.canvas.context.shadowBlur = 6;
    this.canvas.context.shadowOffsetX = 2;
    this.canvas.context.shadowOffsetY = 3;
    this.canvas.context.fill();
    this.canvas.context.stroke();
  }

  getCoordinates() {
    return {
      x: this.positionX,
      y: this.positionY,
    };
  }
}

class Ball {
  constructor() {
    this.canvas = new Canvas();
    this.diameter = 20;

    this.positionX = getRandomPosition(
      this.diameter,
      this.canvas.canvas.clientWidth - this.diameter
    );
    this.positionY = getRandomPosition(
      this.diameter,
      this.canvas.canvas.clientHeight - this.diameter
    );
  }
  drawBall() {
    this.canvas.context.beginPath();
    this.canvas.context.arc(
      this.positionX,
      this.positionY,
      this.diameter,
      0,
      2 * Math.PI
    );
    this.canvas.context.fillStyle = "#000000";
    this.canvas.context.strokeStyle = "#000000";
    this.canvas.context.lineWidth = 1;
    this.canvas.context.fill();
    this.canvas.context.stroke();
  }

  updatePosition() {
    this.positionX += deviceOrientation.getOrientation().a / 10;
    this.positionY += deviceOrientation.getOrientation().b / 10;

    if (this.positionX + this.diameter > this.canvas.canvas.clientWidth)
      this.positionX = this.canvas.canvas.clientWidth - this.diameter;
    if (this.positionX - this.diameter < 0) this.positionX = this.diameter;
    if (this.positionY - this.diameter < 0) this.positionY = this.diameter;
    if (this.positionY + this.diameter > this.canvas.canvas.clientHeight)
      this.positionY = this.canvas.canvas.clientHeight - this.diameter;

    if (detectCollisions(hole, this, true)) {
      score++;
      if (score < scoreToWin) {
        hole = new Hole();
      } else {
        hole.positionX = -500;
        hole.positionY = -500;
        gui.stopTimer();
      }
    }
  }
}

class DeviceOrientation {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }
  setOrientation(a, b) {
    this.alpha = a;
    this.beta = b;
  }
  getOrientation() {
    return {
      a: this.alpha,
      b: this.beta,
    };
  }
}

class GUI {
  constructor() {
    this.timeElement = document.querySelector(".time");
    this.startBtnElement = document.querySelector(".start-btn");
    this.restartBtnElement = document.querySelector(".restart-btn");
    this.scoreElement = document.querySelector(".score");

    this.startBtnElement.addEventListener("click", () => {
      hole = new Hole();
      this.startTime = new Date();
      this.endTimer = null;
      this.startBtnElement.style.display = "none";
      this.restartBtnElement.style.display = "block";
    });
    this.restartBtnElement.addEventListener("click", () => {
      this.startTime = new Date();
      this.endTimer = null;
      score = 0;
      hole = new Hole();
    });
  }

  stopTimer() {
    this.endTimer = new Date();
    this.startBtnElement.style.display = "block";
    this.restartBtnElement.style.display = "none";
  }

  update() {
    if (this.startTime) {
      let dif;
      if (this.endTimer) {
        dif = Math.floor(
          (this.endTimer.getTime() - this.startTime.getTime()) / 1000
        );
      } else {
        dif = Math.floor(
          (new Date().getTime() - this.startTime.getTime()) / 1000
        );
      }
      this.timeElement.innerHTML = `${Math.floor(dif / 60)}:${
        dif < 10 ? "0" : ""
      }${+(dif % 60)}`;
    }

    this.scoreElement.innerHTML = `${score}/${scoreToWin}`;
  }
}

const deviceOrientation = new DeviceOrientation(0, 0);
window.addEventListener("deviceorientation", (ev) => {
  deviceOrientation.setOrientation(ev.alpha, ev.beta);
});
const _canvas = new Canvas();
const ball = new Ball();
let hole = new Hole();
hole.positionX = -500;
hole.positionY = -500;
const gui = new GUI();

const render = () => {
  _canvas.context.clearRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);
  hole.drawHole();
  ball.drawBall();
  ball.updatePosition();
  gui.update();
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
