// snakes:
import { updateSnake1, drawSnake1, getSnake1Head, snake1HitSelf, snakeCrash_1v2, snakeCrash_1v3, removeSnake1} from './snakes/snake1.js'
import { updateSnake2, drawSnake2, getSnake2Head, snake2HitSelf, snakeCrash_2v1, snakeCrash_2v3, removeSnake2} from './snakes/snake2.js'
import { updateSnake3, drawSnake3, getSnake3Head, snake3HitSelf, snakeCrash_3v1, snakeCrash_3v2, removeSnake3} from './snakes/snake3.js'
// food and grid:
import { updateFood, spawnFood, SNAKE_SPEED } from './food.js'
import { outsideGrid } from './grid.js'

// gets the "grid" element from the html file
const gameBoard = document.getElementById('grid');

let lastRenderTime = 0;
let gameGoing = true;

/* 
  This function "main" continues to run in a loop
  and it calls the "update" and "draw" functions
  which are responsible for updating the game state
  and drawing the game state to the screen. 
*/
function main (currentTime) {
  
  // "gameGoing" is a boolean that is changed to false when all snakes die (see where it is changed in the "checkDeath" function).
  if (!gameGoing) {
    if (confirm('You loose. Press "ok" to play again.')) {
      window.location = '/'
    }
    return;
  }

  window.requestAnimationFrame(main);
  // "currentTime" is the time in milliseconds since the page was loaded and "lastRenderTime" is the time in milliseconds since the last time.
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
  
  // If the time since the last render is less than the speed of the snake, then return (do nothing):
  if (secondsSinceLastRenderTime < 1 / SNAKE_SPEED) { return; };
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update () {
  updateSnake1(); // identify where snake1 moves
  updateSnake2(); // identify where snake2 moves
  updateSnake3(); // identify where snake3 moves
  updateFood();   // check if any snake eats food
  checkDeath();   // check if any snake dies
}

function draw () {
  gameBoard.innerHTML = '';
  drawSnake1(gameBoard);  // draw snake1 and all its body segments
  drawSnake2(gameBoard);  // draw snake2 and all its body segments
  drawSnake3(gameBoard);  // draw snake3 and all its body segments
  spawnFood(gameBoard);   // draw food
}

export let memory = []; // This array "memory" is used to keep track of the number of snakes that have died.

function checkDeath () {
  // if any of the following conditions are true, then a snake has died and the string "snakeDied" is pushed to the "memory" array.
  if ((!checkSnake1()) || (!checkSnake2()) || (!checkSnake3())) {
    memory.push('snakeDied');
  };
  // if the length of the "memory" array is less than 3, then the game is still going (because there are 3 snakes in the game).
  gameGoing = (memory.length < 3);
}

/*
  The following three functions "checkSnake1", "checkSnake2", and "checkSnake3" are used to check if any of the snakes have died.
  If a snake has died, then the function returns false and the snake is removed from the game.
  If a snake has not died, then the function returns true.

  A snake has died if: 
   1. It is outside the grid.
   2. It has hit itself.
   3. It has crashed into another snake.
*/
function checkSnake1 () {
  let death = (outsideGrid(getSnake1Head()) || snake1HitSelf() || snakeCrash_2v1() || snakeCrash_3v1());
  if (death) {
    removeSnake1();
    return false;
  }
  return true;
}

function checkSnake2 () {
  let death = (outsideGrid(getSnake2Head()) || snake2HitSelf() || snakeCrash_1v2() || snakeCrash_3v2());
  if (death) {
    removeSnake2();
    return false;
  }
  return true;
}

function checkSnake3 () {
  let death = (outsideGrid(getSnake3Head()) || snake3HitSelf() || snakeCrash_1v3() || snakeCrash_2v3());
  if (death) {
    removeSnake3();
    return false;
  }
  return true;
}