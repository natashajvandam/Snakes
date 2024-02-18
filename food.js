import { onSnake1, expandSnake1, updateSnake1Score } from './snakes/snake1.js'
import { onSnake2, expandSnake2, updateSnake2Score } from './snakes/snake2.js'
import { onSnake3, expandSnake3, updateSnake3Score } from './snakes/snake3.js'
import { randomGridPosition } from './grid.js'

export let SNAKE_SPEED = 7;
let EXPANSION_RATE = 5;
let food = getRandomFoodPosition();

export function increaseSpeed () {
  SNAKE_SPEED += 0.2;
}

function increaseGrowth () {
  EXPANSION_RATE += 2;
}

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
  while (newFoodPosition == null || onSnake1(newFoodPosition) || onSnake2(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
