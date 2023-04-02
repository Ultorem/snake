var gameBoard = document.getElementById("game-board");
var scoreElement = document.getElementById("score-value");
var startButton = document.getElementById("start-button");
var restartButton = document.getElementById("restart-button");
var snake = [{ x: 150, y: 150 }];
var food = { x: 0, y: 0 };
var direction = "right";
var score = 0;
var gameLoop;

function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    var snakeElement = document.createElement("div");
    snakeElement.className = "snake";
    snakeElement.style.left = snake[i].x + "px";
    snakeElement.style.top = snake[i].y + "px";
    gameBoard.appendChild(snakeElement);
  }
}

function drawFood() {
  var foodElement = document.createElement("div");
  foodElement.className = "food";
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  gameBoard.appendChild(foodElement);
}

function moveSnake() {
  var head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") {
    head.x += 10;
  } else if (direction === "left") {
    head.x -= 10;
  } else if (direction === "up") {
    head.y -= 10;
  } else if (direction === "down") {
    head.y += 10;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * 30) * 10;
    food.y = Math.floor(Math.random() * 30) * 10;
    score += 10;
    scoreElement.innerText = score;
  } else {
    snake.pop();
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});


function checkCollision() {
var head = snake[0];
if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) {
endGame();
}
for (var i = 1; i < snake.length; i++) {
if (head.x === snake[i].x && head.y === snake[i].y) {
endGame();
}
}
}

function endGame() {
clearInterval(gameLoop);
snake = [{ x: 150, y: 150 }];
food.x = Math.floor(Math.random() * 30) * 10;
food.y = Math.floor(Math.random() * 30) * 10;
direction = "right";
score = 0;
scoreElement.innerText = score;
gameBoard.innerHTML = "";
drawSnake();
drawFood();
restartButton.style.display = "inline-block";
gameBoard.classList.add("animate-flash");
}

function startGame() {
gameLoop = setInterval(function() {
moveSnake();
gameBoard.innerHTML = "";
drawSnake();
drawFood();
checkCollision();
}, 100);
startButton.style.display = "none";
}

startButton.addEventListener("click", function() {
startGame();
});

restartButton.addEventListener("click", function() {
restartButton.style.display = "none";
gameBoard.classList.remove("animate-flash");
startGame();
});

food.x = Math.floor(Math.random() * 30) * 10;
food.y = Math.floor(Math.random() * 30) * 10;

drawSnake();
drawFood();