// @ts-check
import { app, Game } from "./index.js";

function initCellCountInput() {
  const inputEl = document.getElementById("cellCountInput");
  const cellCountEl = document.getElementById("cellCount");
  cellCountEl.innerHTML = inputEl.value * inputEl.value;
  if (inputEl && cellCountEl) {
    function updateCellCount() {
      Game.setCellCount(inputEl.value);
      app.canvas.CELL_WIDTH = app.canvas.WIDTH / Game.BOARD_COLS;
      app.canvas.CELL_HEIGHT = app.canvas.HEIGHT / Game.BOARD_ROWS;

      cellCountEl.innerHTML = Game.BOARD_COLS * Game.BOARD_ROWS;
    }

    inputEl.addEventListener("change", (e) => {
      // Don't unpause if paused.
      if (!app.run) {
        updateCellCount();
      } else {
        app.run = false;
        updateCellCount();
        app.run = true;
      }
    });

    inputEl.addEventListener("input", (e) => {
      cellCountEl.innerHTML = inputEl.value * inputEl.value;
    });
  }
}

function initFpsInput() {
  let fpsEl = document.getElementById("fpsInput");
  let fpsCountEl = document.getElementById("fpsCount");
  if (fpsEl) {
    app.setFps(fpsEl.value);

    fpsEl.addEventListener("input", () => {
      app.setFps(fpsEl.value);
      if (fpsCountEl) {
        fpsCountEl.innerHTML = fpsEl.value;
      }
    });
  }
}

function initPauseButton() {
  const btn = document.getElementById("pause");
  btn?.addEventListener("click", () => {
    app.run = !app.run;
    if (app.run) {
      btn.innerHTML = "Pause";
    } else {
      btn.innerHTML = "Run";
    }
  });
}

function initRestartButton() {
  const btn = document.getElementById("restart");
  const pauseBtn = document.getElementById("pause");
  btn.addEventListener("click", () => {
    app.run = false;
    Game.initializeBoard(true);
    if (pauseBtn) {
      pauseBtn.innerHTML = "Pause";
    }
    app.run = true;
  });
}

function initShapeInput() {
  const shapeEls = document.querySelectorAll('input[name="shape"]');
  shapeEls.forEach((shapeEl) => {
    shapeEl.addEventListener("input", (e) => {
      if (e.target.checked) {
        app.canvas.SHAPE = shapeEl.value;
      }
    });
  });
}

export function initControls() {
  initCellCountInput();
  initFpsInput();
  initPauseButton();
  initRestartButton();
  initShapeInput();
}
