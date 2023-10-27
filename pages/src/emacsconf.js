let pre = document.getElementById("config");

fetch("https://raw.githubusercontent.com/manskron/modmacs/master/init.el")
    .then((response) => response.text())
    .then((text) => {
        pre.innerHTML = text;
    });
