class Bullet {
    constructor(x, y, xspeed, yspeed, x_acc, y_acc) {
        this.x = x;
        this.y = y;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.x_acc = x_acc;
        this.y_acc = y_acc;
        this.size = 10;
    }
    getDist(bullet2) {
        return sqrt(pow(bullet2.x, 2) + pow(bullet2.y, 2));
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.yspeed -= this.y_acc;
    }
    draw() {
        ellipse(this.x, this.y, 10, 10);
    }
}