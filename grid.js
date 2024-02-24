export default class Grid {
  constructor(gridSize = 22) {
    this.occupiedSquares = [];
    this.gridSize = gridSize;
  }

  getRandomFoodPosition(occupiedSquares) {
    let newFoodPosition = this.randomGridPosition();
    while (
      occupiedSquares.some((pos) => this.equalPosition(pos, newFoodPosition))
    ) {
      newFoodPosition = this.randomGridPosition();
    }
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

  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }
}
