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
//  [x] Can we fix flickering on resize?
//
//  [] How do we add other cellular automata on top of GoL?
//

import { GameOfLife } from "./Sim.js";
import { initControls } from "./controls.js";
import { initCanvas, drawCanvas, canvasResizeObserver } from "./canvas.js";

export const app = {
    canvas: {},
    dom: {},
    sim: new GameOfLife(100),
    setFps(fps) {
        this.tickLength = 1000 / parseInt(fps);
    },
};

window.app = app;

app.run = true;

app.tickLength = 1000 / 20;

app.init = function init() {
    this.sim.initializeBoard(true);

    initCanvas();
    canvasResizeObserver.observe(app.canvas.canvasEl);

    initControls();
};

function update() {
    app.sim.getNextBoard();
}

function render() {
    drawCanvas(app.sim.board);
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

app.init();
app.main(performance.now());
