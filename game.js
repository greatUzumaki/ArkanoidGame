// главный цикл игры
function loop() {
  // на каждом кадре — очищаем поле и рисуем всё заново
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // двигаем платформу с нужной скоростью
  paddle.x += paddle.dx;

  // при этом смотрим, чтобы она не уехала за стены
  if (paddle.x < wallSize) {
    paddle.x = wallSize;
  } else if (paddle.x + brickWidth > canvas.width - wallSize) {
    paddle.x = canvas.width - wallSize - brickWidth;
  }

  // шарик тоже двигается со своей скоростью
  ball.x += ball.dx;
  ball.y += ball.dy;

  // и его тоже нужно постоянно проверять, чтобы он не улетел за границы стен
  // смотрим левую и правую стенки
  if (ball.x < wallSize) {
    ball.x = wallSize;
    ball.dx *= -1;
  } else if (ball.x + ball.width > canvas.width - wallSize) {
    ball.x = canvas.width - wallSize - ball.width;
    ball.dx *= -1;
  }
  // проверяем верхнюю границу
  if (ball.y < wallSize) {
    ball.y = wallSize;
    ball.dy *= -1;
  }

  // перезагружаем шарик, если он улетел вниз, за край игрового поля
  if (ball.y > canvas.height) {
    lives -= 1;

    score = 0;
    scorePaddle = 25;
    scoreLives = 100;
    paddle.width = brickWidth;

    if (lives <= 0) {
      context.fillStyle = "black";
      context.globalAlpha = 0.75;
      context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
      context.globalAlpha = 1;
      context.fillStyle = "white";
      context.font = "36px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
      return; };
    
    ball.x = 130;
    ball.y = 260;
    ball.dx = 0;
    ball.dy = 0;

  }

  // проверяем, коснулся ли шарик платформы, которой управляет игрок. Если коснулся — меняем направление движения шарика по оси Y на противоположное
  if (collides(ball, paddle)) {
    ball.dy *= -1;

    // сдвигаем шарик выше платформы, чтобы на следующем кадре это снова не засчиталось за столкновение
    ball.y = paddle.y - ball.height;
  }

  // проверяем, коснулся ли шарик цветного кирпича
  // если коснулся — меняем направление движения шарика в зависимости от стенки касания
  // для этого в цикле проверяем каждый кирпич на касание
  for (let i = 0; i < bricks.length; i++) {
    // берём очередной кирпич
    const brick = bricks[i];
    // если было касание
    if (collides(ball, brick)) {
      // убираем кирпич из массива
      bricks.splice(i, 1);
      touchdown(brick);

      // если шарик коснулся кирпича сверху или снизу — меняем направление движения шарика по оси Y
      if (
        ball.y + ball.height - ball.speed <= brick.y ||
        ball.y >= brick.y + brick.height - ball.speed
      ) {
        ball.dy *= -1;
      }
      // в противном случае меняем направление движения шарика по оси X
      else {
        ball.dx *= -1;
      }
      // как нашли касание — сразу выходим из цикла проверки
      break;
    }
  }

  // рисуем стены
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, canvas.width, wallSize);
  context.fillRect(0, 0, wallSize, canvas.height);
  context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);

  // если шарик в движении — рисуем его
  if (ball.dx || ball.dy) {
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
  }

  // рисуем кирпичи
  bricks.forEach(function (brick) {
    context.fillStyle = brick.color;
    context.fillRect(brick.x, brick.y, brick.width, brick.height);
  });

  // рисуем платформу
  context.fillStyle = "cyan";
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fillStyle = "#777777";
  context.font = "20pt monospace";
  context.fillText("Очки: " + score, 50, 490);
  context.fillText("Жизни:" + lives, 250, 490);
}
requestAnimationFrame(loop);
