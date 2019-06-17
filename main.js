var canvas =document.getElementById('canvas');
var ctx= canvas.getContext('2d');

let ground = new Image;
ground.src = "./img/snake-background.png";
// ground.height= canvas.height;
// ground.width= canvas.width;


//snake head
let headleft= new Image();
headleft.src="./img/snakeheadleft.png";

let headup= new Image();
headup.src="./img/snakeheadup.png";

let headright= new Image();
headright.src="./img/snakeheadright.png";

let headdown= new Image();
headdown.src="./img/snakeheaddown.png";


//snake body 
let imagesnake = new Image();
imagesnake.src ="./img/snakehead.png";
let imagesnakebodyx= new Image();
imagesnakebodyx.src="./img/snakebodyx.png";
let imagesnakebodyy= new Image();
imagesnakebodyy.src="./img/snakebodyy.png";

// snake tail
let lefttail = new Image();
lefttail.src="./img/tall-left.png";



let foodimage = new Image();
foodimage.src = "./img/food.png";
foodimage.width=10;
foodimage.height=10;

// box size 
let box = 32;

// my snake 
let snake= [];
snake[0]={x:10*box, y:10*box};



let food={
  x: Math.floor(Math.random()*17+1)*box,
  y: Math.floor(Math.random()*15+3)*box
};
let score = 0;


let d;





document.addEventListener("keydown",direction);

function direction(event){
  switch(event.keyCode){
    case 37:
    if(d!="RIGHT"){
      d="LEFT";
    }
    break;

    case 38:
    if(d!="DOWN"){
      d="UP";
    }
    break;

    case 39:
    if(d!="LEFT"){
      d="RIGHT";
    }
    break;

    case 40:
    if(d!="UP"){
      d="DOWN";
    }
    break;

  }

}

function collision(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}







function draw(){
ctx.drawImage(ground,0,0);
for(let i=0; i<snake.length;i++){
  
  if(i==0){
    switch(d){
      case "LEFT":
      ctx.drawImage(headleft,snake[i].x,snake[i].y);
      break;

      case "UP":
      ctx.drawImage(headup,snake[i].x,snake[i].y);
      break;

      case "RIGHT":
      ctx.drawImage(headright,snake[i].x,snake[i].y);
      break;

      case "DOWN":
      ctx.drawImage(headdown,snake[i].x,snake[i].y);
      break;

      default:
      ctx.drawImage(imagesnake,snake[i].x,snake[i].y);
      break;
    }
  }else{
    // if(d=="LEFT"||d=="RIGHT"){
    //     ctx.drawImage(imagesnakebodyx,snake[i].x,snake[i].y);
      
    // }else{
    //   ctx.drawImage(imagesnakebodyy,snake[i].x,snake[i].y);
    // }
    ctx.fillStyle="lightgreen";
    ctx.fillRect(snake[i].x,snake[i].y,box,box); 
    ctx.strokeStyle="green";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
}

 
  ctx.drawImage(foodimage,food.x,food.y);

  ctx.fillStyle= "style";
  ctx.font= "45px Change one";
  ctx.fillText(score,2*box,1.6*box);

  }



//old head
snakeX =snake[0].x;
snakeY = snake[0].y;


switch(d){
  case "LEFT":
    snakeX-=box;
    break;
  case "RIGHT":
    snakeX+=box;
    break;

  case "UP":
    snakeY-=box;
    break;

  case "DOWN":
    snakeY+=box;
    break;
  }


   // feeding the snake 
  if((snakeX==food.x)&&(snakeY==food.y)){
    score++;
    food={
      x: Math.floor(Math.random()*17+1)*box,
      y: Math.floor(Math.random()*17+1)*box
    };
  }else{
    snake.pop();
  }
  
  let newHead={
    x : snakeX,
    y : snakeY 
  };

  if(snakeX > canvas.width-2*box|| snakeX < box || snakeY < box || snakeY > canvas.width-2*box || collision(newHead,snake)){
    clearInterval(game);
    
  }

  snake.unshift(newHead);


  



}

let game = setInterval(draw,100);