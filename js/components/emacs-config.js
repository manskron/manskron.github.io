class EmacsConfig extends HTMLElement {
    static tagName = "emacs-config";

    static config = fetch(
        "https://raw.githubusercontent.com/manskron/modmacs/master/init.el"
    )
        .then((response) => response.text())
        .then((text) => text);

    async connectedCallback() {
        if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
            return;
        }

        const template = document.createElement("template");
        const pre = this.querySelector("pre");
        pre.innerHTML = await EmacsConfig.config;
    }
}

if ("customElements" in window) {
    customElements.define(EmacsConfig.tagName, EmacsConfig);
}
