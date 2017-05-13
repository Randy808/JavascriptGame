class Bullet{
  constructor(x,y,hspeed,vspeed,x_acc,y_acc){
    this.x = x;
    this.y = y;
    this.hspeed = hspeed;
    this.vspeed = vspeed;
    this.x_acc = x_acc;
    this.y_acc = y_acc;
  }
  getDist(bullet2){
  	return sqrt(pow(bullet2.x,2) + pow(bullet2.y,2));
  }
  update(){
	this.x += this.hspeed;
	this.y += this.vspeed;
	this.vspeed -= this.y_acc;
  }
  draw(){
  	ellipse(this.x,this.y,10,10);
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

class Enemy{

  constructor(id){
    this.id = id;
    this.x= random(25,width-25);
    this.y = random(0);
    this.hit = false;
    this.type= "enemy";
    this.speed = .5;
    this.radi = 100;
    this.changingDir = false;
    this.direction = -1;
    this.color = 'white';
    //this.color
  }

display(){//--------

//y+=random(speed*direction);
    //meteory+=random(speed*direction);
  //this.y+=random(speed*direction);
  fill(this.color);
  ellipse(this.x, this.y, this.radi, this.radi);
  this.color = 'white';
  fill('white');
  //spacing++;
}//--------------------------------

move(){
  //this.x = this.x + random(-1,1);
  var changingDir = this.changingDir;

  if(this.y>height-this.radi||this.y<0){
    
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
clear(){
  this.x=0;
  this.y=0;
  speed=2;
  radi=0;

}
getDist(bullet2){
    return sqrt(pow(bullet2.x - bullet2.hspeed - this.x,2) + pow(bullet2.y + bullet2.vspeed - this.y,2));
  }

  isHit(bullet){
    //console.log(this.getDist(bullet) + " <= " + this.radi);
    if(this.getDist(bullet) <= this.radi/2){
      this.color = "red";
      return true;
    }
    return false;
  }


}

function removeFromArray(arr, i){
  var last = arr.length - 1;
  var temp = arr[i];
  arr[i] = arr[last];
  arr[last] = temp;
  arr.splice(last,1);


}
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
var bullets2 = [];
var enemies=[];
var i=0;
var counter = 0;

var speed = 4;
var player1 = new Player(400,400);

//================================================
function setup() {
createCanvas(800,600);
var x = 0;
var y = 0;

for(i=0;i<4;i++){
enemies[i] = new Enemy(i);
}

}//----------------------------------------------


//---------------------------------------------------
function draw() {

background(204);

player1.draw();

for(i=0;i<4;i++){
    enemies[i].display();
    enemies[i].move();
  }

  //var m = setInterval(drawEnemy, 2000);
  //y = y+5;
  if(shotFired){
  	var y_acc= random();
    bullets.push(new Bullet(player1.h,player1.v,0,-8,0,5*y_acc));
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

var c = false;
for(var i = 0 ; i < bullets.length; i++){ //go through all existing bullets and update their positions
  bullets[i].update();
  bullets[i].draw();
  for(var j = 0; j < 4 ; j++){
    if( enemies[j].isHit(bullets[i])){
      removeFromArray(bullets,i);
      c = true;
      break;
    }
  }
  if(c){
    c = false;
    continue;
  }
 

  if(bullets[i].y > 800 || bullets[i].y < 0){
     removeFromArray(bullets,i); //remove the bullet if it's out of screen bounds
  }
  else{
  	for(var j = 0; j < i ; j++){ //look at all previously shot bullets

//  		console.log(bullets[i].getDist(bullets[j]));
  		if(bullets[i].getDist(bullets[j]) < 10 || bullets[j].y > bullets[i].y ){ //if the previous bullet intersects with current bullet
  			for(var k = 0; k < 10 ; k++){//add radial bullets where the current bullet is
  				bullets2.push(new Bullet(bullets[i].x,bullets[i].y,4*cos(  k*(2*3.14/10)  ),4*sin(  k*(2*3.14/10)  ),0,.4));
  			}

  			removeFromArray(bullets,i);//remove intersecting bullets
  			removeFromArray(bullets,j);
  			break;
  		}
  	}
  }

}

for(var i = 0 ; i < bullets2.length; i++){ //exploded bullets need not collide sincethey start from same enter circle
	bullets2[i].update();
  	bullets2[i].draw();	
	if(bullets2[i].y > 800 || bullets2[i].y < 0){
     bullets2.splice(i, 1); //remove the bullet if it goes away
  }
}

 



}//----------------------------------------------

//


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

