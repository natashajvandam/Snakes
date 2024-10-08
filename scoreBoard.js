export default class ScoreBoard {
  constructor() {}

  // This function is called once at game start:
  draw(snakes) {
    const scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.innerHTML = "";
    snakes.forEach((snake) => {
      const snakeScore = document.createElement("div");
      snakeScore.setAttribute("id", `${snake.name}_score`);
      snakeScore.setAttribute("class", "scores");
      snakeScore.style.color = snake.color;
      snakeScore.innerHTML = `${snake.name}: ${snake.score}`;
      scoreBoard.appendChild(snakeScore);
    });
  }

  // This function is called every time a snake eats food:
  update(snake) {
    snake.score++;
    document.getElementById(
      `${snake.name}_score`
    ).innerHTML = `${snake.name}: ${snake.score}`;
    document.getElementById(
      `${snake.name}_score`
    ).style.color = snake.color;
  }
}
