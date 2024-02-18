const GRID_SIZE = 22;

export function randomGridPosition () {
  return { 
    x: Math.floor(Math.random() * GRID_SIZE) +1,
    y: Math.floor(Math.random() * GRID_SIZE) +1
  }
}

export function outsideGrid (position) {
  return (
    position.x > GRID_SIZE || position.x < 1 || 
    position.y > GRID_SIZE || position.y < 1
  )
}