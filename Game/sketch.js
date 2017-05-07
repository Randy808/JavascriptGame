class Bullet{
  constructor(x,y,hspeed,vspeed,x_acc,y_acc){
    this.x = x;
    this.y = y;
    this.hspeed = hspeed;
    this.vspeed = vspeed;
    this.x_acc = x_acc;
    this.y_acc = y_acc;
  }
}

class Player{
  constructor(h,v,w){
    this.h = h;
    this.v = v;
    this. w = w;

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
  draw(){
    beginShape();
    vertex(this.h,this.v);
    vertex(this.h-50,this.v+50);
    vertex(this.h+50,this.v+50);
    endShape(CLOSE);
  }

}

//================================================
function setup() {
createCanvas(800,600);
var x = 0;
var y = 0;

for(i=0;i<30;i++){
enemyArray[i] = new Enemy(i);
}

}//----------------------------------------------

var direction = 1;
var spacing=0;
var h=400;
var v=400;
var speed = 2;
var meteorx = h;
var meteory = v;

var shotFired = false;
var movingLeft = false;
var movingRight = false;
var movingUp = false;
var movingDown = false;

var bullets = [];
var enemyArray=[];
var i=0;
var counter = 0;

var speed = 4;
var player1 = new Player(400,400);


/*
function drawEnemy() {

  for(i=counter;i<5;i++){
      enemyArray[i].display();

    }
    //spacing=0;
  //  counter+=5;
}*/




//---------------------------------------------------
function draw() {

background(204);

player1.draw();

for(i=0;i<10;i++){
    enemyArray[i].display();
    enemyArray[i].move();
  }

  //var m = setInterval(drawEnemy, 2000);
  //y = y+5;
  if(shotFired){
    bullets.push(new Bullet(player1.h,player1.v,0,-8,0,.4));
    shotFired = false;
  }
  if(movingLeft){
    player1.h-=speed;
  }
  if(movingRight){
    player1.h+=speed;
  }
  if(movingUp){
    player1.v-=speed;
  }
  if(movingDown){
    player1.v+=speed;
  }


for(var i = 0 ; i < bullets.length; i++){
  ellipse(bullets[i].x,bullets[i].y,10,10);

  var hspeed = bullets[i].hspeed;
  var vspeed = bullets[i].vspeed;
  var y_acc = bullets[i].y_acc;

  bullets[i].x -= hspeed;
  bullets[i].y += vspeed;

  bullets[i].vspeed += y_acc;
  

  if(bullets[i].y > 800 || bullets[i].y < 0){
     bullets.splice(i, 1); //remove the bullet if it goes away
  }

}


 



}//----------------------------------------------

//
function Enemy(id){
  this.id = id;
  this.x= random(25,width-25);
  this.y = random(0);
  this.hit = false;
  this.type= "enemy";
  this.speed = .5;
  var radi = 100;
  this.changingDir = false;
  this.direction = -1;

  this.display = function(){//--------

//y+=random(speed*direction);
    //meteory+=random(speed*direction);
  //this.y+=random(speed*direction);

  ellipse(this.x+radi, this.y, radi, radi);
  //spacing++;
}//--------------------------------
this.move = function(){
  //this.x = this.x + random(-1,1);
  var changingDir = this.changingDir;

  if(this.y>height-radi||this.y<0){
    
    if(!this.changingDir){ //if its out of bounds and not changing direction
      this.direction = -this.direction; //change the direction
      this.changingDir = true; //set changing dir to true, so it doesn't change direction until it finishes the current change
    }
    this.y = this.y+ (5*this.direction);
  }
  else{
    this.y = this.y+5*this.direction;
    this.changingDir = false;
  }
}//------------------------------
this.clear=function(){
  this.x=0;
  this.y=0;
  speed=2;
  radi=0;

}


}//-------------------------------------------------

function keyPressed(){
  if(keyCode==LEFT_ARROW){
    movingLeft = true;
  }
  if(keyCode==RIGHT_ARROW){
    movingRight = true;
  }
  if(keyCode==UP_ARROW){
    movingUp = true;
  }
  if(keyCode==DOWN_ARROW){
    movingDown = true;
  }
  if(keyCode==32){
      shotFired = true;
  }
}

function keyReleased(){
  if(keyCode==LEFT_ARROW){
    movingLeft = false;
  }
  if(keyCode==RIGHT_ARROW){
    movingRight = false;
  }
  if(keyCode==UP_ARROW){
    movingUp = false;
  }
  if(keyCode==DOWN_ARROW){
    movingDown = false;
  }
  if(keyCode==32){
      shotFired = false;
  }
}

