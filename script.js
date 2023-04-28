const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
let score=document.getElementById('score')


const tileSize = 20;
const numRows = canvas.height/tileSize;
const numCols = canvas.width/tileSize;



let snake = [{ x:10, y:10 }];
let food = { x:15, y:15 };
let dx = 0;
let dy = 0;

/*modal*/
var modal = document.getElementById("myModal");
var modalStart = document.getElementById("myModal2");
var btn = document.getElementById("btn");
var btnStart = document.getElementById("btnStart");




document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowUp' && dy === 0){
        dx = 0;
        dy = -1;
    }
    if(event.key === 'ArrowDown' && dy === 0){
        dx = 0;
        dy = 1;
    }
    if(event.key === 'ArrowLeft' && dx === 0){
        dx = -1;
        dy = 0;
    }
    if(event.key === 'ArrowRight' && dx === 0){
        dx = 1;
        dy = 0;
    }
})

function main(){
    setTimeout(() => {
        Score()
        moveSnake()
        checkSnakeCollision()
        checkFoodCollision()
        clearCanvas()
        drawSnake()
        drawFood()
        main()
    }, 200)
}

function drawSnake(){
   ctx.fillStyle = 'green'




    snake.forEach((segment) => {
        ctx.fillRect(segment.x*tileSize, segment.y*tileSize, tileSize, tileSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x*tileSize, segment.y*tileSize, tileSize, tileSize);
    })
}

function drawFood(){
 
   
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize)
    var  px=(food.x * tileSize)
    var py=( food.y * tileSize)
  
}

function moveSnake(){
    const headSnake = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(headSnake)
    snake.pop()
}

function checkFoodCollision(){
    const positionX = snake[0].x === food.x;
    const positionY = snake[0].y === food.y;
    if(positionX && positionY){
        generateFood();
        growSnake();
    }
}

function growSnake(){
    const tailSnake = { ...snake[snake.length -1]}
    snake.push(tailSnake)
    audioEat.play() 
}

function generateFood(){
    food.x = Math.floor(Math.random() * numCols)
    food.y = Math.floor(Math.random() * numRows)
    
}

function checkSnakeCollision(){
    if( 
        snake[0].x < 0 || 
        snake[0].x >= numCols || 
        snake[0].y < 0 || 
        snake[0].y >= numRows
    ){
        gameOver()
        resetGame()
    }
    for(let i = 1; i < snake.length; i++){
        const positionX = snake[i].x === snake[0].x;
        const positionY = snake[i].y === snake[0].y;
        if(positionX && positionY){
            gameOver()
            resetGame()
        }
    }
}

function resetGame() {
    snake = [{ x:10, y:10 }];
    food = { x:15, y:15 };
    dx = 0;
    dy = 0;
}

function clearCanvas(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function Score(){
    
    score.innerHTML='Score:'+snake.length
}


//funcao chamada na gamereset()
 function gameOver() {
    modal.style.display = "block";//mostra o modal de over
    audio.pause() //pausa o audio de inicio
    audioOver.play()
  }
  
  //botao home
  btn.onclick = function() {
    modal.style.display = "none";
    modalStart.style.display = "block";
    audioOver.pause() //pausa o audio de over

  }
  
  //botão start
  btnStart.onclick = function start(){
    modalStart.style.display = "none"; // deixa o modal aculto
    startmove()
    
  }
//pega os elementos do html
  const body =document.querySelector('body')
  const audio =  document.getElementById('audioStart')
  const audioOver =  document.getElementById('audioOver')
  const audioEat =  document.getElementById('audioEat') // chamada na funcao growSnake() pra emitir um som de comer


  //no click de algum lugar da tela ele inicia o audio de start
  body.addEventListener('click',function(){  
    audio.play();
//faz com que o audio se repita. o this pega o objeto em questao, ou seja o audio
    audio.addEventListener('ended', function() {
        this.currentTime = 0; // pega do inicio
        this.play();
    })
  })


  //faz a cobra andar assim que aperto o start
function startmove(){
    dx = 0;
    dy = -1;
}
main()
