import { DEFAULT_SNAKES } from "./setup.js";
import Game from "./game.js";
import {
  GRID_SIZE,
  GAME_SPEED,
  EXPANSION_RATE,
  SNAKE_COUNT,
} from "./constants.js";
import { RANDOM_COLOR } from "./utils.js";
import * as THREE from "three";

let game;
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let clock = new THREE.Clock(true);

// This function uses the constants to create a game:
function createGame() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  camera.position.z = 50;
  const directionalLight = new THREE.PointLight(0xffffff, 9, 500, 0.01);
  directionalLight.castShadow = true;
  directionalLight.position.z = 20;
  directionalLight.position.x = 20;
  scene.add(directionalLight);

  game = new Game(scene, GRID_SIZE, GAME_SPEED, EXPANSION_RATE);

  // Add each snake to the game:
  for (let i = 0; i < SNAKE_COUNT; i++) {
    // get a random position for the snake to spawn:
    const { x, y } = game.grid.randomGridPosition();
    // get a random color for the snake:
    const color = RANDOM_COLOR();
    // get the default values for the snake's name, color, and controls:
    const { up, down, left, right, name } = DEFAULT_SNAKES[i];
    game.addSnake(name, { x, y }, { up, down, left, right }, color);
  }

  // Trigger the start of the game
  game.start();
  renderer.setAnimationLoop(animate);
}

/* 
  This is the function that runs the game loop. Based on the game speed, 
  it will call the update function of the game class over and over until
  all snakes are dead.
*/
function animate() {
  // If game is no longer going - prompt user to play again:
  if (!game.gameGoing) {
    const results = game.scoreBoard.gameOver();
    renderer.setAnimationLoop(null);
    alert(`${results.join(' \n')}`)
    window.location = "/";
    return;
  }

  if ((clock.getElapsedTime() > 1 / game.gameSpeed)) {
    game.update();
    clock.start();
    renderer.render(scene, camera);
  }
}

createGame(); // This is the first thing that runs when the page loads
