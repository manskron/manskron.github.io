import { GameOfLife } from "./game_of_life/index.js";

// @ts-check
function setupThemeButton() {
  const btn = document.getElementById("themeToggler");
  if (btn) {
    btn.addEventListener("click", function () {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.toggle("light-theme");
      } else {
        document.body.classList.toggle("dark-theme");
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  setupThemeButton();
  GameOfLife();
});
