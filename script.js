import { DEFAULT_SNAKES } from "./setup.js";
import Game from "./game.js";

let lastRenderTime = 0; // this is important for game frame rate
let game;

// Constants values for the game (not configurable by user yet):
const GRID_SIZE = 27;
const GAME_SPEED = 8;
const EXPANSION_RATE = 6;
const SNAKE_COUNT = 2; // max is 4

function randomColor() {
  var h0 = Math.floor(Math.random()*16);
  var h1 = Math.floor(Math.random()*16);
  var h2 = Math.floor(Math.random()*16);
  var h3 = Math.floor(Math.random()*16);
  var h4 = Math.floor(Math.random()*16);
  var h5 = Math.floor(Math.random()*16);
  return '#' + h0.toString(16) + h1.toString(16) + h2.toString(16) + h3.toString(16) + h4.toString(16) + h5.toString(16);
}

// This function uses the constants to create a game:
function createGame() {
  grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
  game = new Game(GRID_SIZE, GAME_SPEED, EXPANSION_RATE);
  
  // Add each snake to the game:
  for (let i = 0; i < SNAKE_COUNT; i++) {
    // get a random position for the snake to spawn:
    const x = Math.floor(Math.random() * game.grid.gridSize) + 1;
    const y = Math.floor(Math.random() * game.grid.gridSize) + 1;
    // get a random color for the snake:
    const color = randomColor();
    // get the default values for the snake's name, color, and controls:
    const {up, down, left, right, name} = DEFAULT_SNAKES[i];
    game.addSnake( name, { x, y }, { up, down, left, right }, color);
  }
  
  // Trigger the start of the game
  game.start();
  window.requestAnimationFrame(main);
}

/* 
  This is the function that runs the game loop. Based on the game speed, 
  it will call the update function of the game class over and over until
  all snakes are dead.
*/
function main(currentTime) {
  // If game is no longer going - prompt user to play again:
  if (game.gameGoing === false) {
    if (confirm('Press "ok" to play again.')) {
      window.location = "/"; // reloads the page (calls the createGame function again)
    }
    return;
  }

  // this is how it loops - it calls itself over and over again:
  window.requestAnimationFrame(main);
  
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRenderTime < 1 / game.gameSpeed) { // this is the game speed
    return;
  }
  lastRenderTime = currentTime;

  // this calls for the next frame of the game:
  game.update();
}

createGame(); // This is the first thing that runs when the page loads