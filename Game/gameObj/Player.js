class Player extends Entity {
    constructor(x, y, hp, size) {
        super(x, y, hp, size,{x:10,y:10});
        this.bullets = [];
        this.radialBullets = [];

    }

    shoot() {
        var y_acc = random();
        bullets.push(new Bullet(player1.x, player1.y, 0, -8, 0, 5 * y_acc));
    }
    updateBullets(enemies) {
        var c = false;
        for (var i = 0; i < this.bullets.length; i++) { //go through all existing this.bullets and update their positions
            this.bullets[i].update();
            this.bullets[i].draw();
            c = bulletHit(this.bullets, i, enemies);
            if (c) {
                c = false;
                continue;
            }


            if (this.bullets[i].y > 800 || this.bullets[i].y < 0) {
                removeFromArray(this.bullets, i); //remove the bullet if it's out of screen bounds
            } else {
                for (var j = 0; j < i; j++) { //look at all previously shot this.bullets
                    if (this.bullets[i].getDist(this.bullets[j]) < 10 ||
                        this.bullets[j].y > this.bullets[i].y) {
                        //if the previous bullet intersects with current bullet
                        for (var k = 0; k < 10; k++) { //add radial bullets where the current bullet is
                            this.radialBullets.push(new Bullet(this.bullets[i].x, this.bullets[i].y, 4 * cos(k * (2 * 3.14 / 10)), 4 * sin(k * (2 * 3.14 / 10)), 0, .4));
                        }
                        removeFromArray(this.bullets, i); //remove intersecting this.bullets
                        removeFromArray(this.bullets, j);
                        break;
                    }
                }
            }

        }
    }

    updateRadialBullets(enemies) {
        var c = false;
        for (var i = 0; i < this.radialBullets.length; i++) { //exploded bullets need not collide sincethey start from same enter circle
            this.radialBullets[i].update();
            this.radialBullets[i].draw();
            c = bulletHit(this.radialBullets, i, enemies);
            if (c) {
                c = false;
                continue;
            }
            if (this.radialBullets[i].y > 800 || this.radialBullets[i].y < 0) {
                this.radialBullets.splice(i, 1); //remove the bullet if it goes away
            }
        }
    }

    /*sign (fPoint p1, fPoint p2, fPoint p3)
    {
      return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }
    PointInTriangle (fPoint pt, fPoint v1, fPoint v2, fPoint v3)
    {
      bool b1, b2, b3;
      b1 = sign(pt, v1, v2) < 0.0f;
      b2 = sign(pt, v2, v3) < 0.0f;
      b3 = sign(pt, v3, v1) < 0.0f;
      return ((b1 == b2) && (b2 == b3));
    }
    */
    draw() {
        fill('white');
        beginShape();
        vertex(this.x, this.y);
        vertex(this.x - 50, this.y + 50);
        vertex(this.x + 50, this.y + 50);
        endShape(CLOSE);
    }


}
