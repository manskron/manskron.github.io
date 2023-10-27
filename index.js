//@ts-check
import { $a, $c, setupNav, setupThemeButton } from "./src/utils.js";

const header = document.querySelector("header");
const footer = document.querySelector("footer");

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

$a(header, [
    $c("a", { id: "heading", href: "/" }, [
        $c("span", { textContent: "måns" }),
        $c("span", { id: "heading-line" }),
        $c("span", { textContent: "computer" }),
    ]),
    $c("nav", undefined, [
        $c("a", { href: pages.home, textContent: "Home" }),
        $c("a", { href: pages.cells, textContent: "Cells" }),
        $c("a", { href: pages.emacsConf, textContent: "Emacs config" }),
        $c("button", {
            type: "button",
            id: "themeToggler",
            "aria-label": "Toggle theme",
        }),
    ]),
]);

$a(footer, [
    $c("div", { id: "footer-links" }, [
        $c("a", { href: urls.email, textContent: "Email" }),
        $c("a", { href: urls.github, textContent: "Github" }),
        $c("a", { href: urls.linkedin, textContent: "LinkedIn" }),
    ]),
    $c("div", { id: "footer-copyline" }, [
        $c("i", { textContent: "Mans Comupter Systems Enterprise Ltd Corps." }),
    ]),
]);

setupNav();
setupThemeButton();
