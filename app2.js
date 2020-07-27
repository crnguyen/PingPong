var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var diameter = 50;
var xBallChange = 5;
var yBallChange = 5;


function setup() {
    createCanvas(windowWidth, windowHeight);
}
console.log(setup());

  function draw() {
    background(150);
    fill(255, 0, 255);
noStroke();
ellipse(xBall, yBall, diameter, diameter);
xBall += xBallChange;
yBall += yBallChange;
  }

  draw();