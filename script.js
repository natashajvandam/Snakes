import Game from "./game.js";

let lastRenderTime = 0;
const game = new Game();
if (game.snakes?.length === 0) {
  game.addSnake("snake1", 12, 12, "w", "s", "a", "d");
  game.addSnake(
    "snake2",
    15,
    15,
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  );
  game.addSnake("snake3", 18, 18, "i", "k", "j", "l");
  game.draw();
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
