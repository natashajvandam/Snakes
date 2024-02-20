import { getInputDirection } from '../players/player1.js';
import { snake2Body } from './snake2.js'
import { snake3Body } from './snake3.js'
import { memory } from '../script.js'

/* 
  The game initially spawns the snake at 11, 11. It has only a head and no body segments.
  The snake's body is an array of objects, where each object has an x and y coordinate.
*/
export let snake1Body = [{x: 11, y: 11}];
let newSegments = 0;

export function updateSnake1 () {
  // if the snake has eaten food, then add segments to the snake's body
  addSegments();                        
  // if player 1 presses a key, then update the snake's direction      
  const inputDirection = getInputDirection(); 

  // in this "for" loop, the snake's body segments are updated to follow the head. Each segment takes the position of the segment in front of it.
  for (let i = snake1Body.length - 2; i >= 0; i--) {
    snake1Body[i + 1] = { ...snake1Body[i]};
  }

  // lastly, the snake's head is updated to move in the direction of the arrow key that was pressed.
  snake1Body[0].x += inputDirection.x;
  snake1Body[0].y += inputDirection.y;
}

export function drawSnake1 (gameBoard) {
  // for each segment in the snake's body, a div element is created and appended to the game board.
  snake1Body.forEach((seg, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = seg.y;
    snakeElement.style.gridColumnStart = seg.x;
    snakeElement.classList.add('snake_tail');
    gameBoard.appendChild(snakeElement);
  })
}

// This function is used to increase the length of the snake's body when it eats food (see food.js).
export function expandSnake1 (amount) {
  newSegments += amount;
}

/* 
  This function is used to check the position of the snake's body segments in relation to another position.
  This is used to see if:
    1. The snake has hit itself.
    2. The snake has crashed into another snake.
    3. The snake has gone outside the grid.
    4. The snake has eaten the food.
  It returns true or false (boolean).
*/
export function onSnake1 (position, {ignoreHead = false} = {}) {
  return snake1Body.some((seg, index) => {
    if (ignoreHead && index === 0) { return false; };
    return equalPosition(seg, position); 
    });
};

export function getSnake1Head () {
  // returns the position of the snake's head (the first element in the snake's body array):
  return snake1Body[0];
}

export function snake1HitSelf () {
  // check if the snake's head has hit any of its body segments:
  return onSnake1(snake1Body[0], {ignoreHead: true});
}

/*
  The next two functions "snakeCrash_1v2" and "snakeCrash_1v3" are used to check if the snake has crashed into another snake.
  - "snakeCrash_1v2" checks if snake1 has crashed into snake2.
  - "snakeCrash_1v3" checks if snake1 has crashed into snake3.

  Notice that if snake1 is only a head (no body segments), it is a lot more vulnerable. 
  
  The functions return true if the snake has crashed into another snake (and the snake has more than 1 body segment).
*/
export function snakeCrash_1v2 () {
  if (onSnake1(snake2Body[0]) && snake1Body.length > 1) {
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

// This function checks whether two positions are the same.
function equalPosition (pos1, pos2) {
  return (pos1.x === pos2.x && pos1.y === pos2.y)? true: false;
}

// This function adds segments to the snake's body. See how it is used in "updateSnake1".
function addSegments () {
  for (let i = 0; i < newSegments; i++) {
    snake1Body.push({ ...snake1Body[snake1Body.length - 1 ] });
  }
  newSegments = 0;
}

// This function removes snake 1 from the game (both its body segments and its head).
export function removeSnake1 () {
  let gameBoard = document.getElementById('grid');
  let snakeElements = document.getElementsByClassName('snake_tail')
  while (snakeElements.length > 0) {
    gameBoard.removeChild(snakeElements[0]);
  }
  snake1Body = [{}];
}

// This function is used to increase the score of snake 1 after it has eaten food.
export function updateSnake1Score () {
  let score = document.getElementById('num1').innerHTML;
  score++;
  document.getElementById('num1').innerHTML = `${score}`;
}