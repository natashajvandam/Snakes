import { createGame } from "./script.js";
export const defaultSnakes = [
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

let snakeIndex = 0;
let actualSnakeValues = [];

export function goToStep1() {
  window.location = "/";
}

export function goToStep2(snakeCount) {
  // listen for "back" and "next" button clicks:
  document
    .getElementById("setup_back_button")
    .addEventListener("click", () => goToStep1());
  document
    .getElementById("setup_next_button")
    .addEventListener("click", () => onNext(snakeCount));
  // show step 2 instead of step 1:
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "flex";
  // set default values:
  setDefaultValues();
}

function setDefaultValues() {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.getElementById("color_square").style.backgroundColor = color;
  document.getElementById(`setup_name`).value = defaultSnakes[snakeIndex].name;
  document.getElementById(`input_up`).value = defaultSnakes[snakeIndex].up;
  document.getElementById(`input_down`).value = defaultSnakes[snakeIndex].down;
  document.getElementById(`input_left`).value = defaultSnakes[snakeIndex].left;
  document.getElementById(`input_right`).value =
    defaultSnakes[snakeIndex].right;
}

function onNext(snakeCount) {
  setSnakeDetails();
  if (snakeIndex === parseInt(snakeCount) - 1) {
    return createGame(actualSnakeValues);
  }
  snakeIndex++;
  setDefaultValues();
}

function setSnakeDetails() {
  const name = document.getElementById(`setup_name`).value;
  const up = document.getElementById(`input_up`).value;
  const down = document.getElementById(`input_down`).value;
  const left = document.getElementById(`input_left`).value;
  const right = document.getElementById(`input_right`).value;
  const color = document.getElementById("color_square").style.backgroundColor;
  actualSnakeValues.push({ name, up, down, left, right, color });
}
