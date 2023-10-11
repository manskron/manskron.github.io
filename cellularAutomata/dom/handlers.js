import { Game } from "../index.js";

function updateCellCount(cellCount) {
  Game.setCellCount(cellCount);
  app.canvas.CELL_WIDTH = app.canvas.WIDTH / Game.BOARD_COLS;
  app.canvas.CELL_HEIGHT = app.canvas.HEIGHT / Game.BOARD_ROWS;
}

export function handleClickPause(e) {
  app.run = !app.run;
  if (app.run) {
    e.target.innerHTML = "Pause";
  } else {
    e.target.innerHTML = "Run";
  }
}

export function handleClickRestart() {
  app.run = false;
  Game.initializeBoard(true);
  if (app.dom.btnPause) {
    app.dom.btnPause.innerHTML = "Pause";
  }
  app.run = true;
}

export function handleChangeCellCount(e) {
  if (!app.run) {
    updateCellCount(e.target.value);
  } else {
    app.run = false;
    updateCellCount(e.target.value);
    app.run = true;
  }
}

export function handleInputFps(e) {
  app.setFps(e.target.value);
  if (app.dom.displayFpsEl) {
    app.dom.displayFpsEl.innerHTML = e.target.value;
  }
}

export function handleInputCellCount(e) {
  let col = e.target.value;
  app.dom.displayCellCountEl.innerHTML = col * col;
}

//
// I should probably optimize this thing.
// Also, this should be moved to where all
// other DOM events are handled.
export function handleResizeWindow() {
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    if (app.canvas.WIDTH === 600 && window.innerWidth > 600) {
      return;
    }
    app.canvas.canvasEl.getContext("2d").reset();
    app.canvas.WIDTH = Math.min(600, window.innerWidth - 40);
    app.canvas.HEIGHT = app.canvas.WIDTH;
    app.init();
    app.main(performance.now());
  }, 250);
}
