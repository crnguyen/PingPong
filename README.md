# Project 1 - Ping Pong!

## SUMMARY
I chose to build a game of ping pong/table tennis for my first project. I wanted to go with something familiar and something that I could add my own creative flair to. As many people know, the main goal of the game is to use a paddle(s) to hit the ball back and forth, and  prevent it from hitting a wall. 

#### *Game Play*
For this particular game, I added movements to control two paddles at the same time, using the A and D keys to move (A: left, D: right). I set up an extremely easy win condition: 20 points and you win, but this can be changed if you want a more difficult game. If the ball hits the side of the wall that you're on, you lose. The score increases by 1, each time a paddle is hit. I also added sound effects when you earn a point, win, or lose. 

## TECHNOLOGIES USED
- Javascript
- HTML
- CSS
- VS Code
- Github

## LINK TO MY GAME 
- https://crnguyen.github.io/Project_1/
- Feedback/critiques are welcome! (Go easy on me I'm just a beginner)

## APPROACH
The first 2-3 days was spent tackling the html/css of my game and planning the overall structure and functionality of my paddles and ball. This is where I solidified how the game would look and act because I wanted to make a decision and stick with it early on. The bulk of the week was spent building the Javascript portion, which is surprisingly what I enjoyed the most. There's just so many things you can do with it even though certain concepts may be hard to grasp. The final days were all about fixing any bugs (there were many!) that popped up and adding in any last minute aesthetically pleasing CSS.

### HTML
This portion of the game was quick to complete since I had an idea of what I wanted my game to look like. The first thing I did was add my h1 and h2 tags, buttons, and a hidden modal that is activated by clicking a button. This was my first time learning about modals so I was eager to implement it somewhere in my game.

```html
    <button class ="modal-btn" id="instructions"> How To Play</button>
    <button id="startGame">Start Game</button>

    <div class="modal-bg">
        <div class="modal">
            <h3 class="titleInstructions">Instructions</h3>
            <p>Use A key to move your paddle right. D key to move left.
                <br> 
                <br>
                Ball can bounce off of left and right walls, but if it hits top or bottom walls you lose the game. Typical Ping Pong..
            </p>
            <span class="modal-close">Close</span>
        </div>
    </div>
```

Below is the method I went with to build my canvas and paddles. I also added some audio to use during key points of the game.
```html
    <audio id="audio" src="basketballbounce.wav" autoplay="false" ></audio>
    <audio id="audioWin" src="win.wav" autoplay="false" ></audio>
    <br>
    <main>
        <canvas id="canvas" width="850" height="460"></canvas>
        <div id=”paddle1"></div>
        <div id=”paddle2"></div>
        <div id=”ball"></div>
    </main>
```

### CSS
One of my favorite things about css is that it allows you to implement any design you want. I wanted a glowing title/h1, but I didn't know if that was possible/haven't learned the methods yet. I found a term called keyframes, which is an animation you can do within css. Below I used the "from" and "to" keywords, which allowed me to rotate between two styles for my h1. I also specified that I wanted my styles to keep changing (using animation: glow 1s ease-in-out infinite alternate) for as long as you're on the page.

#### *Adding Keyframes to Animate*
```CSS
h1 {
  color: #fff;
  text-align: center;
  font-family: 'Monoton', cursive;
  font-size: 80px;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
    }
    to {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e6, 0 0 40px #0073e6, 0 0 50px #0073e6, 0 0 60px #0073e6, 0 0 70px #0073e6;
    }
}
```

Here's another example of the use of keyframes, used to make the scrolling canvas background.
```CSS
  @keyframes infinite-shift-left {
    0% {
      background-position: 100000px;
    }
    100% {
      background-position: 0;
    }
  }
#canvas {
    border: 5px solid white;
    margin: 0 auto;
    background-image: url("https://cdn.gamedevmarket.net/wp-content/uploads/20191203165405/b4869abd6b3fb22cba3635dab74b6c87.png");
    animation: infinite-shift-left 200s linear;
}
```
### Javascript
Welcome to the most challening yet rewarding part of my game. I'm honestly not great at Javascript, but this project has made me so much better and more comfortable with the logic. Most of my blockers that I experienced were part of this section and working through these problems with my TA's was super helpful. I worked on all of my functions and game loop first, and then refactored the code to keep it readable.

#### *Creating the Ball*
Getting my paddles on the board was easy, but getting my ball to appear was a different story. I had to research arcs, radius and eventually velocity in order to get accurate information to make and move my ball. This article did a great job explaining the concept to me: https://owlcation.com/stem/HTML5-Tutorial-Drawing-Circles-and-Arcs.
```Javascript
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
```
#### *Velocity Vectors to Change Movement of Ball*
For the below functions, I used some collision detection from the crawler lab and did my own research to add to my code. Hours were spent editing and refactoring these functions before I got something that was playable. I started out by creating a function that moves the ball slighly diagonally across the page. moveTheBall() is saying let vx be velocity in x direction, and let vy be velocity in y direction. Next, I created a function that detects collision in all possible scenarios:
1. If the ball comes in contact with either sides of the canvas (left/right), reverse the movement of the ball. 
2. If the ball hits the height (top/bottom) of the canvas, the game is over.
3. If the ball hits either of the paddles, reverse the movement and increase the score.

```Javascript
function moveTheBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
}

function detectHit () {
    //hits the left/right borders
    if(ball.x + ball.vx > canvas.width - ball.r || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    } else if(ball.y + ball.vy > canvas.height - ball.r || ball.y + ball.vy < 0) {
        makePlayAgainButtonAppear();
        hideStartButton();
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
```
#### *Game Loop and Start Game Button*
Lastly I created a game loop function to call all of my functions that I needed to loop, and have it initialize only when a button is pressed.
```Javascript
startGame.addEventListener("click", function() {
    hideStartButton();
    audioBackground.play();
    gamePlay = setInterval(gameLoop, 35);
});

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.render(); 
    paddle2.render();
    ball.draw(); 
    moveTheBall();
    detectHit();
}
```

## Blockers
The major blocker that I had was whenever the ball hit the paddle from the side, it went through the paddle, got stuck, and increased the score. I fixed this by creating a gameOver function that disables the paddle key movements whenever a losing condition is met. At this point, the ball wouldn't be able to hit the sides of the paddles. This worked well until I ran into another issue. On rare occasions I was able to hit the ball from the corners of the paddle and the same problem occured. The fix for this was console.log-ing the y coordinates of paddle1 and paddle2 each time the ball hit the corners of the paddle. Once I figured out the coordinate, I was able to write a nested if statement that says if ball.y is greater than the y coordinate of the paddle where the ball kept getting stuck at, change the value of ball.y to equal that y coordinate. I went through the same process of trial and error for paddle2.

## WHAT WOULD I ADD?
While I'm definitely happy with the progress, I do have a couple features of the game that I'd like to change or add onto in the future.
1. Have different modes, easy/medium/hard
2. Build some obstacles on the canvas that show up randomly throughout the game
3. Find a way to have a smooother animation for ball and paddle movements
4. Set up game for mobile users
5. Build a modal that displays latest score upon winning or losing 
(adding onto this as I think of more ideas!)




