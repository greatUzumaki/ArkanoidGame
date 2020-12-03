document.addEventListener("keydown", function (e) {
  if (e.which === 37) paddle.dx = -3;
  else if (e.which === 39) paddle.dx = 3;

  if (ball.dx === 0 && ball.dy === 0 && e.which === 32) {
    ball.dx = ball.dy = ball.speed;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.which === 37 || e.which === 39) paddle.dx = 0;
});
