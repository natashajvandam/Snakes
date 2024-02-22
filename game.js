import Snake from "./snake.js";
import Food from "./food.js";
import Grid from "./grid.js";

export default class Game {
  constructor(gridSize = 22) {
    this.snakes = [];
    this.grid = new Grid(gridSize);
    this.gameGoing = true;
    this.food;
    this.expansionRate = 5;
    this.gameSpeed = 7;
    this.lastRenderTime = 0;
  }

  addSnake(name, spawnX, spawnY, up, down, left, right) {
    const snake = new Snake(name, spawnX, spawnY, up, down, left, right);
    this.snakes.push(snake);
    snake.draw();
  }

  update() {
    this.checkIfSnakesAteFood();
    this.checkForDeaths();
    document.getElementById("grid").innerHTML = "";
    this.food.draw();
    this.snakes.forEach((snake) => {
      snake.isAlive && snake.draw();
    });
  }

  draw() {
    document.getElementById("grid").innerHTML = "";
    this.snakes.forEach((snake) => {
      snake.draw();
      window.addEventListener("keydown", (e) => snake.updateDirection(e));
    });
    const { x, y } = this.grid.getRandomFoodPosition();
    this.food = new Food(x, y);
    this.food.draw();
  }

  checkForDeaths() {
    this.snakes.forEach((snake) => {
      this.snakes
        .filter((s) => s.name !== snake.name)
        .forEach((s) => {
        const bodySansHead = [...s.body];
        const head = bodySansHead.shift();
        snake.checkDeath(bodySansHead, head, this.grid.gridSize);
        });
      snake.isAlive && snake.update();
    });
    if (this.snakes.every((snake) => snake.isAlive === false)) {
      this.gameGoing = false;
    }
  }

  checkIfSnakesAteFood() {
    this.snakes.forEach((snake) => {
      if (snake.equalPosition(snake.head(), this.food.position)) {
        snake.expand(this.expansionRate);
        snake.updateScore();
        const { x, y } = this.grid.getRandomFoodPosition();
        this.food = new Food(x, y);
        this.increaseGrowth();
        this.increaseSpeed();
      }
    });
  }

  increaseSpeed() {
    this.gameSpeed += 0.2;
  }

  increaseGrowth() {
    this.expansionRate += 2;
  }
}
