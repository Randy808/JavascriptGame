//================================================
function setup() {
createCanvas(800,600);
x = 0;
y = 0;

for(i=0;i<5;i++){
enemyArray[i] = new Enemy(i);
}
}//----------------------------------------------

var direction = 1;

var h=400;
var v=400;
var speed = 2;
var meteorx = h;
var meteory = v;
var shotFired = false;
var bullets = [];
var enemyArray=[];

//---------------------------------------------------
function draw() {

  background(204);
beginShape();
vertex(h,v);
vertex(h-50,v+50);
vertex(h+50,v+50);
endShape(CLOSE);


for(i=0;i<enemyArray.length;i++){
enemyArray[i].move();
enemyArray[i].display();
}



if(shotFired){
  bullets.push([h,v,0,-1]);
  shotFired = false;
}

for(var i = 0 ; i < bullets.length; i++){
  ellipse(bullets[i][0],bullets[i][1],10,10);
  bullets[i][1] += bullets[i][3];
  bullets[i][3]-=.4;

}

if(keyIsPressed){
  if(keyCode==LEFT_ARROW){
    h-=2;
  }
  if(keyCode==RIGHT_ARROW){
    h+=2;
  }
  if(keyCode==UP_ARROW){
    v-=2;
  }
  if(keyCode==DOWN_ARROW){
    v+=2;
  }
  if(keyCode==32){
      shotFired = true;

  }
}
}//----------------------------------------------

//
function Enemy(id){
  this.id = id;
  this.x= random(0,width);
  this.y= random(0,height);
this.hit = false;
this.type= "enemy";
this.speed = .5;
var radi = 100;

this.display = function(){//--------
//y+=random(speed*direction);
    //meteory+=random(speed*direction);
//y+=random(speed*direction);

    if(y>height-radi||y<0){
      direction=-direction;
    }
  ellipse(this.x+(120), this.y, radi, radi);
}//--------------------------------
this.move = function(){
  this.x = this.x + random(-1,1);
  this.y = this.y+ random(-1,1);
}//------------------------------
this.clear=function(){
  this.x=0;
  this.y=0;
  speed=2;
  radi=0;

}



}//-------------------------------------------------
