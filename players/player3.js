let inputDirection = {x: 0, y: 0};
let lastInputDirection = {x: 0, y: 0};

window.addEventListener('keydown', e => {
  switch(e.key) {
    case 'i':
      if (lastInputDirection.y !== 0) { break; };
      inputDirection = {x: 0, y: -1};
      break;
    case 'k':
      if (lastInputDirection.y !== 0) { break; };
      inputDirection = {x: 0, y: 1};
      break;    
    case 'l':
      if (lastInputDirection.x !== 0) { break; };
      inputDirection = {x: 1, y: 0};
      break;
    case 'j':
      if (lastInputDirection.x !== 0) { break; };
      inputDirection = {x: -1, y: 0};
      break;
  }
})

export function getInputDirection () {
  lastInputDirection = inputDirection;
  return inputDirection;
}