class Bullet {
  constructor(x, y, width, height, ctx, object) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.object = object;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.image = new Image();
    this.image.src = "images/space_bullets.png";
    this.collided = false;

    this.collidedWith = this.collidedWith.bind(this);
  }

  draw() {
    let x;
    let y;
    let h;
    let w;
    if (this.object === "ship") {
      x = 200;
      y = 200;
      h = 60;
      w = 60;
    } else {
      (x = 0), (y = 0), (h = 30), (w = 30);
    }
    this.ctx.drawImage(
      this.image,
      x,
      y,
      h,
      w,
      this.x - 10,
      this.y - 10,
      this.width,
      this.height
    );
    this.move();
    this.enemyMove();
  }

  collidedWith(object) {
    if (
      this.x < object.x + object.width + 50 &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.height + this.y > object.y
    ) {
      this.collided = true;
    }
  }

  move() {
    if (this.y > 0) {
      this.y -= 6;
    }
  }

  enemyMove() {
    if (this.y < this.ctx.canvas.height + 10) {
      this.y += 6;
    }
  }
}

module.exports = Bullet;
