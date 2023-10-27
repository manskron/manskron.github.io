import { $a, $c, setupNav, setupThemeButton } from "./src/utils.js";

const header = document.querySelector("header");
const footer = document.querySelector("footer");

const email_url = "mailto:safe.key1974@fastmail.com";
const gh_url = "https://github.com/manskron";
const linkedin_url = "https://www.linkedin.com/in/mansbrusback/";

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
        $c("a", { href: email_url, textContent: "Email" }),
        $c("a", { href: gh_url, textContent: "Github" }),
        $c("a", { href: linkedin_url, textContent: "LinkedIn" }),
    ]),
    $c("div", { id: "footer-copyline" }, [
        $c("i", { textContent: "Mans Comupter Systems Enterprise Ltd Corps." }),
    ]),
]);

setupNav();
setupThemeButton();
