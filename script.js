// snakes:
import { updateSnake1, drawSnake1, getSnake1Head, snake1HitSelf, snakeCrash_1v2, snakeCrash_1v3, removeSnake1} from './snakes/snake1.js'
import { updateSnake2, drawSnake2, getSnake2Head, snake2HitSelf, snakeCrash_2v1, snakeCrash_2v3, removeSnake2} from './snakes/snake2.js'
import { updateSnake3, drawSnake3, getSnake3Head, snake3HitSelf, snakeCrash_3v1, snakeCrash_3v2, removeSnake3} from './snakes/snake3.js'
// food and grid:
import { updateFood, spawnFood, SNAKE_SPEED } from './food.js'
import { outsideGrid } from './grid.js'

const gameBoard = document.getElementById('grid');
let lastRenderTime = 0;
let gameGoing = true;

function main (currentTime) {
  if (!gameGoing) {
    if (confirm('You loose. Press "ok" to play again.')) {
      window.location = '/'
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRenderTime < 1 / SNAKE_SPEED) { return; };
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update () {
  updateSnake1();
  updateSnake2();
  updateSnake3();
  updateFood();
  checkDeath();
}

function draw () {
  gameBoard.innerHTML = '';
  drawSnake1(gameBoard);
  drawSnake2(gameBoard);
  drawSnake3(gameBoard);
  spawnFood(gameBoard);
}

export let memory = [];

function checkDeath () {
  if ((!checkSnake1()) || (!checkSnake2()) || (!checkSnake3())) {
    memory.push('snakeDied');
  };
  gameGoing = (memory.length < 3);
}

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