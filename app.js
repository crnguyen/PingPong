console.log("my js is linked");
mouse = {}
let paddle1;
let paddle2;
let ball;

let canvas = document.getElementById("canvas");
//this.width = canvas.width;
//this.height = canvas.height;

let ctx = canvas.getContext("2d");
let height = canvas.height;
let width = canvas.width;


document.addEventListener("DOMContentLoaded", () => {

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

//paddles appear on screen
paddle1.render();
paddle2.render();

//create ball *
function update() {
    ctx.beginPath();
    ctx.arc(90, 90, 25, 0, 2 * Math.PI, true);
    ctx.fillStyle = "black";
    ctx.fill();
}
update();

//create function that allows paddles to be moved at the same time in the same direction

//create function that registers mouseover to move the paddles
canvas.addEventListener("mousemove", trackPosition, true);
function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}
function movePaddle() {

    if(mouse.x && mouse.y) {
		for(var i = 1; i < paddles.length; i++) {
			p = paddles[i];
			p.x = mouse.x - p.w/2;
		}		
	}
}
movePaddle();
//create function that detects hit (paddle to ball) and reverses the ball in the opposite direction at an angle

//create an explosion sound when paddle hits ball
hit = document.getElementById("hit");

//create function that keeps score

//create function that changes the score/h2 - score id

//create function that increases speed of ball after certain points/score

});



