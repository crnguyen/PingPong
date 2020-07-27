console.log("my js is linked");

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
    this.y  = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//call above function *
let paddle1 = new Player(400, 1, 115, 33, "green");
let paddle2 = new Player(400, 426, 115, 33, "blue");
paddle1.render();
paddle2.render();

});



