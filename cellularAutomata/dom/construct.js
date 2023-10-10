//@ts-check
export function constructDom() {
  const appEl = document.getElementById("app");

  const golContainer = document.createElement("fieldset");
  golContainer.setAttribute("id", "golContainer2");
  appEl.append(golContainer);

  const title = document.createElement("legend");
  title.innerText = "Game of life";
  golContainer.append(title);

  const canvas = document.createElement("canvas");
  golContainer.append(canvas);

  const stateContainer = document.createElement("fieldset");
  golContainer.append(stateContainer);

  const stateLegend = document.createElement("legend");
  stateLegend.innerText = "State";
  stateContainer.append(stateLegend);

  const pauseBtn = document.createElement("button");
  pauseBtn.setAttribute("id", "pause");
  pauseBtn.setAttribute("type", "button");
  pauseBtn.innerText = "Pause";
  stateContainer.append(pauseBtn);

  const restartBtn = document.createElement("button");
  restartBtn.setAttribute("id", "restart");
  restartBtn.setAttribute("type", "button");
  restartBtn.innerText = "Restart";
  stateContainer.append(restartBtn);

  const tuneContainer = document.createElement("fieldset");
  golContainer.append(tuneContainer);

  const tuneLegend = document.createElement("legend");
  tuneLegend.textContent = "Tune";
  tuneContainer.append(tuneLegend);

  const fpsLabel = document.createElement("label");
  fpsLabel.setAttribute("for", "fpsInput");
  fpsLabel.innerText = "FPS";
  tuneContainer.append(fpsLabel);

  const fpsInput = document.createElement("input");
  fpsInput.setAttribute("id", "fpsInput");
  fpsInput.setAttribute("type", "range");
  fpsInput.setAttribute("min", "0");
  fpsInput.setAttribute("max", "120");
  fpsInput.setAttribute("value", "60");
  tuneContainer.append(fpsInput);

  const fpsDisplay = document.createElement("span");
  fpsDisplay.setAttribute("id", "fpsCount");
  fpsDisplay.innerText = "60";
  fpsInput.append(fpsDisplay);

  const br = document.createElement("br");
  tuneContainer.append(br);

  const cellCountLabel = document.createElement("label");
  cellCountLabel.setAttribute("for", "cellCountInput");
  cellCountLabel.innerText = "Resolution";
  tuneContainer.append(cellCountLabel);

  const cellCountInput = document.createElement("input");
  cellCountInput.setAttribute("id", "cellCountInput");
  cellCountInput.setAttribute("type", "range");
  cellCountInput.setAttribute("min", "10");
  cellCountInput.setAttribute("max", "400");
  cellCountInput.setAttribute("value", "300");
  tuneContainer.append(cellCountInput);

  const cellCountDisplay = document.createElement("span");
  fpsDisplay.setAttribute("id", "cellCount");
  fpsDisplay.innerText = "300";
  cellCountInput.append(cellCountDisplay);
}
