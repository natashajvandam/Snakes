import * as THREE from "three";

export default class Food {
  constructor(x, y, color) {
    const foodGeometry = new THREE.ConeGeometry(0.5, 1, 38);
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 1,
      metalness: 0.9,
    });

    const food = new THREE.Mesh(foodGeometry, material);
    food.color = color;
    food.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    food.position.x = x;
    food.position.y = y;
    food.castShadow = true;
    this.foodMesh = food;
    this.color = color;
  }

  // drawn at game start and every game update:
  draw(scene) {
    scene.add(this.foodMesh);
  }
}
