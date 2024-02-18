import { getInputDirection } from './input.js'
import { snakeBody as snakeBody2, removeSnake as removeSnake2 } from './snake2.js'
import { snakeBody as snakeBody3, removeSnake as removeSnake3 } from './snake3.js'
import { memory } from './script.js'

export let SNAKE_SPEED = 7;
export function increaseSpeed () {
  SNAKE_SPEED += 0.2;
}

export let snakeBody = [{x: 11, y: 11}];
let newSegments = 0;

export function update () {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i]};
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw (gameBoard) {
  snakeBody.forEach((seg, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add('snake_tail');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake (amount) {
  newSegments += amount;
}


export function onSnake (position, {ignoreHead = false} = {}) {
  return snakeBody.some((seg, index) => {
    if (ignoreHead && index === 0) { return false; };
    return equalPosition(seg, position); 
    });
};

export function getSnakeHead () {
  return snakeBody[0];
}

export function snakeIntersection () {
  return onSnake (snakeBody[0], {ignoreHead: true});
}

export function snakeCrashwith2 () {
  if (onSnake (snakeBody2[0]) && snakeBody.length > 1) {
    return true;
  } else if (onSnake (snakeBody2[0]) && snakeBody.length === 1) {
    memory.push('dead');
    removeSnake();
    return false;
  } else {
    return false;
  };
}

export function snakeCrashwith3 () {
  if (onSnake (snakeBody3[0]) && snakeBody.length > 1) {
    return true;
  } else if (onSnake (snakeBody3[0]) && snakeBody.length === 1) {
    memory.push('dead');
    removeSnake();
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
    snakeBody.push({ ...snakeBody[snakeBody.length - 1 ] });
  }
  newSegments = 0;
}

export function removeSnake () {
  let gameBoard = document.getElementById('grid');
  let snakeElements = document.getElementsByClassName('snake_tail')
  while (snakeElements.length > 0) {
    gameBoard.removeChild(snakeElements[0]);
  }
  snakeBody = [{}];
}

export function updateScore () {
  let score = document.getElementById('num1').innerHTML;
  score++;
  document.getElementById('num1').innerHTML = `${score}`;
}