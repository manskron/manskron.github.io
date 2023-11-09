export function constructDom() {
    const appEl = document.getElementById("cells");

    appEl.innerHTML = `
    <div id="golContainer" style="font-family: monospace; max-width: 600px">
        <canvas id="canvas" style="width: 100%"></canvas>
        <fieldset>
            <legend>State</legend>
            <button id="pause" type="button">Pause</button>
            <button id="restart" type="button">Restart</button>
        </fieldset>
        <fieldset>
            <legend>Tune</legend>
            <label for="fpsInput">FPS</label>
            <input id="fpsInput" type="range" min="0" max="120" value="15" />
            <span id="fpsCount">60</span>
            <br />
            <label for="cellCountInput">Resolution</label>
            <input
                id="cellCountInput"
                type="range"
                min="10"
                max="400"
                value="100"
            /><span id="cellCount">90000</span>
        </fieldset>
    </fieldset>
    `;
}
