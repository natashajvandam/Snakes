export default class Grid {
  constructor(gridSize = 22) {
    this.occupiedSquares = [];
    this.gridSize = gridSize;
  }

  getRandomFoodPosition() {
    const newFoodPosition = this.randomGridPosition();
    return newFoodPosition;
  }

  randomGridPosition() {
    return {
      x: Math.floor(Math.random() * this.gridSize) + 1,
      y: Math.floor(Math.random() * this.gridSize) + 1,
    };
  }

  outsideGrid(position) {
    return (
      position.x > this.gridSize ||
      position.x < 1 ||
      position.y > this.gridSize ||
      position.y < 1
    );
  }
}
