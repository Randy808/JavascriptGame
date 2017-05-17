
function bulletHit(bullets, i, enemies) {
   //debugger;
    for (var j = 0; j < enemies.length; j++) {
        if (enemies[j].isHit(bullets[i])) {
            removeFromArray(bullets, i);
            return true;
        }
    }
    return false;
}



class sneakBackEnemy extends Entity {
    constructor(x, y, hp, size, player) {
        super(x, y, hp, size);
        this.player = player;
        this.directionX = 1;
        this.directionY = 1;
        this.bullets = [];
        this.radialBullets = [];
        this.color = 'green';
        this.dead = false;
    }
    draw() {
        fill(this.color);
        rect(this.x, this.y, 10, 10);
        this.color = 'green';
    }
    move() {

        if (this.y > 600 || this.y < 0) {
            this.directionY *= -1;
        }
        this.y += this.directionY * this.speed.y;

        if (this.x > 800 || this.x < 0) {
            this.directionX *= -1;
        }
        this.x += this.directionX * this.speed.x;

    }

    getDist(bullet,x,y) {
        return sqrt(pow(bullet.x - bullet.xspeed - x, 2) + pow(bullet.y + bullet.yspeed - y, 2));
    }
    edgesCollide(bullet){
      if( this.getDist(bullet, this.x, this.y) < bullet.size || this.getDist(bullet, this.x + this.size, this.y) < bullet.size ||
        this.getDist(bullet, this.x, this.y + this.size) < bullet.size || this.getDist(bullet, this.x + this.size, this.y + this.size) < bullet.size ){
        return true;
      }
      return false;
    }

    isHit(bullet) {
        //console.log(this.getDist(bullet) + " <= " + this.radi);
        debugger;
        if (bullet.x > this.x && bullet.y > this.y
            && bullet.x < (this.x + size)  && bullet.y < (this.y + size) 
            || this.edgesCollide(bullet) ) {
            this.color = "red";
            this.hp--;
            if (this.hp == 0) {
                this.dead = true;
            }
            return true;
        }
        return false;
    }

}

class Enemy {

    constructor(id) {
        this.id = id;
        this.x = random(25, width - 25);
        this.y = random(0);
        this.hit = false;
        this.type = "enemy";
        this.speed = .5;
        this.radi = 100;
        this.changingDir = false;
        this.direction = -1;
        this.color = 'white';
        this.dead = false;
        this.hp = 5;
        //this.color
    }

    draw() { //--------

            //y+=random(speed*direction);
            //meteory+=random(speed*direction);
            //this.y+=random(speed*direction);
            fill(this.color);
            ellipse(this.x, this.y, this.radi, this.radi);
            this.color = 'white';
            fill('white');
            //spacing++;
        } //--------------------------------

    move() {
            //this.x = this.x + random(-1,1);
            var changingDir = this.changingDir;

            if (this.y > height - this.radi || this.y < 0) {

                if (!this.changingDir) { //if its out of bounds and not changing direction
                    this.direction = -this.direction; //change the direction
                    this.changingDir = true; //set changing dir to true, so it doesn't change direction until it finishes the current change
                }
                this.y = this.y + (5 * this.direction);
            } else {
                this.y = this.y + 5 * this.direction;
                this.changingDir = false;
            }
        } //------------------------------
    clear() {
        this.x = 0;
        this.y = 0;
        speed = 2;
        radi = 0;

    }
    getDist(bullet) {
        return sqrt(pow(bullet.x - bullet.xspeed - this.x, 2) + pow(bullet.y + bullet.yspeed - this.y, 2));
    }

    isHit(bullet) {
        //console.log(this.getDist(bullet) + " <= " + this.radi);
        if (this.getDist(bullet) <= this.radi / 2) {
            this.color = "red";
            this.hp--;
            if (this.hp == 0) {
                this.dead = true;
            }
            return true;
        }
        return false;
    }


}

function removeFromArray(arr, i) {
    var last = arr.length - 1;
    var temp = arr[i];
    arr[i] = arr[last];
    arr[last] = temp;
    arr.splice(last, 1);
}
var direction = 1;
var spacing = 0;
var h = 400;
var v = 400;
var speed = 2;
var meteorx = h;
var meteory = v;

var shotFired = false;
var movingLeft = false;
var movingRight = false;
var movingUp = false;
var movingDown = false;


var enemies = [];
var i = 0;
var counter = 0;

var speed = 4;
var player1 = new Player(400, 400, 5, 50);
var en;

//================================================
function setup() {
    createCanvas(800, 600);
    var x = 0;
    var y = 0;

    for (i = 0; i < 8; i++) {
        enemies[i] = new Enemy(i);
    }
    en = new sneakBackEnemy(400, 400, 2, 10, player1);
    enemies.push(en);

} //----------------------------------------------




//---------------------------------------------------
function draw() {

    background(204);

    player1.draw();
    player1.updateBullets(enemies);
    player1.updateRadialBullets(enemies);



    for (i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].move();
        if (enemies[i].dead) {
            removeFromArray(enemies, i);
        }
    }

    //var m = setInterval(drawEnemy, 2000);
    //y = y+5;
    if (shotFired) {
        var y_acc = random();
        player1.bullets.push(new Bullet(player1.x, player1.y, 0, -8, 0, 5 * y_acc));
        shotFired = false;
    }
    if (movingLeft) {
        player1.x -= player1.speed.x;
    }
    if (movingRight) {
        player1.x += player1.speed.x;
    }
    if (movingUp) {
        player1.y -= player1.speed.y;
    }
    if (movingDown) {
        player1.y += player1.speed.y;
    }


    

    





} //----------------------------------------------

//


function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        movingLeft = true;
    }
    if (keyCode == RIGHT_ARROW) {
        movingRight = true;
    }
    if (keyCode == UP_ARROW) {
        movingUp = true;
    }
    if (keyCode == DOWN_ARROW) {
        movingDown = true;
    }
    if (keyCode == 32) {
        shotFired = true;
    }
}

function keyReleased() {
    if (keyCode == LEFT_ARROW) {
        movingLeft = false;
    }
    if (keyCode == RIGHT_ARROW) {
        movingRight = false;
    }
    if (keyCode == UP_ARROW) {
        movingUp = false;
    }
    if (keyCode == DOWN_ARROW) {
        movingDown = false;
    }
    if (keyCode == 32) {
        shotFired = false;
    }
}
