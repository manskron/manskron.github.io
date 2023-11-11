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
        e.target.innerHTML = "⏸";
    } else {
        e.target.innerHTML = "▶";
    }
}

export function handleClickRestart() {
    app.run = false;
    app.sim.initializeBoard(true);
    if (app.dom.btnPause) {
        app.dom.btnPause.innerHTML = "⏸";
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

function initCellCountInput() {
    app.dom.displayCellCountEl.innerHTML =
        app.dom.inputCellCountEl.value * app.dom.inputCellCountEl.value;

    if (app.dom.inputCellCountEl && app.dom.displayCellCountEl) {
        app.dom.inputCellCountEl.addEventListener(
            "change",
            handleChangeCellCount
        );
        app.dom.inputCellCountEl.addEventListener(
            "input",
            handleInputCellCount
        );
    }
}

function initFpsInput() {
    if (app.dom.inputFpsEl) {
        app.setFps(app.dom.inputFpsEl.value);
        app.dom.inputFpsEl.addEventListener("input", handleInputFps);
    }
}

function initPauseButton() {
    app.dom.btnPause?.addEventListener("click", handleClickPause);
}

function initRestartButton() {
    app.dom.btnRestart.addEventListener("click", handleClickRestart);
}

export function initControls() {
    app.dom.btnPause = document.getElementById("pause");
    app.dom.btnRestart = document.getElementById("restart");
    app.dom.inputCellCountEl = document.getElementById("cellCountInput");
    app.dom.inputFpsEl = document.getElementById("fpsInput");
    app.dom.displayCellCountEl = document.getElementById("cellCount");
    app.dom.displayFpsEl = document.getElementById("fpsCount");

    initCellCountInput();
    initFpsInput();
    initPauseButton();
    initRestartButton();
}
