// @ts-check
export class Gol {
  constructor(cells) {
    this.BOARD_COLS = cells;
    this.BOARD_ROWS = cells;
    this.board = [];
    this.initializeBoard();
  }

  setCellCount(count, randomize = true) {
    this.BOARD_COLS = count;
    this.BOARD_ROWS = count;
    this.initializeBoard(randomize);
  }

  initializeBoard(randomized = true) {
    let tempBoard = [];
    for (let r = 0; r < this.BOARD_COLS; r++) {
      let rowArr = [];
      for (let c = 0; c < this.BOARD_ROWS; c++) {
        rowArr.push(randomized ? Math.floor(Math.random() * 2) : 0);
      }
      tempBoard.push(rowArr);
    }

    this.board = tempBoard;
  }

  getCellState(rowIndex, colIndex) {
    if (rowIndex < 0) {
      return 0;
    }
    if (rowIndex > this.board.length - 1) {
      return 0;
    }

    let cell = this.board[rowIndex][colIndex];

    if (cell === undefined) {
      return 0;
    }

    return cell;
  }

  getNeighbourCount(rowIndex, colIndex) {
    let count =
      this.getCellState(rowIndex - 1, colIndex - 1) +
      this.getCellState(rowIndex - 1, colIndex) +
      this.getCellState(rowIndex - 1, colIndex + 1) +
      this.getCellState(rowIndex, colIndex - 1) +
      this.getCellState(rowIndex, colIndex + 1) +
      this.getCellState(rowIndex + 1, colIndex - 1) +
      this.getCellState(rowIndex + 1, colIndex) +
      this.getCellState(rowIndex + 1, colIndex + 1);

    return count;
  }

  createNewCell(cell, rowIndex, colIndex) {
    let neighbourCount = this.getNeighbourCount(rowIndex, colIndex);
    if (cell === 1) {
      if (neighbourCount < 2 || neighbourCount > 3) {
        return 0;
      }
    } else if (cell == 0 && neighbourCount == 3) {
      return 1;
    }

    return cell;
  }

  getNextBoard() {
    let newBoard = [];
    this.board.forEach((row, rowIndex) => {
      let newRow = [];
      row.forEach((cell, colIndex) => {
        newRow.push(this.createNewCell(cell, rowIndex, colIndex));
      });
      newBoard.push(newRow);
    });
    this.board = newBoard;
  }
}
