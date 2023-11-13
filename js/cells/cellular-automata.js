export class GameOfLife {
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

    getCell(rowIndex, colIndex) {
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
            this.getCell(rowIndex - 1, colIndex - 1) +
            this.getCell(rowIndex - 1, colIndex) +
            this.getCell(rowIndex - 1, colIndex + 1) +
            this.getCell(rowIndex, colIndex - 1) +
            this.getCell(rowIndex, colIndex + 1) +
            this.getCell(rowIndex + 1, colIndex - 1) +
            this.getCell(rowIndex + 1, colIndex) +
            this.getCell(rowIndex + 1, colIndex + 1);

        return count;
    }

    getNextCellState(cell, rowIndex, colIndex) {
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
                newRow.push(this.getNextCellState(cell, rowIndex, colIndex));
            });
            newBoard.push(newRow);
        });
        this.board = newBoard;
    }
}

class CellularAutomata extends HTMLElement {
    static tagName = "cellular-automata";

    static style = `
:host {
    width: 100%;
}

#container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

#controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.controlGroup {
    font-size: 14px;
}

#pause-button {
    width: 28px;
    height: 28px;
}
    `;

    connectedCallback() {
        if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
            return;
        }

        let shadowroot = this.attachShadow({ mode: "open" });

        let sheet = new CSSStyleSheet();
        sheet.replaceSync(CellularAutomata.style);
        shadowroot.adoptedStyleSheets = [sheet];

        let template = document.createElement("template");

        template.innerHTML = `
                <div id="container">
                    <div id="controls">
                        <button id="pause-button" type="button">⏸</button>
                        <button id="restart-button" type="button">Restart</button>
                        <div class="controlGroup">
                            <label for="fps-input"
                                >FPS (<span id="fps-display">30</span>)</label
                            >
                            <div>
                                <input
                                    id="fps-input"
                                    type="range"
                                    min="0"
                                    max="120"
                                    value="30"
                                />
                            </div>
                        </div>
                        <div class="controlGroup">
                            <label for="cell-count-input"
                                >Resolution (<span id="cell-count-display">90000</span
                                >)</label
                            >
                            <div>
                                <input
                                    id="cell-count-input"
                                    type="range"
                                    min="10"
                                    max="400"
                                    value="100"
                                />
                            </div>
                        </div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>`;

        shadowroot.appendChild(template.content.cloneNode(true));

        let canvas = this.shadowRoot.getElementById("canvas");
        let cellCountInput = this.shadowRoot.getElementById("cell-count-input");
        let cellCountDisplay =
            this.shadowRoot.getElementById("cell-count-display");
        let fpsInput = this.shadowRoot.getElementById("fps-input");
        let fpsDisplay = this.shadowRoot.getElementById("fps-display");
        let pauseButton = this.shadowRoot.getElementById("pause-button");
        let restartButton = this.shadowRoot.getElementById("restart-button");

        let sim = new GameOfLife(100);

        let tickLength = 1000 / 30;

        function setFps(fps) {
            tickLength = 1000 / parseInt(fps);
        }

        let run = true;
        let stopMain, lastTick;

        let CELL_WIDTH = canvas.offsetWidth / sim.BOARD_COLS;
        let CELL_HEIGHT = canvas.offsetHeight / sim.BOARD_ROWS;

        (function setupPauseButton() {
            function handleClickPause(e) {
                run = !run;
                if (run) {
                    e.target.innerHTML = "⏸";
                } else {
                    e.target.innerHTML = "▶";
                }
            }

            pauseButton.addEventListener("click", handleClickPause);
        })();

        (function setupRestartButton() {
            function handleClickRestart() {
                run = false;
                sim.initializeBoard(true);
                pauseButton.innerHTML = "⏸";
                run = true;
            }

            restartButton.addEventListener("click", handleClickRestart);
        })();

        (function setupCellCountInput() {
            function updateCellCount(cellCount) {
                sim.setCellCount(cellCount);
                CELL_WIDTH = canvas.offsetWidth / sim.BOARD_COLS;
                CELL_HEIGHT = canvas.offsetHeight / sim.BOARD_ROWS;
            }

            function handleChangeCellCount(e) {
                if (!run) {
                    updateCellCount(e.target.value);
                } else {
                    run = false;
                    updateCellCount(e.target.value);
                    run = true;
                }
            }

            function handleInputCellCount(e) {
                let col = e.target.value;
                cellCountDisplay.innerHTML = col * col;
            }

            cellCountDisplay.innerHTML =
                cellCountInput.value * cellCountInput.value;

            cellCountInput.addEventListener("change", handleChangeCellCount);
            cellCountInput.addEventListener("input", handleInputCellCount);
        })();

        (function setupFpsInput() {
            function handleInputFps(e) {
                setFps(e.target.value);
                fpsDisplay.innerHTML = e.target.value;
            }

            setFps(fpsInput.value);
            fpsInput.addEventListener("input", handleInputFps);
        })();

        function drawCanvas() {
            const ctx = canvas.getContext("2d");

            let bodyStyles = window.getComputedStyle(
                document.querySelector("body")
            );

            let FILL_COLOR = bodyStyles.getPropertyValue("background-color");
            let BG_COLOR = bodyStyles.getPropertyValue("color");

            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            ctx.fillStyle = FILL_COLOR;

            sim.board.forEach((row, rowIndex) => {
                row.forEach((_, colIndex) => {
                    if (sim.getCell(rowIndex, colIndex) === 1) {
                        let x = colIndex * CELL_WIDTH;
                        let y = rowIndex * CELL_HEIGHT;
                        ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                    }
                });
            });
        }

        const canvasResizeObserver = new ResizeObserver(() => {
            clearTimeout(window.resizedFinished);
            run = false;
            window.resizedFinished = setTimeout(() => {
                CELL_WIDTH = canvas.offsetWidth / sim.BOARD_COLS;
                CELL_HEIGHT = canvas.offsetHeight / sim.BOARD_ROWS;
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetWidth;
                run = true;
            }, 50);
        });

        function main(tFrame) {
            stopMain = window.requestAnimationFrame(main);
            const nextTick = lastTick + tickLength;

            if (run && tickLength > 0) {
                if (tFrame >= nextTick) {
                    lastTick = tFrame;
                    sim.getNextBoard();
                    drawCanvas();
                }
            }
        }

        lastTick = performance.now();
        canvasResizeObserver.observe(canvas);
        main(performance.now());
    }
}

if ("customElements" in window) {
    customElements.define(CellularAutomata.tagName, CellularAutomata);
}
