// @ts-check
// 
import { GameOfLife } from "./Gol.js";


let CANVAS_WIDTH = Math.min(window.innerHeight - 350, window.innerWidth);
let CANVAS_HEIGHT = CANVAS_WIDTH;
let FPS = 60;

const Game = new GameOfLife(100);

let CANVAS_CELL_WIDTH = CANVAS_WIDTH / Game.BOARD_COLS;
let CANVAS_CELL_HEIGHT = CANVAS_HEIGHT / Game.BOARD_ROWS;


let canvas, fpsEl;
let run = true;

let BG_COLOR = "#eeeeee";
let FILL_COLOR = "#202020";
let SHAPE = "rect"


function setCanvasColors() {
    let bodyEl = document.querySelector("body")
    if (bodyEl) {
        let bodyStyles = window.getComputedStyle(bodyEl)
        let bg = bodyStyles.getPropertyValue('background-color')
        let fill = bodyStyles.getPropertyValue('color')
        BG_COLOR = bg;
        FILL_COLOR = fill
    }
}

function setupCellCountInput() {
    const inputEl = document.getElementById("cellCountInput");
    const cellCountEl = document.getElementById("cellCount");
    cellCountEl.innerHTML = inputEl.value * inputEl.value;
    if (inputEl && cellCountEl) {

        function updateCellCount() {
            Game.setCellCount(inputEl.value)
            CANVAS_CELL_WIDTH = CANVAS_WIDTH / Game.BOARD_COLS;
            CANVAS_CELL_HEIGHT = CANVAS_HEIGHT / Game.BOARD_ROWS;

            cellCountEl.innerHTML = Game.BOARD_COLS * Game.BOARD_ROWS

        }

        inputEl.addEventListener("change", (e) => {
            // Don't unpause if paused.
            if (!run) {
                updateCellCount()
            } else {
                run = false;
                updateCellCount()
                run = true;
            }
        })

        inputEl.addEventListener("input", (e) => {
            cellCountEl.innerHTML = inputEl.value * inputEl.value;
        })
    }
}

function setupFpsInput() {
    fpsEl = document.getElementById("fpsInput")
    let fpsCountEl = document.getElementById("fpsCount")
    if (fpsEl) {
        console.log(fpsCountEl)
        FPS = fpsEl.value
        fpsEl.addEventListener("input", () => {
            FPS = fpsEl.value
            if (fpsCountEl) {
                fpsCountEl.innerHTML = fpsEl.value
            }
        })

    }
}


function setupThemeButton() {
    const btn = document.getElementById("themeToggler");
    if (btn) {
        btn.addEventListener("click", function () {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.body.classList.toggle("light-theme");
            } else {
                document.body.classList.toggle("dark-theme");
            }
            setCanvasColors()
        });
    }
}

function setupPauseButton() {
    const btn = document.getElementById('pause')
    btn?.addEventListener("click", () => {
        run = !run;
        if (run) {
            btn.innerHTML = "Pause"
        } else {
            btn.innerHTML = "Run"
        }
    })
}

function setupRestartButton() {
    const btn = document.getElementById('restart')
    const pauseBtn = document.getElementById('pause')
    btn?.addEventListener("click", () => {
        run = false;
        Game.initializeBoard(true);
        if (pauseBtn) {
            pauseBtn.innerHTML = "Pause"
        }
        run = true;
    })
}

function setupCanvas() {
    canvas = document.getElementById("canvas");
    if (canvas) {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }
}

function updateCanvas(board) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = FILL_COLOR;
    ctx.strokeStyle = FILL_COLOR;
    board.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            if (Game.getCellState(rowIndex, colIndex) === 1) {
                let x = colIndex * CANVAS_CELL_WIDTH;
                let y = rowIndex * CANVAS_CELL_HEIGHT;
                switch (SHAPE) {
                    case "arc":
                        ctx.beginPath();
                        ctx.arc(x, y, CANVAS_CELL_WIDTH / 2, 0, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    default:
                        ctx.fillRect(x, y, CANVAS_CELL_WIDTH, CANVAS_CELL_HEIGHT);
                }
            }
        })
    })
}

function draw() {
    const shapeEl = document.querySelector('input[name="shape"]:checked')

    if (shapeEl) {
        SHAPE = shapeEl.value;
    }
    if (run) {
        updateCanvas(Game.board)
        Game.getNextBoard()
    }

    setTimeout(() => {
        window.requestAnimationFrame(draw)
    }, 1000 / FPS)
}

function init() {
    Game.initializeBoard(true)
    setupCanvas();
    setupCellCountInput();
    setupFpsInput();
    setupThemeButton();
    setupPauseButton();
    setupRestartButton();
    setCanvasColors()
}

window.addEventListener("DOMContentLoaded", function () {
    init()
    draw()
})
