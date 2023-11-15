export function $c(tagName, attributes, children) {
    const el = document.createElement(tagName);

    if (attributes !== undefined) {
        for (const [attribute, value] of Object.entries(attributes)) {
            if (attribute === "textContent") {
                el.textContent = value;
            } else if (attribute === "innerHTML") {
                el.innerHTML = value;
            } else if (attribute === "classList") {
                value.forEach((className) => {
                    el.classList.add(className);
                });
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

const header = document.querySelector("header");
const menu = document.querySelector("#menu");

const urls = {
    email: "mailto:safe.key1974@fastmail.com",
    github: "https://github.com/manskron",
    linkedin: "https://www.linkedin.com/in/mansbrusback/",
};

const pages = {
    home: "/",
    cells: "/pages/cells.html",
    emacsConf: "/pages/emacsconf.html",
};

const menuIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="#f00000" viewBox="0 0 256 256"><path d="M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM40,70H216a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12ZM216,186H40a6,6,0,0,0,0,12H216a6,6,0,0,0,0-12Z"></path></svg>
`;

const xIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#f00000"
            viewBox="0 0 256 256"
        >
            <path
                d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"
            ></path>
        </svg>
`;

const lightIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#f00000" viewBox="0 0 256 256"><path d="M122,40V16a6,6,0,0,1,12,0V40a6,6,0,0,1-12,0Zm68,88a62,62,0,1,1-62-62A62.07,62.07,0,0,1,190,128Zm-12,0a50,50,0,1,0-50,50A50.06,50.06,0,0,0,178,128ZM59.76,68.24a6,6,0,1,0,8.48-8.48l-16-16a6,6,0,0,0-8.48,8.48Zm0,119.52-16,16a6,6,0,1,0,8.48,8.48l16-16a6,6,0,1,0-8.48-8.48ZM192,70a6,6,0,0,0,4.24-1.76l16-16a6,6,0,0,0-8.48-8.48l-16,16A6,6,0,0,0,192,70Zm4.24,117.76a6,6,0,0,0-8.48,8.48l16,16a6,6,0,0,0,8.48-8.48ZM46,128a6,6,0,0,0-6-6H16a6,6,0,0,0,0,12H40A6,6,0,0,0,46,128Zm82,82a6,6,0,0,0-6,6v24a6,6,0,0,0,12,0V216A6,6,0,0,0,128,210Zm112-88H216a6,6,0,0,0,0,12h24a6,6,0,0,0,0-12Z"></path></svg>
`;

const darkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#f00000" viewBox="0 0 256 256"><path d="M232.13,143.64a6,6,0,0,0-6-1.49A90.07,90.07,0,0,1,113.86,29.85a6,6,0,0,0-7.49-7.48A102.88,102.88,0,0,0,54.48,58.68,102,102,0,0,0,197.32,201.52a102.88,102.88,0,0,0,36.31-51.89A6,6,0,0,0,232.13,143.64Zm-42,48.29a90,90,0,0,1-126-126A90.9,90.9,0,0,1,99.65,37.66,102.06,102.06,0,0,0,218.34,156.35,90.9,90.9,0,0,1,190.1,191.93Z"></path></svg>
`;

$a(header, [
    $c("button", {
        innerHTML: menuIcon,
        id: "menu-button",
        "aria-label": "Open menu",
        classList: ["header-button"],
    }),
    $c("a", {
        id: "logo-link",
        href: "/",
        "aria-label": "Go to startpage",
        innerHTML: "mans.computer",
    }),
    $c("button", {
        type: "button",
        id: "theme-button",
        "aria-label": "Toggle theme",
        classList: ["header-button"],
    }),
]);

$a(menu, [
    $c("nav", { classList: ["menu-items"] }, [
        $c("a", {
            href: "/",
            textContent: "Home",
            classList: ["menu-item"],
        }),
        $c("a", {
            href: "/pages/cells",
            textContent: "Cells",
            classList: ["menu-item"],
        }),
        $c("a", {
            href: "/pages/emacsconf",
            textContent: "Emacs config",
            classList: ["menu-item"],
        }),
        $c(
            "div",
            {
                classList: ["sub-menu-items"],
            },
            [
                $c("a", {
                    href: urls.github,
                    textContent: "Github",
                    classList: ["sub-menu-item"],
                }),
                $c("a", {
                    href: urls.linkedin,
                    textContent: "LinkedIn",
                    classList: ["sub-menu-item"],
                }),
                $c("a", {
                    href: urls.email,
                    textContent: "Email",
                    classList: ["sub-menu-item"],
                }),
            ]
        ),
    ]),
]);

(function setupThemeButton() {
    const btn = document.getElementById("theme-button");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const currentTheme = localStorage.getItem("theme");

    if (!currentTheme) {
        btn.innerHTML = document.body.classList.contains("light-theme")
            ? lightIcon
            : lightIcon;
    }

    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
        btn.innerHTML = lightIcon;
    } else if (currentTheme == "light") {
        document.body.classList.toggle("light-theme");
        btn.innerHTML = darkIcon;
    }

    if (btn) {
        btn.addEventListener("click", function () {
            if (btn.innerHTML == lightIcon) {
                btn.innerHTML = darkIcon;
            } else {
                btn.innerHTML = lightIcon;
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
})();

(function setupMenuButton() {
    const btn = document.getElementById("menu-button");
    const body = document.querySelector("body");
    const menu = document.getElementById("menu");

    btn.addEventListener("click", () => {
        menu.classList.toggle("menu-open");
        body.classList.toggle("menu-open");
        btn.setAttribute(
            "aria-label",
            menu.classList.contains("menu-open") ? "Close menu" : "Open menu"
        );
        btn.innerHTML = menu.classList.contains("menu-open") ? xIcon : menuIcon;
    });
})();
