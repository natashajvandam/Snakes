import * as THREE from "three";
import { RANDOM_COLOR } from "./utils.js";

export default class Grid {
  constructor(gridSize = 22) {
    this.occupiedSquares = [];
    this.size = gridSize;
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
    const edge = this.size / 2;
    return {
      x: Math.floor(Math.random() * edge),
      y: Math.floor(Math.random() * edge),
    };
  }

  // This function checks if two positions are equal:
  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }

  draw(scene) {
    // background
    const backgroundPlane = new THREE.PlaneGeometry(this.size, this.size);
    const backgroundMaterial = new THREE.MeshStandardMaterial({ color: RANDOM_COLOR(), roughness: 0.8, metalness: 0.9 });
    const background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    background.position.z = -2;
    background.receiveShadow = true;
    scene.add(background);

    // see-through grid
    const gridPlane = new THREE.PlaneGeometry(this.size, this.size);
    const gridMaterial = new THREE.MeshPhysicalMaterial({ color: "white", transparent: true, opacity: 0.2 });
    const grid = new THREE.Mesh(gridPlane, gridMaterial);
    grid.position.z = -0.5;
    grid.receiveShadow = false;
    scene.add(grid);

    // walls
    const borderGeometry = new THREE.BoxGeometry(this.size, 1, 35);
    const material = new THREE.MeshStandardMaterial({ color: RANDOM_COLOR(), roughness: 0.9, metalness: 0.9 });

    // top boundary
    const borderUP = new THREE.Mesh(borderGeometry, material);
    borderUP.position.y = this.size / 2;
    scene.add(borderUP);

    // bottom boundary
    const borderDOWN = new THREE.Mesh(borderGeometry, material);
    borderDOWN.position.y = -this.size / 2;
    scene.add(borderDOWN);

    // left boundary
    const borderLEFT = new THREE.Mesh(borderGeometry, material);
    borderLEFT.position.x = -this.size / 2;
    borderLEFT.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    scene.add(borderLEFT);

    // right boundary
    const borderRIGHT = new THREE.Mesh(borderGeometry, material);
    borderRIGHT.position.x = this.size / 2;
    borderRIGHT.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    scene.add(borderRIGHT);
  }
}
