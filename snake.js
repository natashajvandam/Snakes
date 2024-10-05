import * as THREE from 'three';

export default class Snake {
  constructor(name, { x, y }, { up, down, left, right }, color) {
    this.body = [{ x, y }];
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
    return this.body[0];
  }

  /* 
    For each body segment, move it to the position 
    of the segment in front of it.
  */
  update() {
    this.addSegments();
    const direction = this.getInputDirection();
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }
    // After moving all the other segments, move the head:
    this.body[0].x += direction.x;
    this.body[0].y += direction.y;
  }

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    this.newSegments = 0;
  }

  /* 
    For each segment in the body array, create a div 
    element and append it to the grid.
  */
  draw(scene) {
    this.body.forEach((seg) => {
      const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial( { color: this.color } );
      const snakeSeg = new THREE.Mesh( bodyGeometry, material );
      snakeSeg.position.x = seg.x;
      snakeSeg.position.y = seg.y;
      scene.add(snakeSeg);
    });
  }

  /*
    Every time the snake eats food, the newSegments 
    property is increased by the expansionRate:
  */
  expand(expansionRate) {
    this.newSegments += expansionRate;
  }
  
  /*
    The checkDeath function is called every frame
    to see if the snake has died. If it has, the
    remove function is called.
  */
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

  // Helper function to see if a position is on the snake:
  onSnake(position, ignoreHead = false) {
    return this.body.some((seg, index) => {
      if (ignoreHead && index === 0) {
        return false;
      }
      return this.equalPosition(seg, position);
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
  remove() {
    let snakeElements = document.getElementsByClassName(this.name);
    while (snakeElements.length > 0) {
      // document.getElementById("grid").removeChild(snakeElements[0]);
    }
    this.isAlive = false;
    this.body = [{}];
    window.removeEventListener("keydown", (e) => this.updateDirection(e));
  }

  updateDirection(event) {
    switch (event.key) {
      case this.up:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: -1 };
        break;
      case this.down:
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: 1 };
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
