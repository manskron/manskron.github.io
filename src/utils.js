export function $c(tagName, attributes, children) {
    const el = document.createElement(tagName);

    if (attributes !== undefined) {
        for (const [attribute, value] of Object.entries(attributes)) {
            if (attribute === "textContent") {
                el.textContent = value;
            } else if (attribute === "innerHTML") {
                el.innerHTML = value;
            } else {
                el.setAttribute(attribute, value);
            }
        }
    }

    if (children !== undefined) {
        children.map((c) => {
            el.appendChild(c);
        });
    }

    return el;
}

export function $a(el, children) {
    children.map((child) => {
        el.appendChild(child);
    });
}

export function setupThemeButton() {
    const btn = document.getElementById("themeToggler");
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

export function setupNav() {
    document
        .querySelector("nav")
        .querySelectorAll("a")
        .forEach((el) => {
            if (el.href == window.location.href) {
                el.classList.add("active");
            }
        });
}
