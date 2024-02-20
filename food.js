import { onSnake1, expandSnake1, updateSnake1Score } from './snakes/snake1.js'
import { onSnake2, expandSnake2, updateSnake2Score } from './snakes/snake2.js'
import { onSnake3, expandSnake3, updateSnake3Score } from './snakes/snake3.js'
import { randomGridPosition } from './grid.js'

export let SNAKE_SPEED = 7; // This sets the original speed of the game. The speed increases as the snake eats food (see "increaseSpeed" function).
let EXPANSION_RATE = 5;     // This sets the original expansion rate of the snake. The expansion rate increases as the snake eats food (see "increaseGrowth" function).

let food = getRandomFoodPosition(); // This sets the original position of the food.

export function increaseSpeed () {
  SNAKE_SPEED += 0.2;
}

function increaseGrowth () {
  EXPANSION_RATE += 2;
}

/*
  This function is used to check if the food has been eaten by the snake. 
  If the snake has eaten the food, the snake's body will expand and the food will be repositioned.
  The speed of the game will also increase as well as the expansion rate (for all snakes).
*/
export function updateFood () {
  if (onSnake1(food)) {
    expandSnake1(EXPANSION_RATE);
    increaseGrowth();
    increaseSpeed();
    updateSnake1Score();
    food = getRandomFoodPosition();
  }
  if (onSnake2(food)) {
    expandSnake2(EXPANSION_RATE);
    EXPANSION_RATE += 2;
    updateSnake2Score();
    food = getRandomFoodPosition();
  }
  if (onSnake3(food)) {
    expandSnake3(EXPANSION_RATE);
    EXPANSION_RATE += 2;
    updateSnake3Score();
    food = getRandomFoodPosition();
  }
}

export function spawnFood (gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition () {
  let newFoodPosition;
  // a "while" loop is used to reposition the food if it is placed on the snake's body.
  while (newFoodPosition == null || onSnake1(newFoodPosition) || onSnake2(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
