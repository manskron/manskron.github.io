export function drawCanvas(board) {
    const ctx = app.canvas.canvasEl.getContext("2d");
    let bodyEl = document.querySelector("body");

    if (bodyEl) {
        let bodyStyles = window.getComputedStyle(bodyEl);
        let bg = bodyStyles.getPropertyValue("background-color");
        let fill = bodyStyles.getPropertyValue("color");

        app.canvas.BG_COLOR = bg;
        app.canvas.FILL_COLOR = fill;
    }

    ctx.fillStyle = app.canvas.BG_COLOR;
    ctx.fillRect(
        0,
        0,
        app.canvas.canvasEl.offsetWidth,
        app.canvas.canvasEl.offsetHeight
    );

    ctx.fillStyle = app.canvas.FILL_COLOR;
    board.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            if (app.sim.getCell(rowIndex, colIndex) === 1) {
                let x = colIndex * app.canvas.CELL_WIDTH;
                let y = rowIndex * app.canvas.CELL_HEIGHT;
                ctx.fillRect(
                    x,
                    y,
                    app.canvas.CELL_WIDTH,
                    app.canvas.CELL_HEIGHT
                );
            }
        });
    });
}

export const canvasResizeObserver = new ResizeObserver(() => {
    clearTimeout(window.resizedFinished);
    app.run = false;
    window.resizedFinished = setTimeout(() => {
        app.canvas.CELL_WIDTH =
            app.canvas.canvasEl.offsetWidth / app.sim.BOARD_COLS;
        app.canvas.CELL_HEIGHT =
            app.canvas.canvasEl.offsetHeight / app.sim.BOARD_ROWS;
        app.canvas.canvasEl.width = app.canvas.canvasEl.offsetWidth;
        app.canvas.canvasEl.height = app.canvas.canvasEl.offsetWidth;
        app.run = true;
    }, 50);
});

export function initCanvas() {
    app.canvas.BG_COLOR = "#eeeeee";
    app.canvas.FILL_COLOR = "#202020";
    app.canvas.canvasEl = document.getElementById("canvas");
}
