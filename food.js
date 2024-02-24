export default class Food {
  constructor(x, y, color) {
    this.position = { x, y };
    this.color = color;
  }

  update(x, y, color) {
    this.position = { x, y };
    this.color = color || this.color;
    const foodElement = document.createElement("div");
    foodElement.style.backgroundColor = this.color;
  }

  draw() {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.style.backgroundColor = this.color;
    foodElement.classList.add("food");
    document.getElementById("grid").appendChild(foodElement);
  }
}
