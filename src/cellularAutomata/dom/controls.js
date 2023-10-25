import {
    handleChangeCellCount,
    handleClickPause,
    handleClickRestart,
    handleInputCellCount,
    handleInputFps,
} from "./handlers.js";

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
