let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 1;
let newScore = " ";
let gameScore = document.getElementById("score");
let startGame = document.getElementById("startGame");
let gameInstructions = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");
let gameplay;
let button;
let audioPaddles = document.getElementById("audio");
let audioWinner = document.getElementById("audioWin");
let audioLoser = document.getElementById("audioLoser");
let audioBackground = document.getElementById("audioBackground");


//DOM
document.addEventListener("DOMContentLoaded", () => {

button = document.createElement("button");
button.innerHTML = "Play Again?";

function makePlayAgainButtonAppear() { 
        button.addEventListener("click", function() {
            location.reload();
        // gamePlay = setInterval(gameLoop, 50);
        // document.addEventListener("keydown", movePaddles);
        // audioBackground.play();
        document.body.removeChild(button);  
    }); 
    document.body.appendChild(button);
    }

//initialize game upon pressing Start Game button
startGame.addEventListener("click", function() {
    audioBackground.play();
    gamePlay = setInterval(gameLoop, 50);
    //gameScore.innerHTML = "Score: " +score++;
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

function increaseScore() {
    gameScore.innerHTML = "Score: " +score++;
    if (score === 11) {
        //makePlayAgainButtonAppear();
        //console.log("you win");
        gameScore.innerHTML = "GAME OVER! YOU WIN!";
        audioWinner.play();
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
    if(ball.x + ball.vx > canvas.width - ball.r || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    } else if(ball.y + ball.vy > canvas.height - ball.r || ball.y + ball.vy < 0) {
        makePlayAgainButtonAppear();
        //hits top/bottom border
        gameOver();
        audioBackground.pause();
        audioLoser.play();
        gameScore.innerHTML = "GAME OVER! Better luck next time. You can always play again 😃";
        clearInterval(gamePlay);
    }
    //hits top paddle
    if (ball.x + ball.vx > paddle1.x &&
        ball.x < paddle1.x + paddle1.width 
        && ball.y + ball.r > paddle1.y &&
        ball.y < paddle1.y + paddle1.height){
            audioPaddles.play();
            if (ball.y > 28) {
                ball.y = 28;
            }
            increaseScore();
            ball.vy = -ball.vy;
}   //hits bottom paddle
    else if (ball.x + ball.vx > paddle2.x &&
    ball.x < paddle2.x + paddle2.width &&
    ball.y + ball.r > paddle2.y &&
    ball.y < paddle2.y + paddle2.height) {
        audioPaddles.play();
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



