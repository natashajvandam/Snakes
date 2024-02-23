import Game from "./game.js";

let lastRenderTime = 0;
const game = new Game();
if (game.snakes?.length === 0) {
  game.addSnake("snake1", {x: 12, y: 12}, {up: "w", down: "s", left: "a", right: "d"}, "green");
  game.addSnake("snake2", {x: 15, y: 15}, {up: "ArrowUp", down:"ArrowDown", left: "ArrowLeft", right: "ArrowRight"}, "blue");
  game.addSnake("snake3", {x: 18, y: 18}, {up: "i", down: "k", left: "j",right: "l"}, "red");
  game.start();
}

function main(currentTime) {
  if (!game.gameGoing) {
    if (confirm('You loose. Press "ok" to play again.')) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  // "currentTime" is the time in milliseconds since the page was loaded and "lastRenderTime" is the time in milliseconds since the last time.
  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;

  // If the time since the last render is less than the speed of the snake, then return (do nothing):
  if (secondsSinceLastRenderTime < 1 / game.gameSpeed) {
    return;
  }
  lastRenderTime = currentTime;
  game.update();
}
window.requestAnimationFrame(main);
