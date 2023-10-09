//  @TODOS ----------------------------------------------
//
//  [] Set up all DOM elements through functions instead
//  of having to write all the HTML wherever you want
//  to use this thing;
//
//  [] Move all DOM setup to dom.js
//
//  [] How do we add other cellular automata on top of GoL?

// @ts-check
import { GameOfLife } from "./Sim.js";
import { initControls } from "./controls.js";
import { initCanvas, drawCanvas } from "./canvas.js";

export const app = {
  canvas: {},
  setFps(fps) {
    this.tickLength = 1000 / parseInt(fps);
  },
};

export const Game = new GameOfLife(300);

app.run = true;

app.tickLength = 1000 / 60;

app.canvas.WIDTH = Math.min(600, window.innerWidth - 40);
app.canvas.HEIGHT = app.canvas.WIDTH;

app.canvas.CELL_WIDTH = app.canvas.WIDTH / Game.BOARD_COLS;
app.canvas.CELL_HEIGHT = app.canvas.HEIGHT / Game.BOARD_ROWS;

app.canvas.BG_COLOR = "#eeeeee";
app.canvas.FILL_COLOR = "#202020";
app.canvas.SHAPE = "rect";
app.previousBoard = [];

app.updateCellCount = function (cellCount) {
  Game.setCellCount(cellCount);
  app.canvas.CELL_WIDTH = app.canvas.WIDTH / Game.BOARD_COLS;
  app.canvas.CELL_HEIGHT = app.canvas.HEIGHT / Game.BOARD_ROWS;
};

function init() {
  Game.initializeBoard(true);

  initCanvas();
  initControls();
}

function update() {
  Game.getNextBoard();
}

function render() {
  drawCanvas(Game.board);
}

app.lastTick = performance.now();

function main(tFrame) {
  app.stopMain = window.requestAnimationFrame(main);
  const nextTick = app.lastTick + app.tickLength;

  if (app.run && app.tickLength > 0) {
    if (tFrame >= nextTick) {
      app.lastTick = tFrame;
      update();
      render();
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  init();
  main(performance.now());
});

// I should probably optimize this thing.
// Also, this should be moved to where all
// other DOM events are handled.
window.addEventListener("resize", () => {
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    if (app.canvas.WIDTH === 600 && window.innerWidth > 600) {
      return;
    }
    app.canvas.canvasEl.getContext("2d").reset();
    app.canvas.WIDTH = Math.min(600, window.innerWidth - 40);
    app.canvas.HEIGHT = app.canvas.WIDTH;
    init();
    main(performance.now());
  }, 250);
});
