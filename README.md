# Project 1 - Ping Pong

## SUMMARY
I chose to build a game of ping pong/table tennis for my first project. I wanted to go with something familiar and something that I could add my own creative flair to. As many people know, the main goal of the game is to have a paddle(s) that hits the ball back and forth; if the ball hits the side of the wall that you're on, you lose. The number of paddles and balls can vary depending upon how the game is built. For this particular game, I set up my player to control two paddles at the same time. 

## TECHNOLOGIES USED
- Javascript
- HTML
- CSS
- VS Code
- Github

## LINK TO MY GAME 
Feedback/critiques are welcome!
(Go easy on me I'm just a beginner)

## APPROACH
The first 2-3 days was spent tackling the html/css of my game and planning the overall structure and functionality of my paddles and ball. This is where I solidified how the game would look and act because I wanted to make a desicion and stick with it early on. The bulk of the week was spent building the Javascript portion, which is surprisingly what I enjoyed the most. There's just so many things you can do with it even though certain concepts may be hard to grasp. The final days were all about fixing any bugs (there were many!) that popped up and adding in any last minute aesthetically pleasing designs. 

- ## HTML
This portion of the game was quick to complete since I had an idea of what I wanted my game to look like.

The first thing I did was add my h1 and h2 tags, buttons, and a hidden modal that is activated by clicking a button. This was my first time learning about modals so I was eager to implement it somewhere in my game.

```html
    <h1>Ping Pong!</h1>
    <h2 id ="score">Score: </h2>
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

Below is the method I went with to build my canvas and paddles. I also added some audio to use during key points.
```html
    <audio id="audio" src="basketballbounce.wav" autoplay="false" ></audio>
    <audio id="audioWin" src="win.wav" autoplay="false" ></audio>
    <audio id="audioLoser" src="loser.wav" autoplay="false" ></audio>
    <audio id="audioBackground" src="background.wav" autoplay="false" ></audio>

    <br>
    <br>
    <main>
        <canvas id="canvas" width="850" height="460"></canvas>
        <div id=”paddle1"></div>
        <div id=”paddle2"></div>
        <div id=”ball"></div>
    </main>

    <script src="app.js"></script>
```

- ## CSS
One of my favorite things about css is that it allows you to implement any design you want. I wanted a glowing title/h1, but I didn't know if that was possible/haven't learned the methods yet. I found a term called keyframes, which is an animation you can do within css. Below I used the "from" and "to" keywords, which allowed me to rotate between two styles for my h1. I also specified that I wanted my styles to keep changing (using animation: glow 1s ease-in-out infinite alternate) for as long as your're on the page. 

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

Here's another example of the use of keyframes. I added this in for an infinitely scrolling canvas background.

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
- ## Javascript
Welcome to the most challening yet rewarding part of my game. I'm honestly not great at Javascript, but this project has made me so much better and more comfortable with the logic. Most of my blockers that I experienced were part of this section and working through these problems with my TA's was super helpful. I tried as best as I could to keep my code readable.

Getting my paddles on the board was easy, but getting my ball to appear was a different story. I had to research arcs, radius and eventually velocity in order to get accurate information to make and move my ball. This article did a great job explaining the concept to me :[https://owlcation.com/stem/HTML5-Tutorial-Drawing-Circles-and-Arcs].
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

For the below functions, I used some of the collision detection from the crawler lab and did my own researsh to add to my code. Hours were spent editing and refactoring this function before I got something that was playable. I started out by creating a function that moves the ball slighly diagonally across the page. moveTheBall() is saying let vx be velocity in x direction, and let vy be velocity in y direction. 

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

## Blockers

## UNSOLVED PROBLEMS
I'm sure that there are many improvements that can be made 


