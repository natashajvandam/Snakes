import { getInputDirection } from '../players/player2.js'
import { snake1Body } from './snake1.js'
import { snake3Body } from './snake3.js'
import { memory } from '../script.js'

export let snake2Body = [{x: 9, y: 9}];
let newSegments = 0;

export function updateSnake2 () {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snake2Body.length - 2; i >= 0; i--) {
    snake2Body[i + 1] = { ...snake2Body[i]};
  }
  snake2Body[0].x += inputDirection.x;
  snake2Body[0].y += inputDirection.y;
}

export function drawSnake2 (gameBoard) {
  snake2Body.forEach((seg, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add('snake2_tail');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake2 (amount) {
  newSegments += amount;
}

export function onSnake2 (position, {ignoreHead = false} = {}) {
  return snake2Body.some((seg, index) => {
    if (ignoreHead && index === 0) { return false; };
    return equalPosition(seg, position); 
    });
};

export function getSnake2Head () {
  return snake2Body[0];
}

export function snake2HitSelf () {
  return onSnake2 (snake2Body[0], {ignoreHead: true});
}

export function snakeCrash_2v1 () {
  if (onSnake2 (snake1Body[0]) && snake2Body.length > 1) {
    return true;
  } else if (onSnake2 (snake1Body[0]) && snake2Body.length === 1) {
    memory.push('dead');
    removeSnake2();
    return false;
  } else {
    return false;
  };
}

export function snakeCrash_2v3 () {
  if (onSnake2 (snake3Body[0]) && snake2Body.length > 1) {
    return true;
  } else if (onSnake2 (snake3Body[0]) && snake2Body.length === 1) {
    memory.push('dead');
    removeSnake2();
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
    snake2Body.push({ ...snake2Body[snake2Body.length - 1 ] });
  }
  newSegments = 0;
}

export function removeSnake2 () {
  let gameBoard = document.getElementById('grid');
  let snakeElements = document.getElementsByClassName('snake2_tail');
  while (snakeElements.length > 0) {
    gameBoard.removeChild(snakeElements[0]);
  }
  snake2Body = [{}];
}

export function updateSnake2Score () {
  let score = document.getElementById('num2').innerHTML;
  score++;
  document.getElementById('num2').innerHTML = `${score}`;
}