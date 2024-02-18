import { onSnake, expandSnake, updateScore as updateScoreSnake1, increaseSpeed } from './snake.js'
import { onSnake as onSnake2, expandSnake as expandSnake2, updateScore as updateScoreSnake2 } from './snake2.js'
import { onSnake as onSnake3, expandSnake as expandSnake3, updateScore as updateScoreSnake3 } from './snake3.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition();
let EXPANSION_RATE = 5;

function increaseGrowth () {
  EXPANSION_RATE += 2;
}

export function update () {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    increaseGrowth();
    increaseSpeed();
    updateScoreSnake1();
    food = getRandomFoodPosition();
  }
  if (onSnake2(food)) {
    expandSnake2(EXPANSION_RATE);
    EXPANSION_RATE += 2;
    updateScoreSnake2();
    food = getRandomFoodPosition();
  }
  if (onSnake3(food)) {
    expandSnake3(EXPANSION_RATE);
    EXPANSION_RATE += 2;
    updateScoreSnake3();
    food = getRandomFoodPosition();
  }
}

export function draw (gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition () {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition) || onSnake2(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
