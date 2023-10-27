function setupThemeButton(btn) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const darkText = "Dark";
    const lightText = "Light";

    const currentTheme = localStorage.getItem("theme");

    if (!currentTheme) {
        btn.textContent = document.body.classList.contains("light-theme")
            ? lightText
            : lightText;
    }

    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
        btn.textContent = lightText;
    } else if (currentTheme == "light") {
        document.body.classList.toggle("light-theme");
        btn.textContent = darkText;
    }

    btn.addEventListener("click", function () {
        if (btn.innerText == lightText) {
            btn.innerText = darkText;
        } else {
            btn.innerText = lightText;
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

function setupNav(navEl) {
    function addNavLink(navEl, text, href) {
        const linkEl = document.createElement("a");
        linkEl.setAttribute("href", href);
        linkEl.innerText = `${text}`;
        linkEl.style.alignSelf = "start";
        navEl.appendChild(linkEl);
    }

    addNavLink(navEl, "Home", "/");
    addNavLink(navEl, "Cells", "/pages/cells.html");
    addNavLink(navEl, "Emacs config", "/pages/emacsconf.html");

    const themeBtn = document.createElement("button");
    themeBtn.setAttribute("type", "button");
    themeBtn.setAttribute("id", "themeToggler");
    themeBtn.setAttribute("aria-label", "Toggle theme");
    navEl.appendChild(themeBtn);
    setupThemeButton(themeBtn);

    navEl.querySelectorAll("a").forEach((el) => {
        if (el.href == window.location.href) {
            el.classList.add("active");
        }
    });
}

function setupHeader() {
    const headingEl = document.createElement("a");
    headingEl.setAttribute("id", "heading");
    headingEl.setAttribute("href", "/");
    headingEl.innerHTML = `
        <span>måns</span>
        <span id="heading-line"></span>
        <span>computer</span>`;
    const navEl = document.createElement("nav");

    const headerEl = document.querySelector("header");
    headerEl.appendChild(headingEl);
    headerEl.appendChild(navEl);

    setupNav(navEl);
}

function setupFooter() {
    const footerEl = document.querySelector("footer");
    footerEl.innerHTML = `
    <div>
        <a href="mailto:safe.key1974@fastmail.com">Email</a>
        <a href="https://github.com/manskron">Github</a>
        <a href="https://www.linkedin.com/in/mansbrusback/">LinkedIn</a>
    </div>
    <div>
        <i style="font-size: 12px"
            >Mans Comupter Systems Enterprise Ltd Corps.</i
        >
    </div>
    `;
}

setupHeader();
setupFooter();
