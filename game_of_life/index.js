// @ts-check
import { Gol } from "./Game.js";
import { setupControls } from "./controls.js";
import { setupCanvas, drawCanvas } from "./canvas.js";

window.app_gol = { canvas: {} };

export const app = window.app_gol;
export const Game = new Gol(100);

app.run = true;
app.FPS = 15;

app.canvas.WIDTH = Math.min(600, window.innerWidth - 40);
app.canvas.HEIGHT = app.canvas.WIDTH;

app.canvas.CELL_WIDTH = app.canvas.WIDTH / Game.BOARD_COLS;
app.canvas.CELL_HEIGHT = app.canvas.HEIGHT / Game.BOARD_ROWS;

app.canvas.BG_COLOR = "#eeeeee";
app.canvas.FILL_COLOR = "#202020";
app.canvas.SHAPE = "rect";

function draw() {
  if (app.run) {
    drawCanvas(Game.board);
    Game.getNextBoard();
  }

  setTimeout(() => {
    window.requestAnimationFrame(draw);
  }, 1000 / app.FPS);
}

function init() {
  Game.initializeBoard(true);

  setupCanvas();
  setupControls();
}

export function GameOfLife() {
  init();
  draw();
}

window.addEventListener("resize", () => {
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    let newWidth = Math.min(600, window.innerWidth - 40);
    app.canvas.WIDTH = newWidth;
    app.canvas.HEIGHT = app.canvas.WIDTH;
    app.canvas.canvasEl.getContext("2d").reset();
    GameOfLife();
  }, 500);
});
