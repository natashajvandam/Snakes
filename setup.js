import { createGame } from "./script.js";

// These are the default snake values for the setup form:
export const DEFAULT_SNAKES = [
  {
    name: "Snake1",
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
  },
  {
    name: "Snake2",
    up: "w",
    down: "s",
    left: "a",
    right: "d",
  },
  {
    name: "Snake3",
    up: "i",
    down: "k",
    left: "j",
    right: "l",
  },
  {
    name: "Snake4",
    up: "t",
    down: "g",
    left: "f",
    right: "h",
  },
];

/* 
  These variables keep track of the current snake being 
  set up and the snake values already set:
*/
let snakeIndex = 0;
let actualSnakeValues = [];

// Helper function taking user back to start:
function goToStep1() {
  window.location = "/";
}

// After user clicks their player count, this function is called:
export function goToStep2(snakeCount) {
  // listen for "back" and "next" button clicks:
  document
    .getElementById("setup_back_button")
    .addEventListener("click", () => goToStep1());
  document
    .getElementById("setup_next_button")
    .addEventListener("click", () => onNext(snakeCount));
  
  // show step 2 (snake details) instead of step 1 (player count):
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "flex";
  
  // set default values for next snake:
  setDefaultValues();
}

// Helper function to set default values for snake setup:
function setDefaultValues() {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.getElementById("color_square").style.backgroundColor = color;
  document.getElementById(`setup_name`).value = DEFAULT_SNAKES[snakeIndex].name;
  document.getElementById(`input_up`).value = DEFAULT_SNAKES[snakeIndex].up;
  document.getElementById(`input_down`).value = DEFAULT_SNAKES[snakeIndex].down;
  document.getElementById(`input_left`).value = DEFAULT_SNAKES[snakeIndex].left;
  document.getElementById(`input_right`).value =
    DEFAULT_SNAKES[snakeIndex].right;
}

/* 
  After user clicks "next" button, this function is called:
  - If there are more snakes to set up, set the values and call setSnakeDetails
  - If all snakes are set up, call createGame with actualSnakeValues
*/
function onNext(snakeCount) {
  setSnakeDetails(); 
  if (snakeIndex === parseInt(snakeCount) - 1) { // - if all snakes are set up start the game.
    return createGame(actualSnakeValues);
  }
  snakeIndex++; // - updates which snake we are going to insert values for
  setDefaultValues(); // - updates the input fields to the next snake's default values
}

// Sets the snake details in actualSnakeValues array:
function setSnakeDetails() {
  const name = document.getElementById(`setup_name`).value;
  const up = document.getElementById(`input_up`).value;
  const down = document.getElementById(`input_down`).value;
  const left = document.getElementById(`input_left`).value;
  const right = document.getElementById(`input_right`).value;
  const color = document.getElementById("color_square").style.backgroundColor;
  actualSnakeValues.push({ name, up, down, left, right, color });
}
