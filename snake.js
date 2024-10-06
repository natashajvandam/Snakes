import * as THREE from "three";

export default class Snake {
  constructor(name, { x, y }, { up, down, left, right }, color) {
    const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color });
    const snakeSeg = new THREE.Mesh(bodyGeometry, material);
    snakeSeg.position.x = x;
    snakeSeg.position.y = y;

    this.body = [snakeSeg];
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
    this.color = color;
  }

  // The head of the snake is the first element in the body array:
  head() {
    return this.body[0].position;
  }

  /* 
    For each body segment, move it to the position 
    of the segment in front of it.
  */
  update() {
    const direction = this.getInputDirection();
    this.newSegments && this.addSegments();
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1].position.x = this.body[i].position.x;
      this.body[i + 1].position.y = this.body[i].position.y;
    }
    this.newSegments = 0;
    // After moving all the other segments, move the head:
    this.head().x += direction.x;
    this.head().y += direction.y;
  }

  addSegments() {
    const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    for (let i = 0; i < this.newSegments; i++) {
      const snakeSeg = new THREE.Mesh(bodyGeometry, material);
      snakeSeg.position.x = this.body[this.body.length - 1].position.x;
      snakeSeg.position.y = this.body[this.body.length - 1].position.y;
      this.body.push(snakeSeg);
    }
    this.newSegments = 0;
  }

  /* 
    For each segment in the body array, create a div 
    element and append it to the grid.
  */
  draw(scene) {
    this.body.forEach((seg) => {
      scene.add(seg);
    });
  }

  /*
    Every time the snake eats food, the newSegments 
    property is increased by the expansionRate:
  */
  expand(expansionRate) {
    this.newSegments += expansionRate;
  }

  hitEdgeOfGrid(gridSize) {
    const externalBound = gridSize / 2;
    return (
      Math.abs(this.head().x) >= externalBound - 1 ||
      Math.abs(this.head().y) >= externalBound - 1
    );
  }

  checkCollision(otherSnakes) {
    return otherSnakes.some((otherSnake) => {
      const [head, ...bodySansHead] = otherSnake.body;
      return this.hitOtherSnake(bodySansHead) || this.eatenByOtherSnake(head);
    });
  }

  hitOtherSnake(otherSnakeSegments) {
    const head = this.head();
    return this.body.length > 1
      ? otherSnakeSegments.some((seg) => this.equalPosition(seg.position, head))
      : false;
  }

  eatenByOtherSnake(otherHead) {
    return this.equalPosition(this.head(), otherHead.position);
  }

  hitSelf() {
    const head = this.head();
    return this.body.length > 1 ? this.onSnake(head, true) : false;
  }

  // Helper function to see if a position is on the snake:
  onSnake(position, ignoreHead = false) {
    return this.body.some((seg, index) => {
      if (ignoreHead && index === 0) {
        return false;
      }
      return this.equalPosition(seg.position, position);
    });
  }

  equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y ? true : false;
  }

  /* 
    When snake dies, remove all the div elements
    and set isAlive to false. Also remove the event
    listener for the snake's controls.
  */
  remove(scene) {
    while (this.body.length > 0) {
      const segment = this.body.pop();
      scene.remove(segment);
    }
    this.isAlive = false;
    window.removeEventListener("keydown", (e) => this.updateDirection(e));
  }

  updateDirection(event) {
    switch (event.key) {
      case this.up:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: 1 };
        break;
      case this.down:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: -1 };
        break;
      case this.right:
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: 1, y: 0 };
        break;
      case this.left:
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: -1, y: 0 };
        break;
    }
  }

  getInputDirection() {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }
}
