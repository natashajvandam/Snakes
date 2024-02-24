import { goToStep2 } from "./setup.js";
import Game from "./game.js";

let lastRenderTime = 0; // this is important for game frame rate
let game;

// Constants values for the game (not configurable by user yet):
const GRID_SIZE = 27;
const GAME_SPEED = 8;
const EXPANSION_RATE = 2;

/* 
  Once a user clicks one of the buttons, we can move on to step 2 
  with the number of players they chose.

  Below, we are adding an event listener to each button in the setup_grid_button class:
*/
const snakeCountButtons = document.getElementsByClassName("setup_grid_button");
for (let i = 0; i < snakeCountButtons.length; i++) {
  snakeCountButtons[i].addEventListener("click", (e) => {
    goToStep2(e.target.innerHTML);
  });
}

/* 
  Once all snake names and controls are entered, we can create the game.

  Below, add the new elements to the DOM (scoreBoard and grid) and create a new game.
*/
export function createGame(values) {
  // Hide the setup form and show the game board:
  document.getElementById("step2").style.display = "none";
  const scoreBoard = document.createElement("div");
  const grid = document.createElement("div");
  scoreBoard.setAttribute("id", "scoreBoard");
  grid.setAttribute("id", "grid");
  document.getElementById("body").appendChild(scoreBoard);
  document.getElementById("body").appendChild(grid);
  grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;

  // Create a new game with the values from the setup form:
  game = new Game(GRID_SIZE, GAME_SPEED, EXPANSION_RATE);
  window.requestAnimationFrame(main);
  // Add each snake to the game:
  for (let i = 0; i < values.length; i++) {
    const x = Math.floor(Math.random() * game.grid.gridSize) + 1;
    const y = Math.floor(Math.random() * game.grid.gridSize) + 1;
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

  // Trigger the start of the game
  game.start();
}

/* 
  This is the function that runs the game loop. Based on the game speed, 
  it will call the update function of the game class over and over until
  all snakes are dead.
*/
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

// Helper function to find game winner:
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
