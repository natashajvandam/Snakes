export default class Snake {
  constructor(name, spawnX, spawnY, up, down, left, right) {
    this.body = [{ x: spawnX, y: spawnY }];
    this.newSegments = 0;
    this.inputDirection = { x: 0, y: 0 };
    this.lastInputDirection = { x: 0, y: 0 };
    this.isAlive = true;
    this.name = name;
    this.score = 0;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

  head() {
    return this.body[0];
  }

  update() {
    this.addSegments();
    const direction = this.inputDirection;
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }
    this.body[0].x += direction.x;
    this.body[0].y += direction.y;
  }

  draw() {
    this.body.forEach((seg) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = seg.y;
      snakeElement.style.gridColumnStart = seg.x;
      snakeElement.classList.add(`${this.name}_tail`);
      document.getElementById("grid").appendChild(snakeElement);
    });
  }

  expand(amount) {
    this.newSegments += amount;
  }

  onSnake(position, ignoreHead = false) {
    return this.body.some((seg, index) => {
      if (ignoreHead && index === 0) {
        return false;
      }
      return this.equalPosition(seg, position);
    });
  }

  checkDeath(otherBody, otherHead, gridSize) {
    if (
      this.hitEdgeOfGrid(gridSize) ||
      this.hitSelf() ||
      this.hitOtherSnake(otherBody) || 
      (otherBody.length && this.eatenByOtherSnake(otherHead))
    ) {
      this.remove();
      return true;
    }
  }

  updateScore() {
    this.score++;
    document.getElementById(`${this.name}_score`).innerHTML = `${this.score}`;
  }

  hitEdgeOfGrid(gridSize) {
    const head = this.head();
    return head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize;
  }

  hitOtherSnake(otherSnakeSegments) {
    const head = this.head();
    return this.body.length > 1
      ? otherSnakeSegments.some((seg) => this.equalPosition(seg, head))
      : false;
  }

  eatenByOtherSnake(otherHead) {
    return this.equalPosition(this.body[0], otherHead);
  }

  hitSelf() {
    const head = this.head();
    return this.body.length > 1 ? this.onSnake(head, true) : false;
  }

  remove() {
    let snakeElements = document.getElementsByClassName(this.name);
    while (snakeElements.length > 0) {
      document.getElementById("grid").removeChild(snakeElements[0]);
    }
    this.isAlive = false;
    this.body = [{}];
    window.removeEventListener("keydown", (e) => this.updateDirection(e));
  }

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    this.newSegments = 0;
  }

  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }

  updateDirection(event) {
    switch (event.key) {
      case this.up:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: -1 };
        this.lastInputDirection = this.inputDirection;
        break;
      case this.down:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: 1 };
        this.lastInputDirection = this.inputDirection;
        break;
      case this.right:
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: 1, y: 0 };
        this.lastInputDirection = this.inputDirection;
        break;
      case this.left:
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: -1, y: 0 };
        this.lastInputDirection = this.inputDirection;
        break;
    }
  }
}
