import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeCrashwith2 as snake12Crash, snakeCrashwith3 as snake13Crash, removeSnake} from './snake.js'

import { update as updateFood, draw as drawFood } from './food.js'

import { outsideGrid } from './grid.js'

import { update as updateSnake2, draw as drawSnake2, getSnakeHead as getSnakeHead2, snakeIntersection as snakeIntersection2, snakeCrashwith1 as snake21Crash, snakeCrashwith3 as snake23Crash, removeSnake as removeSnake2} from './snake2.js'

import { update as updateSnake3, draw as drawSnake3, getSnakeHead as getSnakeHead3, snakeIntersection as snakeIntersection3, snakeCrashwith1 as snake31Crash, snakeCrashwith2 as snake32Crash, removeSnake as removeSnake3} from './snake3.js'

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
  updateSnake();
  updateSnake2();
  updateSnake3();
  updateFood();
  checkDeath();
}

function draw () {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawSnake2(gameBoard);
  drawSnake3(gameBoard);
  drawFood(gameBoard);
}

export let memory = [];

function checkDeath () {
  if ((!checkSnake1()) || (!checkSnake2()) || (!checkSnake3())) {
    memory.push('snakeDied');
  };
  gameGoing = (memory.length < 3);
}

function checkSnake1 () {
  let death = (outsideGrid(getSnakeHead()) || snakeIntersection() || snake21Crash() || snake31Crash());
  if (death) {
    removeSnake();
    return false;
  }
  return true;
}

function checkSnake2 () {
  let death = (outsideGrid(getSnakeHead2()) || snakeIntersection2() || snake12Crash() || snake32Crash());
  if (death) {
    removeSnake2();
    return false;
  }
  return true;
}

function checkSnake3 () {
  let death = (outsideGrid(getSnakeHead3()) || snakeIntersection3() || snake13Crash() || snake23Crash());
  if (death) {
    removeSnake3();
    return false;
  }
  return true;
}