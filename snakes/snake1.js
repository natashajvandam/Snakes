import { getInputDirection } from '../players/player1.js';
import { snake2Body } from './snake2.js'
import { snake3Body } from './snake3.js'
import { memory } from '../script.js'

export let snake1Body = [{x: 11, y: 11}];
let newSegments = 0;

export function updateSnake1 () {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snake1Body.length - 2; i >= 0; i--) {
    snake1Body[i + 1] = { ...snake1Body[i]};
  }
  snake1Body[0].x += inputDirection.x;
  snake1Body[0].y += inputDirection.y;
}

export function drawSnake1 (gameBoard) {
  snake1Body.forEach((seg, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add('snake_tail');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake1 (amount) {
  newSegments += amount;
}


export function onSnake1 (position, {ignoreHead = false} = {}) {
  return snake1Body.some((seg, index) => {
    if (ignoreHead && index === 0) { return false; };
    return equalPosition(seg, position); 
    });
};

export function getSnake1Head () {
  return snake1Body[0];
}

export function snake1HitSelf () {
  const int = onSnake1 (snake1Body[0], {ignoreHead: true});
  if (int) {
    console.log('hit self');
  }
  return int;
}

export function snakeCrash_1v2 () {
  if (onSnake1 (snake2Body[0]) && snake1Body.length > 1) {
    return true;
  } else if (onSnake1 (snake2Body[0]) && snake1Body.length === 1) {
    memory.push('dead');
    removeSnake1();
    return false;
  } else {
    return false;
  };
}

export function snakeCrash_1v3 () {
  if (onSnake1 (snake3Body[0]) && snake1Body.length > 1) {
    return true;
  } else if (onSnake1 (snake3Body[0]) && snake1Body.length === 1) {
    memory.push('dead');
    removeSnake1();
    return false;
  } else {
    return false;
  };
}

function equalPosition (pos1, pos2) {
  return (pos1.x === pos2.x && pos1.y === pos2.y)? true: false;
}

function addSegments () {
  for (let i = 0; i < newSegments; i++) {
    snake1Body.push({ ...snake1Body[snake1Body.length - 1 ] });
  }
  newSegments = 0;
}

export function removeSnake1 () {
  let gameBoard = document.getElementById('grid');
  let snakeElements = document.getElementsByClassName('snake_tail')
  while (snakeElements.length > 0) {
    gameBoard.removeChild(snakeElements[0]);
  }
  snake1Body = [{}];
}

export function updateSnake1Score () {
  let score = document.getElementById('num1').innerHTML;
  score++;
  document.getElementById('num1').innerHTML = `${score}`;
}