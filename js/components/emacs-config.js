class EmacsConfig extends HTMLElement {
    static tagName = "emacs-config";

    static style = `
    :host {
        width: 100%;
    }

    pre {
    overflow-x: scroll;
    }
    `;

    static config = fetch(
        "https://raw.githubusercontent.com/manskron/modmacs/master/init.el"
    )
        .then((response) => response.text())
        .then((text) => text);

    async connectedCallback() {
        if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
            return;
        }

        let shadowroot = this.attachShadow({ mode: "open" });

        let sheet = new CSSStyleSheet();
        sheet.replaceSync(EmacsConfig.style);
        shadowroot.adoptedStyleSheets = [sheet];

        const template = document.createElement("template");
        const pre = document.createElement("pre");
        pre.innerHTML = await EmacsConfig.config;
        template.content.appendChild(pre);

        shadowroot.appendChild(template.content.cloneNode(true));
    }
}

if ("customElements" in window) {
    customElements.define(EmacsConfig.tagName, EmacsConfig);
}
