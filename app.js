//console.log("my js is linked")
document.addEventListener("DOMContentLoaded", () => {
    let ball = {};
    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

// const drawBox = (x, y, size, color) => {
//         ctx.fillStyle = color;
//         ctx.fillRect(x, y, size, size);
// }

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
//call above function *
let paddle1 = new Player(400, 1, 115, 33, "green");
let paddle2 = new Player(400, 426, 115, 33, "blue");

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.render(); 
    paddle2.render();
    ball.draw();
    moveTheBall();
    detectHit();
}

//create ball *
ball = {
	x: 100,
	y: 100, 
	r: 10,
	c: "black",
	vx: 4,
	vy: 8,
	
	// Function for drawing ball on canvas
	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fill();
	}
};

function moveTheBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    if(ball.x + ball.vx > canvas.width-ball.r || ball.x + ball.vx < ball.r) {
        ball.vx = -ball.vx;
    }
    if(ball.y + ball.vy > canvas.height-ball.r || ball.y + ball.vy < ball.r) {
        ball.vy = -ball.vy;
    }
}

function detectHit () {
    if (ball.x + ball.vx > paddle1.x &&
        ball.x < paddle1.x + paddle1.width &&
        ball.y + ball.r > paddle1.y &&
        ball.y < paddle1.y + paddle1.height) {
            //score++;
            ball.vy = -ball.vy;
            console.log("hit");
}   if (ball.x + ball.vx > paddle2.x &&
    ball.x < paddle2.x + paddle2.width &&
    ball.y + ball.r > paddle2.y &&
    ball.y < paddle2.y + paddle2.height) {
        ball.vy = -ball.vy;
        //score++
        console.log("hit");
} }
detectHit();


//create function that moves paddles using keys
const movePaddles = e => {
    //console.log(e);
    //aconsole.log(e.keyCode);
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle1.x -= 10;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle1.x += 10;
   };
   
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle2.x -= 10;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle2.x += 10;
   }
   //requestAnimationFrame(movePaddles); ???
}
document.addEventListener("keydown", movePaddles);
//requestAnimationFrame(movePaddles);
//create function that detects hit (paddle to ball) and reverses the ball in the opposite direction at an angle

//create an explosion sound when paddle hits ball
//hit = document.getElementById("hit");

//create function that keeps score

//create function that changes the score/h2 - score id

//create function that increases speed of ball after certain points/score

let gamePlay = setInterval(gameLoop, 50);

})



