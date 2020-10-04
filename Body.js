class Body {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.stick = createSprite(this.x, this.y, this.w, this.h);
  }

  display() {
    fill(255);
    drawSprites();
  }
}
