import Snake from "./snake.js";
import Food from "./food.js";
import Grid from "./grid.js";
import ScoreBoard from "./scoreBoard.js";

export default class Game {
  constructor(gridSize, speed, expansionRate) {
    this.snakes = [];
    this.grid = new Grid(gridSize);
    this.gameGoing = true;
    this.food = new Food(3, 10, "red");
    this.expansionRate = expansionRate;
    this.gameSpeed = speed;
    this.lastRenderTime = 0;
    this.scoreBoard = new ScoreBoard();
  }

  // At game creation, this function is called for each snake:
  addSnake(name, spawnSpot, directions, color) {
    const snake = new Snake(name, spawnSpot, directions, color);
    this.snakes.push(snake);
    snake.draw();
  }

  // Once all snakes are added to the game, this function starts the game:
  start() {
    document.getElementById("grid").innerHTML = "";
    this.snakes.forEach((snake) => {
      snake.draw();
      window.addEventListener("keydown", (e) => snake.updateDirection(e));
    });
    this.scoreBoard.draw(this.snakes);
    this.food.draw();
  }

  // Update runs every frame after game starts:
  update() {
    this.checkIfSnakesAteFood();
    document.getElementById("grid").innerHTML = ""; 
    this.food.draw();
    this.checkForDeaths();
  }

  // checkForDeaths & checkIfSnakesAteFood are helper functions for update:
  checkForDeaths() {
    this.snakes.forEach((snake) => {
      this.snakes
        .filter((s) => s.name !== snake.name)
        .forEach((s) => {
          const bodySansHead = [...s.body];
          const head = bodySansHead.shift();
          snake.checkDeath(bodySansHead, head, this.grid.gridSize);
        });
      if (snake.isAlive) {
          snake.update();
          snake.draw();
        }
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
        const { x, y } = this.grid.getRandomFoodPosition(
          this.snakes.flatMap((s) => s.body)
        );
        this.food.update(x, y);
        this.increaseGrowth();
        this.increaseSpeed();
      }
    });
  }

  // increaseSpeed & increaseGrowth are functions that are called when a snake eats food:
  increaseSpeed() {
    this.gameSpeed += 0.2;
  }

  increaseGrowth() {
    this.expansionRate += 2;
  }
}
