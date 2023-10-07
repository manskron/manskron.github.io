// @ts-check

const BOARD_COLS = 100;
const BOARD_ROWS = BOARD_COLS;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
const CELL_WIDTH = GAME_WIDTH / BOARD_COLS;
const CELL_HEIGHT = GAME_HEIGHT / BOARD_ROWS;
let canvas, timeoutEl;
let run = true;
let BG_COLOR = "#eeeeee";
let FILL_COLOR = "#202020";
//
// const colors = ["red", "white", "blue", "yello", 'green']


// function setRandomFillStyle(ctx) {
//     let color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.fillStyle = color;
// }


function buildInitialBoard() {
    let initialBoard = [];
    for (let r = 0; r < BOARD_COLS; r++) {
        let rowArr = [];
        for (let c = 0; c < BOARD_ROWS; c++) {
            rowArr.push(Math.floor(Math.random() * 2));
        }
        initialBoard.push(rowArr);
    }

    return initialBoard;
}

// function writeBoardToDOM(board) {
//     if (gameEl) {
//         gameEl.innerHTML = ''
//         board.forEach(row => {
//             let rowEl = document.createElement("div");
//             rowEl.append(row.map(el => el === 0 ? " " : "■").join(" "))
//             gameEl.append(rowEl)
//         })
//     }
// }

function updateCanvas(board) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = FILL_COLOR;
    board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (getCellState(rowIndex, colIndex) === 1) {
                let x = colIndex * CELL_WIDTH;
                let y = rowIndex * CELL_HEIGHT;
                ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
            }
        })
    })
}

function getCellState(rowIndex, colIndex) {
    if (rowIndex < 0) {
        return 0;
    }
    if (rowIndex > (board.length - 1)) {
        return 0;
    }

    let cell = board[rowIndex][colIndex]

    if (cell === undefined) {
        return 0;
    }

    return cell;
}


function getNeighbourCount(rowIndex, colIndex) {
    let count =
        getCellState(rowIndex - 1, colIndex - 1)
        + getCellState(rowIndex - 1, colIndex)
        + getCellState(rowIndex - 1, colIndex + 1)
        + getCellState(rowIndex, colIndex - 1)
        + getCellState(rowIndex, colIndex + 1)
        + getCellState(rowIndex + 1, colIndex - 1)
        + getCellState(rowIndex + 1, colIndex)
        + getCellState(rowIndex + 1, colIndex + 1);

    return count;
}

function createNewCell(cell, rowIndex, colIndex) {
    let neighbourCount = getNeighbourCount(rowIndex, colIndex)
    if (cell === 1) {
        if (neighbourCount < 2 || neighbourCount > 3) {
            return 0;
        }
    } else if (cell == 0 && neighbourCount == 3) {
        return 1;
    }

    return cell;
}


function getNextBoard() {
    let newBoard = [];
    board.forEach((row, rowIndex) => {
        let newRow = []
        row.forEach((cell, colIndex) => {
            newRow.push(createNewCell(cell, rowIndex, colIndex))
        })
        newBoard.push(newRow)
    })


    board = newBoard;
}

function draw() {
    const time = timeoutEl ? timeoutEl.valueAsNumber : 0
    if (run) {
        updateCanvas(board)
        getNextBoard()
    }

    setTimeout(() => {
        window.requestAnimationFrame(draw)
    }, time)
}



let board = buildInitialBoard()

function setColors() {

    let bodyStyles = window.getComputedStyle(document.querySelector("body"))
    let bg = bodyStyles.getPropertyValue('background-color')
    let fill = bodyStyles.getPropertyValue('color')
    BG_COLOR = bg;
    FILL_COLOR = fill
}

function init() {

    canvas = document.getElementById("canvas");
    timeoutEl = document.getElementById("timeout")
    canvas?.addEventListener("click", () => {
        run = !run;
    })
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    if (!canvas || !timeoutEl) {
        throw Error("Some DOM element(s) not found.")
    }

    setColors()
}

window.addEventListener("DOMContentLoaded", function () {
    init()
    draw()
})
