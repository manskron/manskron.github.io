function updateCellCount(cellCount) {
    app.sim.setCellCount(cellCount);
    app.canvas.CELL_WIDTH =
        app.canvas.canvasEl.offsetWidth / app.sim.BOARD_COLS;
    app.canvas.CELL_HEIGHT =
        app.canvas.canvasEl.offsetHeight / app.sim.BOARD_ROWS;
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
    app.sim.initializeBoard(true);
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
