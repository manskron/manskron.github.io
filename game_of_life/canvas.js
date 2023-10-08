import { app, Game } from "../mans.js";

export function updateCanvas(board) {
  const ctx = app.canvas.canvasEl.getContext("2d");
  let bodyEl = document.querySelector("body");

  if (bodyEl) {
    let bodyStyles = window.getComputedStyle(bodyEl);
    let bg = bodyStyles.getPropertyValue("background-color");
    let fill = bodyStyles.getPropertyValue("color");
    app.canvas.BG_COLOR = bg;
    app.canvas.FILL_COLOR = fill;
  }

  ctx.fillStyle = app.canvas.BG_COLOR;
  ctx.fillRect(0, 0, app.canvas.WIDTH, app.canvas.HEIGHT);
  ctx.fillStyle = app.canvas.FILL_COLOR;
  ctx.strokeStyle = app.canvas.FILL_COLOR;
  board.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (Game.getCellState(rowIndex, colIndex) === 1) {
        let x = colIndex * app.canvas.CELL_WIDTH;
        let y = rowIndex * app.canvas.CELL_HEIGHT;
        switch (app.canvas.SHAPE) {
          case "arc":
            ctx.beginPath();
            ctx.arc(x + 3, y + 3, app.canvas.CELL_WIDTH / 2, 0, 2 * Math.PI);
            // ctx.stroke();
            ctx.fill();
            break;
          default:
            ctx.fillRect(x, y, app.canvas.CELL_WIDTH, app.canvas.CELL_HEIGHT);
        }
      }
    });
  });
}

function setupCanvasContainer() {
  const containerEl = document.getElementById("golContainer");
  if (containerEl) {
    containerEl.style.maxWidth = `${app.canvas.WIDTH}px`;
  }
}

function setupCanvasEl() {
  app.canvas.canvasEl = document.getElementById("canvas");
  if (app.canvas.canvasEl) {
    app.canvas.canvasEl.width = app.canvas.WIDTH;
    app.canvas.canvasEl.height = app.canvas.HEIGHT;
  }
}

export function setupCanvas() {
  setupCanvasContainer();
  setupCanvasEl();
}
