export default class Plane {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  draw_test() {
    this.ctx.fillStyle = "rgb(200 0 0)";
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = "rgb(0 0 200 / 50%)";
    this.ctx.fillRect(30, 30, 50, 50);
  }
}
