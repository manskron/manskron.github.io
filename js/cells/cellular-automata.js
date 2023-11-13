import { GameOfLife } from "./Sim.js";

class CellularAutomata extends HTMLElement {
    static tagName = "cellular-automata";

    //     static style = `
    // `;
    //

    connectedCallback() {
        if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
            return;
        }

        let shadowroot = this.attachShadow({ mode: "open" });

        // let sheet = new CSSStyleSheet();
        // sheet.replaceSync(CellularAutomata.style);
        // shadowroot.adoptedStyleSheets = [sheet];

        let template = document.createElement("template");

        template.innerHTML = `<div>
                <div id="gol-container">
                    <div id="controls">
                        <button id="pause" type="button">⏸</button>
                        <button id="restart" type="button">Restart</button>
                        <div class="controlGroup">
                            <label for="fpsInput"
                                >FPS (<span id="fpsCount">60</span>)</label
                            >
                            <div>
                                <input
                                    id="fpsInput"
                                    type="range"
                                    min="0"
                                    max="120"
                                    value="15"
                                />
                            </div>
                        </div>
                        <div class="controlGroup">
                            <label for="cellCountInput"
                                >Resolution (<span id="cellCount">90000</span
                                >)</label
                            >
                            <div>
                                <input
                                    id="cellCountInput"
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
        let sim = new GameOfLife(100);

        let tickLength = 1000 / 20;
        let run = true;
        let stopMain;

        let CELL_WIDTH = canvas.offsetWidth / sim.BOARD_COLS;
        let CELL_HEIGHT = canvas.offsetHeight / sim.BOARD_ROWS;

        function drawCanvas() {
            const ctx = canvas.getContext("2d");

            let BG_COLOR = "#000";
            let FILL_COLOR = "#fff";

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

        let lastTick = performance.now();

        canvasResizeObserver.observe(canvas);
        main(performance.now());
    }
}

if ("customElements" in window) {
    customElements.define(CellularAutomata.tagName, CellularAutomata);
}
