console.log("my js is linked");

function game() {
    var canvas = document.getElementById("canvas");
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = "white";
}
