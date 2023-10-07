// @ts-check

const SIZE = 300;

function buildInitialBoard() {
    let initialBoard = [];
    for (let r = 0; r < SIZE; r++) {
        let rowArr = [];
        for (let c = 0; c < SIZE; c++) {
            rowArr.push(Math.floor(Math.random() * 2));
        }
        initialBoard.push(rowArr);
    }

    return initialBoard;
}


const gameEl = document.getElementById("game");

const symbols = ["◉", "■"]

function writeBoardToDOM(board) {
    if (gameEl) {
        gameEl.innerHTML = ''
        board.forEach(row => {
            let rowEl = document.createElement("div");
            rowEl.append(row.map(el => el === 0 ? " " : "■").join(" "))
            gameEl.append(rowEl)
        })
    }
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
    writeBoardToDOM(board)
    getNextBoard()
    window.requestAnimationFrame(draw)
}


let board = buildInitialBoard()

window.addEventListener("DOMContentLoaded", function () {
    draw()
})
