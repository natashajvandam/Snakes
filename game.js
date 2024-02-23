import Snake from "./snake.js";
import Food from "./food.js";
import Grid from "./grid.js";
import ScoreBoard from "./scoreBoard.js";

export default class Game {
  constructor(gridSize = 22) {
    this.snakes = [];
    this.grid = new Grid(gridSize);
    this.gameGoing = true;
    this.food = new Food(3, 10, "red")
    this.expansionRate = 5;
    this.gameSpeed = 7;
    this.lastRenderTime = 0;
    this.scoreBoard = new ScoreBoard();
  }

  addSnake(name, spawnSpot, directions, color) {
    const snake = new Snake(name, spawnSpot, directions, color);
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

  start() {
    document.getElementById("grid").innerHTML = "";
    this.snakes.forEach((snake) => {
      snake.draw();
      window.addEventListener("keydown", (e) => snake.updateDirection(e));
    });
    this.scoreBoard.draw(this.snakes);
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
        this.scoreBoard.update(snake);
        const { x, y } = this.grid.getRandomFoodPosition();
        this.food = new Food(x, y, "red");
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
