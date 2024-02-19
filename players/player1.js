/*
  This file is responsible for handling the input from the player.
  The player can use the arrow keys to control the snake.
  The "inputDirection" variable stores the direction of the snake.

  Initially the snake is not moving, so the "inputDirection" is set to {x: 0, y: 0}.
*/
let inputDirection = {x: 0, y: 0};
let lastInputDirection = {x: 0, y: 0};

// This event listener is used to detect the arrow keys being pressed.
window.addEventListener('keydown', e => {
  /* 
    The "switch" statement is used to determine which arrow key was pressed.
    See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  */
  switch(e.key) {
    case 'ArrowUp':

      // If the snake is moving up or down, the snake cannot reverse direction.
      if (lastInputDirection.y !== 0) { break; };
      // The "inputDirection" is set to move the snake up (y: -1).
      inputDirection = {x: 0, y: -1};
      break;

    case 'ArrowDown':
      // If the snake is moving up or down, the snake cannot reverse direction.
      if (lastInputDirection.y !== 0) { break; };
      // The "inputDirection" is set to move the snake down (y: 1).
      inputDirection = {x: 0, y: 1};
      break;    

    case 'ArrowRight':
      // If the snake is moving left or right, the snake cannot reverse direction.
      if (lastInputDirection.x !== 0) { break; };
      // The "inputDirection" is set to move the snake right (x: 1).
      inputDirection = {x: 1, y: 0};
      break;

    case 'ArrowLeft':
      // If the snake is moving left or right, the snake cannot reverse direction.
      if (lastInputDirection.x !== 0) { break; };
      // The "inputDirection" is set to move the snake left (x: -1).
      inputDirection = {x: -1, y: 0};
      break;
  }
})

export function getInputDirection () {
  lastInputDirection = inputDirection;
  return inputDirection;
}