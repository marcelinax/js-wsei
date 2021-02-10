class Canvas {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }
}

class SnowFlake {
  constructor(x, y, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.canvas = new Canvas();
  }
  drawFlake() {
    this.canvas.context.beginPath();
    this.canvas.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fill();
  }
  fall() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
class SnowFlakes {
  constructor() {
    this.snow = [];
    this.canvas = new Canvas();
    this.init();
  }

  createSnow() {
    for (let i = 0; i < 1000; i++) {
      let radius = Math.random() * 2 + 2;
      let x = Math.random() * this.canvas.width;
      let y = Math.random() * this.canvas.height;
      let velocity = {
        x: Math.random() * 0.1,
        y: Math.random() + 1,
      };
      const color = "#ffffff";
      this.snow.push(new SnowFlake(x, y, radius, velocity, color));
    }
  }
  makeSnow() {
    console.log("draw");
    this.canvas.context.clearRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    );
    for (let i = 0; i < this.snow.length; i++) {
      this.snow[i].drawFlake();
      this.snow[i].fall();
      // jeżeli śnieg spadnie to wraca do góry
      if (this.snow[i].y - this.snow[i].radius >= this.canvas.height) {
        this.snow[i].y = 0 - this.snow[i].radius;
      }
      // jeżeli śnieg spadnie po prawej stronie ekranu to wraca na lewą
      if (this.snow[i].x - this.snow[i].radius >= this.canvas.width) {
        this.snow[i].x = 0 - this.snow[i].radius;
      }
    }
    window.requestAnimationFrame(() => {
      this.makeSnow();
    });
  }
  init() {
    this.createSnow();
    this.makeSnow();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const snowFlake = new SnowFlakes();
});
