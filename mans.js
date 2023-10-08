// @ts-check
import { Gol } from "./game_of_life/Game.js";
import { setupControls } from "./game_of_life/controls.js";
import { setupCanvas, updateCanvas } from "./game_of_life/canvas.js";

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

function setupThemeButton() {
  const btn = document.getElementById("themeToggler");
  if (btn) {
    btn.addEventListener("click", function () {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.toggle("light-theme");
      } else {
        document.body.classList.toggle("dark-theme");
      }
    });
  }
}

function draw() {
  if (app.run) {
    updateCanvas(Game.board);
    Game.getNextBoard();
  }

  setTimeout(() => {
    window.requestAnimationFrame(draw);
  }, 1000 / app.FPS);
}

function init() {
  Game.initializeBoard(true);

  setupCanvas();
  setupThemeButton();
  setupControls();
}

window.addEventListener("DOMContentLoaded", function () {
  init();
  draw();
});
