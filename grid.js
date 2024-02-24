export default class Grid {
  constructor(gridSize = 22) {
    this.occupiedSquares = [];
    this.gridSize = gridSize;
  }

  /* 
    This function gets a random grid position
    that is not already occupied by a snake:
  */
  getRandomFoodPosition(occupiedSquares) {
    let newFoodPosition = this.randomGridPosition();
    while (
      occupiedSquares.some((pos) => this.equalPosition(pos, newFoodPosition))
    ) {
      newFoodPosition = this.randomGridPosition();
    }
    return newFoodPosition;
  }

  // This is a helper function for getRandomFoodPosition:
  randomGridPosition() {
    return {
      x: Math.floor(Math.random() * this.gridSize) + 1,
      y: Math.floor(Math.random() * this.gridSize) + 1,
    };
  }

  // This function checks if two positions are equal:
  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }
}
