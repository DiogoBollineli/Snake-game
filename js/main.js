let canvas = document.getElementById("snake");    
let context = canvas.getContext("2d");
let box = 32;     //tamanho de cada bloco
let snake =[];    //arrray do corpo da cobrinha
snake [0] = {
    x: 8*box,       //coordenada inicial da cobrinha
    y: 8*box
}
let direction = "right";        //direnção inicial da cobrinha
let food = {
    x:Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {                            //renderiza o canvas
    context.fillStyle ="lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarCobrinha() {                //cria a cobrinha
    for( i=0 ; i<snake.length; i++){
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}    

function drawnFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
document.addEventListener('keydown', update);  //capta uma tecla sendo pressionada e direciona para a função abaixo

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";  //condicionais para identificar cada tecla pressionada
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){       //inicia o jogo
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 *box;
    if(snake[0].y > 15 * box && direction =="down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up")snake[0].y  = 16 * box;
    
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }
    criarBG();
    criarCobrinha();
    drawnFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction == "right")snakeX += box;  //condicicionais para direção da cobrinha
    if(direction == "left")snakeX -= box;
    if(direction == "up")snakeY -= box;
    if(direction == "down")snakeY += box;
   
    if(snakeX != food.x || snakeY !=food.y){  
        snake.pop();      //função que retira o a cabeça da cobrinha do topo do array
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box

    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)        //função que adiciona o a nova cabeça da cobrinha ao topo do array, dando impressão de movimento a ela
}
let jogo = setInterval(iniciarJogo, 100)     //atualiza o jogo a cada 100 milisegundos