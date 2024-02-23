export default class ScoreBoard {
    constructor() {}

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
    
    update(snake) {
        snake.score++;
        document.getElementById(`${snake.name}_score`).innerHTML = `${snake.name}: ${snake.score}`;
    }
}