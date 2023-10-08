// @ts-check
// 
import { GameOfLife } from "./Gol.js";


let GAME_WIDTH = Math.min(window.innerHeight - 350, window.innerWidth);
let GAME_HEIGHT = GAME_WIDTH;

let BOARD_COLS = 100;
let BOARD_ROWS = BOARD_COLS;
let CELL_WIDTH = GAME_WIDTH / BOARD_COLS;
let CELL_HEIGHT = GAME_HEIGHT / BOARD_ROWS;

let canvas, timeoutEl, board;
let run = true;
let BG_COLOR = "#eeeeee";
let FILL_COLOR = "#202020";
let SHAPE = "rect"

const Game = new GameOfLife(BOARD_COLS);
board = Game.board;

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
            BOARD_COLS = inputEl.valueAsNumber;
            BOARD_ROWS = inputEl.valueAsNumber;
            CELL_WIDTH = GAME_WIDTH / BOARD_COLS;
            CELL_HEIGHT = GAME_HEIGHT / BOARD_ROWS;
            cellCountEl.innerHTML = BOARD_COLS * BOARD_ROWS
            Game.initializeBoard(true);
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
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
    }
}

function updateCanvas(board) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = FILL_COLOR;
    ctx.strokeStyle = FILL_COLOR;
    board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (Game.getCellState(rowIndex, colIndex) === 1) {
                let x = colIndex * CELL_WIDTH;
                let y = rowIndex * CELL_HEIGHT;
                switch (SHAPE) {
                    case "arc":
                        ctx.beginPath();
                        ctx.arc(x, y, CELL_WIDTH / 2, 0, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    default:
                        ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                }
            }
        })
    })
}

function draw() {
    const time = timeoutEl ? timeoutEl.valueAsNumber : 0
    const shapeEl = document.querySelector('input[name="shape"]:checked')
    if (shapeEl) {
        SHAPE = shapeEl.value;
    }
    if (run) {
        updateCanvas(board)
        Game.getNextBoard()
    }

    setTimeout(() => {
        window.requestAnimationFrame(draw)
    }, time)
}

function init() {
    timeoutEl = document.getElementById("timeout")
    Game.initializeBoard(true)
    setupCanvas();
    setupCellCountInput();
    setupThemeButton();
    setupPauseButton();
    setupRestartButton();
    setCanvasColors()
}

window.addEventListener("DOMContentLoaded", function () {
    init()
    draw()
})
