function setup() {
createCanvas(800,600);
x = 0;
y = 0;
}

var direction = 1;
var speed = 1.0;
var radi = 100;
var x;
var y;
var h=400;
var v=400;
var meteorx = h;
var meteory = v;
var shotFired = false;
var bullets = [];

function draw() {
  background(204);
beginShape();
vertex(h,v);
vertex(h-50,v+50);
vertex(h+50,v+50);
endShape(CLOSE);

if(shotFired){
  bullets.push([h,v,0,-1]);
  shotFired = false;
}

for(var i = 0 ; i < bullets.length ; i++){
  ellipse(bullets[i][0],bullets[i][1],10,10);
  bullets[i][1] += bullets[i][3];
  bullets[i][3]-=.4;

}


for(i=0;i<5;i++){
  x+=random(speed*direction);
  meteorx+=random(speed*direction);

  //y+=random(speed*direction);

  if(x>width-radi||x<0){
    direction=-direction;
  }
ellipse(x, y+(i*120), radi, radi);
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
}
