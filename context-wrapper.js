class ContextWrapper {
  constructor(context) {
    this.ctx = context;
    this.scale = 1;
    this.imageCache = {};

    this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
  }

  drawImage(fn, x, y) {
    if (this.imageCache[fn]) {
      let image = this.imageCache[fn];
      this.ctx.drawImage(image, (x/this.scale*this.ctx.canvas.width/2) - (image.width/2), (y/this.scale*this.ctx.canvas.height/2) - (image.height/2));
    } else {
      let image = new Image();
      image.src = `./assets/${fn}`;
      image.onload = () => {
        this.ctx.drawImage(image, (x/this.scale*this.ctx.canvas.width/2) - (image.width/2), (y/this.scale*this.ctx.canvas.height/2) - (image.height/2));
      }
      this.imageCache[fn] = image;
    }
  }

  setScale(scale) {
    this.scale = scale;
  }

  clear() {
    this.ctx.clearRect(-1 * this.ctx.canvas.width/2, -1 * this.ctx.canvas.height/2, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export { ContextWrapper };