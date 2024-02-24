import { goToStep2 } from "./setup.js";
import Game from "./game.js";

let lastRenderTime = 0;
let snakeValues;
let game;
const GRID_SIZE = 27;
const GAME_SPEED = 8;
const EXPANSION_RATE = 2;

if (!snakeValues) {
  const snakeCountButtons =
    document.getElementsByClassName("setup_grid_button");
  for (let i = 0; i < snakeCountButtons.length; i++) {
    snakeCountButtons[i].addEventListener("click", (e) => {
      snakeValues = goToStep2(e.target.innerHTML);
    });
  }
}

export function createGame(values) {
  document.getElementById("step2").style.display = "none";
  let div = document.createElement("div");
  div.setAttribute("id", "scoreBoard");
  document.getElementById("body").appendChild(div);
  div = document.createElement("div");
  div.setAttribute("id", "grid");
  document.getElementById("body").appendChild(div);
  document.getElementById(
    "grid"
  ).style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  document.getElementById(
    "grid"
  ).style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
  game = new Game(GRID_SIZE, GAME_SPEED, EXPANSION_RATE);
  window.requestAnimationFrame(main);
  for (let i = 0; i < values.length; i++) {
    const x = Math.floor(Math.random() * game.grid.gridSize) + 1;
    const y = Math.floor(Math.random() * game.grid.gridSize) + 1;
    console.log(values[i].color);
    game.addSnake(
      values[i].name,
      { x, y },
      {
        up: values[i].up,
        down: values[i].down,
        left: values[i].left,
        right: values[i].right,
      },
      values[i].color
    );
  }
  game.start();
}

function findWinner(snakes) {
  let winner = snakes[0];
  let wasItATie = false;
  for (let i = 1; i < snakes.length; i++) {
    if (snakes[i].score > winner.score) {
      winner = snakes[i];
    } else if (snakes[i].score === winner.score) {
      wasItATie = true;
    }
  }
  return { winner, wasItATie };
}

export function main(currentTime) {
  if (game.gameGoing === false) {
    const { winner, wasItATie } = findWinner(game.snakes);
    const text = wasItATie
      ? "It was a tie! Press 'ok' to play again."
      : `${winner.name} won!!! Press "ok" to play again.`;
    if (confirm(text)) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  // "currentTime" is the time in milliseconds since the page was loaded and "lastRenderTime" is the time in milliseconds since the last time.
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;

  // If the time since the last render is less than the speed of the snake, then return (do nothing):
  if (secondsSinceLastRenderTime < 1 / game.gameSpeed) {
    return;
  }
  lastRenderTime = currentTime;
  game.update();
}
