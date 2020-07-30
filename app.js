let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 1;
let gameScore = document.getElementById("score");
let startGame = document.getElementById("startGame");
let gameInstructions = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");


document.addEventListener("DOMContentLoaded", () => {

startGame.addEventListener("click", moveTheBall);

//modal
gameInstructions.addEventListener("click", function () {
    modalBg.classList.add("bg-active");
});

modalClose.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
})

//create function to draw paddle *
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

//create ball *
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

function moveTheBall() {
    //this is what gets the ball moving
    ball.x += ball.vx;
    ball.y += ball.vy;
}

function increaseScore() {
    gameScore.innerHTML = "Score: " +score++;
    if (score === 11) {
        //console.log("you win");
        setInterval(function() {gameScore.innerHTML = "GAME OVER! YOU WIN!"},30);
        gameOver();
        clearInterval(gamePlay);
    // } else if (score === 5) {
    //    changeSpeedOfBall();
     }
}

function gameOver() {
    document.removeEventListener("keydown", movePaddles);
}

function detectHit () {
    if(ball.x + ball.vx > canvas.width - ball.r || ball.x + ball.vx < 0) {
        console.log("bounce off wall"); 
        ball.vx = -ball.vx;
    } else if(ball.y + ball.vy > canvas.height - ball.r || ball.y + ball.vy < 0) {
        gameOver();
        gameScore.innerHTML = "GAME OVER! YOU LOSE!";
        clearInterval(gamePlay);
        //console.log("you lose"); // this is where you lose and game stops
    }

    if (ball.x + ball.vx > paddle1.x &&
        ball.x < paddle1.x + paddle1.width 
        && ball.y + ball.r > paddle1.y &&
        ball.y < paddle1.y + paddle1.height){
            if (ball.y > 28) {
                ball.y = 28;
            }
            increaseScore();
            ball.vy = -ball.vy;
} 
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
       paddle1.x -= 13; // this number changes speed
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle1.x += 13;
   };
   
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle2.x -= 13;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle2.x += 13;
   };
}
document.addEventListener("keydown", movePaddles);


const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.render(); 
    paddle2.render();
    ball.draw(); 
    moveTheBall();
    detectHit();
}

let gamePlay = setInterval(gameLoop, 50);
})



