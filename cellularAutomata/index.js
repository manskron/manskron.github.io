//  @TODOS ----------------------------------------------
//
//  [x] Set up all DOM elements through functions instead
//     of having to write all the HTML wherever you want
//     to use this thing;
//
//  [x] Move all DOM setup to an appropriate place
//
//  [x] Remove cell shape option, it's stupid (for the
//     moment at least).
//
//  [] How do we add other cellular automata on top of GoL?
//

// @ts-check
import { GameOfLife } from "./Sim.js";
import { initControls } from "./dom/controls.js";
import { initCanvas, drawCanvas, canvasResizeObserver } from "./canvas.js";
import { constructDom } from "./dom/construct.js";

export const app = {
    canvas: {},
    dom: {},
    setFps(fps) {
        this.tickLength = 1000 / parseInt(fps);
    },
};

window.app = app;

export const Game = new GameOfLife(300);

app.run = true;

app.tickLength = 1000 / 60;

app.canvas.BG_COLOR = "#eeeeee";
app.canvas.FILL_COLOR = "#202020";

app.init = function init() {
    Game.initializeBoard(true);

    initCanvas();
    canvasResizeObserver.observe(app.canvas.canvasEl);

    initControls();
};

function update() {
    Game.getNextBoard();
}

function render() {
    drawCanvas(Game.board);
}

app.lastTick = performance.now();

app.main = function main(tFrame) {
    app.stopMain = window.requestAnimationFrame(main);
    const nextTick = app.lastTick + app.tickLength;

    if (app.run && app.tickLength > 0) {
        if (tFrame >= nextTick) {
            app.lastTick = tFrame;
            update();
            render();
        }
    }
};

window.addEventListener("DOMContentLoaded", () => {
    constructDom();
    app.init();
    app.main(performance.now());
});
