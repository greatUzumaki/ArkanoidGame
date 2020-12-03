score = 0;
lives = 3;
scorePaddle = 25;
scoreLives = 100;

function touchdown(t_brick) {
  switch (t_brick.color) {
    case "yellow":
      score += 1;
      break;
    case "green":
      score += 2;
      break;
    case "orange":
      score += 3;
      break;
    case "red":
      score += 4;
  }

  if (score > scorePaddle) {
    paddle.width += 2;
    scorePaddle += 25;
  }

  if (score > scoreLives) {
    lives += 1;
    ball.speed += 1;
    if (ball.dx > 0) {
      ball.dx = ball.speed;
    } else {
      ball.dx = -1 * ball.speed;
    }
    if (ball.dy > 0) {
      ball.dy = ball.speed;
    } else {
      ball.dy = -1 * ball.speed;
    }
    score_lives += 100;
  }
}
