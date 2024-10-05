import * as THREE from "three";

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
      x: Math.floor(Math.random() * (this.gridSize / 2)) + 0.5,
      y: Math.floor(Math.random() * (this.gridSize / 2)) + 0.5,
    };
  }

  // This function checks if two positions are equal:
  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }

  draw(scene) {
    const grid = new THREE.GridHelper( this.gridSize, this.gridSize, "grey", "grey");
    grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    grid.position.z = -1;
    scene.add(grid);

    const borderGeometry = new THREE.BoxGeometry(this.gridSize - 2, 1, 1);
    const material = new THREE.MeshBasicMaterial( { color: "pink" } );
    
    // top boundary
    const borderUP = new THREE.Mesh( borderGeometry, material );
    borderUP.position.y = this.gridSize/ 2 + 0.3;
    scene.add(borderUP);

    // bottom boundary
    const borderDOWN = new THREE.Mesh( borderGeometry, material );
    borderDOWN.position.y = -this.gridSize/ 2 - 0.3;
    scene.add(borderDOWN);

    // left boundary
    const borderLEFT = new THREE.Mesh( borderGeometry, material );
    borderLEFT.position.x = -this.gridSize/ 2 - 0.3;
    borderLEFT.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    scene.add(borderLEFT);

    // right boundary
    const borderRIGHT = new THREE.Mesh( borderGeometry, material );
    borderRIGHT.position.x = this.gridSize/ 2 + 0.3;
    borderRIGHT.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    scene.add(borderRIGHT);
  }
}
