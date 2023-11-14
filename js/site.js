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

const logo = `
<svg viewBox="0 0 201 33" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path class="text" d="M11.122 31.456C10.362 31.456 9.66533 31.3673 9.032 31.19C8.424 31.038 7.87933 30.8353 7.398 30.582C6.942 30.3033 6.54933 30.012 6.22 29.708C5.916 29.3787 5.688 29.0747 5.536 28.796H5.384V31H0.976V23.248H5.384V24.882C5.384 26.25 5.86533 27.2253 6.828 27.808C7.79067 28.3653 9.108 28.644 10.78 28.644C12.528 28.644 13.82 28.2893 14.656 27.58C15.5173 26.8707 15.948 25.946 15.948 24.806C15.948 24.2487 15.872 23.7673 15.72 23.362C15.5933 22.9567 15.3653 22.6147 15.036 22.336C14.7067 22.032 14.2633 21.7787 13.706 21.576C13.1487 21.348 12.452 21.1453 11.616 20.968L9.906 20.588C8.614 20.3347 7.42333 19.9927 6.334 19.562C5.27 19.106 4.358 18.5233 3.598 17.814C2.838 17.1047 2.24267 16.256 1.812 15.268C1.40667 14.28 1.204 13.1147 1.204 11.772C1.204 10.632 1.40667 9.59333 1.812 8.656C2.21733 7.69333 2.8 6.87 3.56 6.186C4.32 5.502 5.25733 4.97 6.372 4.59C7.512 4.21 8.804 4.02 10.248 4.02C11.0333 4.02 11.73 4.10867 12.338 4.286C12.9713 4.438 13.516 4.64067 13.972 4.894C14.4533 5.14733 14.846 5.43867 15.15 5.768C15.454 6.072 15.682 6.36333 15.834 6.642H15.986V4.476H20.394V12.228H15.986V10.556C15.986 9.21333 15.5173 8.26333 14.58 7.706C13.6427 7.12333 12.4267 6.832 10.932 6.832C9.20933 6.832 7.94267 7.19933 7.132 7.934C6.34667 8.64333 5.954 9.50466 5.954 10.518C5.954 11.1007 6.04267 11.5947 6.22 12C6.39733 12.4053 6.676 12.76 7.056 13.064C7.46133 13.368 7.98067 13.634 8.614 13.862C9.24733 14.0647 10.02 14.2673 10.932 14.47L12.528 14.774C13.8453 15.0527 15.0233 15.42 16.062 15.876C17.126 16.3067 18.0127 16.864 18.722 17.548C19.4567 18.232 20.014 19.0427 20.394 19.98C20.774 20.892 20.964 21.956 20.964 23.172C20.964 24.3627 20.736 25.4647 20.28 26.478C19.824 27.4913 19.1653 28.3653 18.304 29.1C17.468 29.8347 16.442 30.4173 15.226 30.848C14.01 31.2533 12.642 31.456 11.122 31.456ZM22.6883 28.492H24.5883L32.8343 4.476H38.0783L46.3243 28.492H48.2243V31H37.0903V28.492H40.1303L38.3063 22.906H29.6423L27.8183 28.492H30.8583V31H22.6883V28.492ZM30.4023 20.284H37.6223L34.0503 9.112H33.8983L30.4023 20.284ZM50.2846 28.492H52.9446V6.984H50.2846V4.476H60.5446L71.4126 23.362H71.6406V6.984H68.9806V4.476H77.2266V6.984H74.6046V31H69.0566L56.1366 8.922H55.9086V28.492H58.5686V31H50.2846V28.492ZM80.3432 28.492H83.0032V6.984H80.3432V4.476H92.7312C94.5552 4.476 96.2398 4.78 97.7852 5.388C99.3558 5.97067 100.711 6.832 101.851 7.972C102.991 9.08667 103.878 10.4673 104.511 12.114C105.17 13.7607 105.499 15.6353 105.499 17.738C105.499 19.8407 105.17 21.7153 104.511 23.362C103.878 25.0087 102.991 26.402 101.851 27.542C100.711 28.6567 99.3558 29.518 97.7852 30.126C96.2398 30.7087 94.5552 31 92.7312 31H80.3432V28.492ZM89.1592 28.264H91.6292C92.8958 28.264 93.9725 28.1373 94.8592 27.884C95.7712 27.6307 96.5058 27.238 97.0632 26.706C97.6458 26.1487 98.0638 25.4267 98.3172 24.54C98.5958 23.628 98.7352 22.526 98.7352 21.234V14.242C98.7352 12.95 98.5958 11.8607 98.3172 10.974C98.0638 10.062 97.6458 9.34 97.0632 8.808C96.5058 8.25067 95.7712 7.84533 94.8592 7.592C93.9725 7.33866 92.8958 7.212 91.6292 7.212H89.1592V28.264ZM106.852 28.492H108.752L116.998 4.476H122.242L130.488 28.492H132.388V31H121.254V28.492H124.294L122.47 22.906H113.806L111.982 28.492H115.022V31H106.852V28.492ZM114.566 20.284H121.786L118.214 9.112H118.062L114.566 20.284ZM145.534 31.456C143.634 31.456 141.95 31.114 140.48 30.43C139.036 29.7207 137.808 28.758 136.794 27.542C135.781 26.3007 135.008 24.844 134.476 23.172C133.97 21.5 133.716 19.7013 133.716 17.776C133.716 15.5467 134.02 13.5707 134.628 11.848C135.262 10.1253 136.098 8.694 137.136 7.554C138.175 6.38866 139.378 5.51466 140.746 4.932C142.14 4.324 143.584 4.02 145.078 4.02C145.889 4.02 146.598 4.10867 147.206 4.286C147.84 4.438 148.384 4.64067 148.84 4.894C149.296 5.14733 149.676 5.43867 149.98 5.768C150.284 6.072 150.512 6.376 150.664 6.68H150.892V4.476H155.3V12.912H150.892V11.202C150.892 9.91 150.462 8.87133 149.6 8.086C148.764 7.30067 147.536 6.908 145.914 6.908C144.217 6.908 142.887 7.44 141.924 8.504C140.962 9.568 140.48 11.24 140.48 13.52V21.234C140.48 22.4247 140.632 23.438 140.936 24.274C141.24 25.11 141.658 25.8067 142.19 26.364C142.748 26.9213 143.394 27.3267 144.128 27.58C144.888 27.8333 145.712 27.96 146.598 27.96C148.22 27.96 149.588 27.542 150.702 26.706C151.842 25.8447 152.704 24.692 153.286 23.248L155.452 24.502C155.123 25.4647 154.654 26.3767 154.046 27.238C153.438 28.074 152.704 28.8087 151.842 29.442C151.006 30.0753 150.056 30.5693 148.992 30.924C147.928 31.2787 146.776 31.456 145.534 31.456ZM158.57 28.492H161.23V6.984H158.57V4.476H170.046V6.984H167.386V15.99H177.494V6.984H174.834V4.476H186.31V6.984H183.65V28.492H186.31V31H174.834V28.492H177.494V18.726H167.386V28.492H170.046V31H158.57V28.492ZM189.408 28.492H192.068V6.984H189.408V4.476H200.884V6.984H198.224V28.492H200.884V31H189.408V28.492Z" fill="#464555"/>
</svg>
`;

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
    }),
    $c("a", {
        id: "logo-link",
        href: "/",
        "aria-label": "Go to startpage",
        innerHTML: logo,
    }),
    $c("button", {
        type: "button",
        id: "theme-button",
        "aria-label": "Toggle theme",
    }),
]);

$a(menu, [
    $c("nav", { id: "menu-items" }, [
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
    const mainEl = document.querySelector("main");
    const menu = document.getElementById("menu");

    btn.addEventListener("click", () => {
        menu.classList.toggle("menu-open");
        mainEl.classList.toggle("menu-open");
        btn.setAttribute(
            "aria-label",
            menu.classList.contains("menu-open") ? "Close menu" : "Open menu"
        );
        btn.innerHTML = menu.classList.contains("menu-open") ? xIcon : menuIcon;
    });
})();
