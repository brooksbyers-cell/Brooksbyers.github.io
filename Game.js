const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ball = {
  x: 240,
  y: 260,
  vx: 0,
  vy: 0,
  thrown: false
};

let score = 0;

canvas.addEventListener("click", (e) => {
  if (!ball.thrown) {
    ball.vx = (Math.random() - 0.5) * 6;
    ball.vy = -6;
    ball.thrown = true;
  }
});

function update() {
  if (ball.thrown) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += 0.25;

    if (ball.y < 60) {
      score++;
      resetBall();
    }

    if (ball.y > canvas.height) {
      resetBall();
    }
  }
}

function resetBall() {
  ball.x = 240;
  ball.y = 260;
  ball.vx = 0;
  ball.vy = 0;
  ball.thrown = false;
}

function drawField() {
  ctx.fillStyle = "#117a37";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  ctx.setLineDash([5, 10]);
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawBall() {
  ctx.fillStyle = "brown";
  ctx.fillRect(ball.x - 4, ball.y - 4, 8, 8);
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText("SCORE: " + score, 10, 20);
  ctx.fillText("CLICK TO THROW", 320, 20);
}

function loop() {
  update();
  drawField();
  drawBall();
  drawUI();
  requestAnimationFrame(loop);
}

loop();
