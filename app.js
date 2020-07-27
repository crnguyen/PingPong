console.log("my js is linked");


document.addEventListener("DOMContentLoaded", () => {
    // let paddle1;
    // let paddle2;
    // let ball;
    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    // let height = canvas.height;
    // let width = canvas.width;

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
// paddle1.render();
// paddle2.render();

const gameLoop = () => {
    console.log("loopin ");
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //display x,y coordinates of our hero onto the DOM
    paddle1.render(); 
    paddle2.render();
}

//paddles appear on screen

//create ball *
// function ball() {
//     ctx.beginPath();
//     ctx.arc(90, 90, 25, 0, 2 * Math.PI, true);
//     ctx.fillStyle = "black";
//     ctx.fill();
// }
// ball();
//create function that allows paddles to be moved at the same time in the same direction

//create function that registers mouseover to move the paddles
const movePaddles = e => {
    console.log(e);
    console.log(e.keyCode);
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle1.x -= 5;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle1.x += 5;
   };
   
   if (e.keyCode === 65 && canvas.width > 0) {
       paddle2.x -= 5;
   } else if (e.keyCode === 68 && canvas.width > 0) {
       paddle2.x += 5;
   }
}
document.addEventListener("keydown", movePaddles);
//create function that detects hit (paddle to ball) and reverses the ball in the opposite direction at an angle

//create an explosion sound when paddle hits ball
//hit = document.getElementById("hit");

//create function that keeps score

//create function that changes the score/h2 - score id

//create function that increases speed of ball after certain points/score

let gamePlay = setInterval(gameLoop, 1);

})



