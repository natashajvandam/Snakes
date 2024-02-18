import { getInputDirection } from '../players/player3.js'
import { snake1Body } from './snake1.js'
import { snake2Body } from './snake2.js'
import { memory } from '../script.js'

export let snake3Body = [{x: 13, y: 13}];
let newSegments = 0;

export function updateSnake3 () {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snake3Body.length - 2; i >= 0; i--) {
    snake3Body[i + 1] = { ...snake3Body[i]};
  }
  snake3Body[0].x += inputDirection.x;
  snake3Body[0].y += inputDirection.y;
}

export function drawSnake3 (gameBoard) {
  snake3Body.forEach((seg, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add('snake3_tail');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake3 (amount) {
  newSegments += amount;
}

export function onSnake3 (position, {ignoreHead = false} = {}) {
  return snake3Body.some((seg, index) => {
    if (ignoreHead && index === 0) { return false; };
    return equalPosition(seg, position); 
    });
};

export function getSnake3Head () {
  return snake3Body[0];
}

export function snake3HitSelf () {
  return onSnake3 (snake3Body[0], {ignoreHead: true});
}

export function snakeCrash_3v1 () {
  if (onSnake3 (snake1Body[0]) && snake3Body.length > 1) {
    return true;
  } else if (onSnake3 (snake1Body[0]) && snake3Body.length === 1) {
    memory.push('dead');
    removeSnake3();
    return false;
  } else {
    return false;
  };
}

export function snakeCrash_3v2 () {
  if (onSnake3 (snake2Body[0]) && snake3Body.length > 1) {
    return true;
  } else if (onSnake3 (snake2Body[0]) && snake3Body.length === 1) {
    memory.push('dead');
    removeSnake3();
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
    snake3Body.push({ ...snake3Body[snake3Body.length - 1 ] });
  }
  newSegments = 0;
}

export function removeSnake3 () {
  let gameBoard = document.getElementById('grid');
  let snakeElements = document.getElementsByClassName('snake3_tail');
  while (snakeElements.length > 0) {
    gameBoard.removeChild(snakeElements[0]);
  }
  snake3Body = [{}];
}

export function updateSnake3Score () {
  let score = document.getElementById('num3').innerHTML;
  score++;
  document.getElementById('num3').innerHTML = `${score}`;
}