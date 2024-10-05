import * as THREE from "three";

export default class Food {
  constructor(x, y, color) {
    this.position = { x, y };
    this.color = color;
  }

  // updated when eaten by a snake:
  update(x, y) {
    this.position = { x, y };
    const foodElement = document.createElement("div");
    foodElement.style.backgroundColor = this.color;
  }

  // drawn at game start and every game update:
  draw(scene) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.style.backgroundColor = this.color;
    foodElement.classList.add("food");

    const foodGeometry = new THREE.ConeGeometry(0.5, 1, 38);
    const material = new THREE.MeshBasicMaterial({ color: this.color });
    const food = new THREE.Mesh(foodGeometry, material);
    food.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    food.position.x = this.position.x;
    food.position.y = this.position.y;
    scene.add(food);
  }
}
