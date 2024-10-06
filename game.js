import Snake from "./snake.js";
import Food from "./food.js";
import Grid from "./grid.js";
import ScoreBoard from "./scoreBoard.js";

export default class Game {
  constructor(scene, renderer, gridSize, speed, expansionRate) {
    this.snakes = [];
    this.grid = new Grid(gridSize);
    this.gameGoing = true;
    this.food = new Food(3.5, 10.5, "red");
    this.expansionRate = expansionRate;
    this.gameSpeed = speed;
    this.lastRenderTime = 0;
    this.scoreBoard = new ScoreBoard();
    this.renderer = renderer;
    this.scene = scene;
  }

  // At game creation, this function is called for each snake:
  addSnake(name, spawnSpot, directions, color) {
    const snake = new Snake(name, spawnSpot, directions, color);
    this.snakes.push(snake);
    snake.draw(this.scene);
  }

  // Once all snakes are added to the game, this function starts the game:
  start() {
    this.grid.draw(this.scene);

    // // document.getElementById("grid").innerHTML = "";
    this.snakes.forEach((snake) => {
      snake.draw(this.scene);
      window.addEventListener("keydown", (e) => snake.updateDirection(e));
    });
    this.scoreBoard.draw(this.snakes);
    this.food.draw(this.scene);
  }

  // Update runs every frame after game starts:
  update() {
    this.checkIfSnakesAteFood();
    // document.getElementById("grid").innerHTML = ""; 
    this.food.draw(this.scene);
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
        snake.draw(this.scene);
      }
    });
    if (this.snakes.every((snake) => snake.isAlive === false)) {
      this.gameGoing = false;
    }
  }

  checkIfSnakesAteFood() {
    this.snakes.forEach((snake) => {
      if (snake.equalPosition(snake.head(), this.food.foodMesh.position)) {
        snake.expand(this.expansionRate);
        this.scoreBoard.update(snake);
        const { x, y } = this.grid.getRandomFoodPosition(
          this.snakes.flatMap((s) => s.body)
        );
        this.food.update(x, y, this.scene);
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
