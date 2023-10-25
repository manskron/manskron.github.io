function setupThemeButton() {
    const btn = document.getElementById("themeToggler");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
        btn.textContent = "light";
    } else if (currentTheme == "light") {
        document.body.classList.toggle("light-theme");
        btn.textContent = "dark";
    }

    btn.addEventListener("click", function () {
        if (btn.innerText === "light") {
            btn.innerText = "dark";
        } else {
            btn.innerText = "light";
        }

        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("light-theme");
            var theme = document.body.classList.contains("light-theme")
                ? "light"
                : "dark";
        } else {
            document.body.classList.toggle("dark-theme");
            var theme = document.body.classList.contains("dark-theme")
                ? "dark"
                : "light";
        }
        localStorage.setItem("theme", theme);
    });
}

function addNavLink(navEl, text, href) {
    const linkEl = document.createElement("a");
    linkEl.setAttribute("href", href);
    linkEl.innerText = `[${text}]`;
    navEl.appendChild(linkEl);
}

function setupNav() {
    const navEl = document.getElementById("nav");
    addNavLink(navEl, "Home", "/");
    addNavLink(navEl, "Cells", "/pages/cells.html");
    addNavLink(navEl, "Emacs config", "/pages/emacsconf.html");
}

setupThemeButton();
setupNav();
