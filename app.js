let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 1;
let gameScore = document.getElementById("score");
let startGame = document.getElementById("startGame");
let gameInstructions = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");
let gameplay;
let button;

//DOM
document.addEventListener("DOMContentLoaded", () => {

button = document.createElement("button");
button.innerHTML = "Play Again?";
body = document.querySelector(".buttons");

function makePlayAgainButtonAppear() { 
        button.addEventListener("click", function() {
        location.reload();
        // gamePlay = setInterval(gameLoop, 50);
        // document.addEventListener("keydown", movePaddles);
        body.removeChild(button);  
    }); 
    body.appendChild(button);
    }

//initialize game upon pressing Start Game button
startGame.addEventListener("click", function() {
    hideStartButton();
    gamePlay = setInterval(gameLoop, 35);
});

//modal
gameInstructions.addEventListener("click", function () {
    modalBg.classList.add("bg-active");
});

modalClose.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
})

//create function to draw paddles *
function Player(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
    }
}
//calls above function *
let paddle1 = new Player(400, 1, 115, 33, "green");
let paddle2 = new Player(400, 426, 115, 33, "blue");

//create ball/x and y coordinates/velocity
ball = {
	x: 400,
	y: 34, 
	r: 10,
	c: "black",
	vx: 4,
	vy: 8,	
	// Function for drawing ball on canvas
	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
	}
};

//this is what gets the ball moving
function moveTheBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
}

function hideStartButton() {
    startGame.disabled = true;
    //startGame.style.visibility = "hidden";
}

function increaseScore() {
    gameScore.innerHTML = "Score: " +score++;
    if (score === 21) {
        //console.log("you win");
        gameScore.innerHTML = "GAME OVER! YOU WIN! \n Score: 20";
        hideStartButton();
        gameOver();
        clearInterval(gamePlay);
        makePlayAgainButtonAppear();
     } 
}
//Makes keys unusable when game ends
function gameOver() {
    document.removeEventListener("keydown", movePaddles);
}
//describes what happens when ball hits something
function detectHit () {
    //hits the left/right borders
    if(ball.x + ball.vx > canvas.width - ball.r || ball.x + ball.vx < ball.r) {
        ball.vx = -ball.vx;
    } else if(ball.y + ball.vy > canvas.height - ball.r || ball.y + ball.vy < ball.r) {
        makePlayAgainButtonAppear();
        hideStartButton();
        //hits top/bottom border
        gameOver();
        gameScore.innerHTML = "GAME OVER! Better luck next time. You can always play again 😃";
        clearInterval(gamePlay);
    }
    //hits top paddle
    if (ball.x + ball.vx > paddle1.x &&
        ball.x < paddle1.x + paddle1.width 
        && ball.y + ball.r > paddle1.y &&
        ball.y < paddle1.y + paddle1.height){
            if (ball.y > 27) {
                ball.y = 27;
            }
            increaseScore();
            ball.vy = -ball.vy;
}   //hits bottom paddle
    else if (ball.x + ball.vx > paddle2.x &&
    ball.x < paddle2.x + paddle2.width &&
    ball.y + ball.r > paddle2.y &&
    ball.y < paddle2.y + paddle2.height) {
         if (ball.y > 420) {
            ball.y = 420;
        }
        increaseScore();
        ball.vy = -ball.vy;      
}}

//create function that moves paddles using keys
const movePaddles = e => {
    console.log(e);
    //console.log(e.keyCode);
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle1.x -= 14; // this number changes speed
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle1.x += 14;
   };
   
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle2.x -= 14;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle2.x += 14;
   };
}
document.addEventListener("keydown", movePaddles);

//putting all functions together
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.render(); 
    paddle2.render();
    ball.draw(); 
    moveTheBall();
    detectHit();
}
})



