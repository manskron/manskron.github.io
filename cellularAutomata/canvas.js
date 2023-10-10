import { app, Game } from "./index.js";

export function drawCanvas(board) {
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
  board.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (Game.getCellState(rowIndex, colIndex) === 1) {
        let x = colIndex * app.canvas.CELL_WIDTH;
        let y = rowIndex * app.canvas.CELL_HEIGHT;
        ctx.fillRect(x, y, app.canvas.CELL_WIDTH, app.canvas.CELL_HEIGHT);
      }
    });
  });
}

function initCanvasContainer() {
  const containerEl = document.getElementById("golContainer");
  if (containerEl) {
    containerEl.style.maxWidth = `${app.canvas.WIDTH}px`;
  }
}

function initCanvasEl() {
  app.canvas.canvasEl = document.getElementById("canvas");
  if (app.canvas.canvasEl) {
    app.canvas.canvasEl.width = app.canvas.WIDTH;
    app.canvas.canvasEl.height = app.canvas.HEIGHT;
  }
}

export function initCanvas() {
  initCanvasContainer();
  initCanvasEl();
}
