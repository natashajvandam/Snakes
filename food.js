export default class Food {
  constructor(x, y, color) {
    this.position = { x, y };
    this.color = color;
  }

  // updated when eaten by a snake:
  update(x, y, color) {
    this.position = { x, y };
    this.color = color || this.color;
    const foodElement = document.createElement("div");
    foodElement.style.backgroundColor = this.color;
  }

  // drawn at game start and every game update:
  draw() {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.style.backgroundColor = this.color;
    foodElement.classList.add("food");
    document.getElementById("grid").appendChild(foodElement);
  }
}
