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

var h=400;
var v=400;
var speed = 2;
var meteorx = h;
var meteory = v;
var shotFired = false;
var bullets = [];
var enemyArray=[];
var i=0;
var counter = 0;


/*
function drawEnemy() {

  for(i=counter;i<5;i++){
      enemyArray[i].display();

    }
  //  counter+=5;
}*/




//---------------------------------------------------
function draw() {

background(204);
beginShape();
vertex(h,v);
vertex(h-50,v+50);
vertex(h+50,v+50);
endShape(CLOSE);


for(i=0;i<5;i++){
    enemyArray[i].display();
    enemyArray[i].move();
  }

//var m = setInterval(drawEnemy, 2000);
//y = y+5;
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
  this.x= random(25,width-25);
this.y = random(0);
this.hit = false;
this.type= "enemy";
this.speed = .5;
var radi = 100;

this.display = function(){//--------
//y+=random(speed*direction);
    //meteory+=random(speed*direction);
this.y+=random(speed*direction);

    if(this.y>height-radi||this.y<0){
      direction=-direction;
    }
  ellipse(this.x, this.y, radi, radi);
}//--------------------------------
this.move = function(){
  //this.x = this.x + random(-1,1);
  this.y = this.y+5;
}//------------------------------
this.clear=function(){
  this.x=0;
  this.y=0;
  speed=2;
  radi=0;

}





}//-------------------------------------------------
