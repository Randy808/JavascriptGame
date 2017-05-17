class Entity{
  constructor(x,y,hp,size,speed){
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.size = size;
    
    if(speed == undefined){
      this.speed = {
        x: 200/size,
        y: 200/size
      };
    }
    else{
      this.speed = speed;
    }
  }
}