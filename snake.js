const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d"); //leidzia "piesti"

// judejimas langeliu principu, 32px plocio ir 32px aukscio langelis
const box = 32;

// kintamieji
var dead;
var eat;
var up;
var right;
var left; 
var down;

// uzkrauna nuotraukas 
const board = new Image();
board.src = "https://s18.postimg.org/kcswgzoqh/board.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";

// sukuria snake
var snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// sukuria food

var food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// rezultatas

var score = 0;

//valdymas

var d;

document.addEventListener("keydown",direction);

function direction(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left;
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up;
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right;
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down;
    }
}


// tikrina ar susiduria
function collision(head,array){
    for(var i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// grafiniai elementai

function draw(){
    
    ctx.drawImage(board,0,0);
    
    for( var i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "darkgreen" : "green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // kur buvo galva
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
    // i kuria puse
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // jeigu suvalgo maista
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // nepasaliname uodegos
    }else{
        // pasaliname uodega
        snake.pop();
    }
    
    // prideda nauja galva
    
    var newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead;
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "50px Calibri";
    ctx.fillText(score,2*box,1.6*box);
}

// iskviecia draw funkcija kas 90 ms

var game = setInterval(draw,90);


















