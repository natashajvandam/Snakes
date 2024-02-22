export default class Food {
  constructor(x, y) {
    this.position = { x, y };
  }

  update(x, y) {
    this.position = { x, y };
  }

  draw() {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.classList.add("food");
    document.getElementById("grid").appendChild(foodElement);
  }
}
