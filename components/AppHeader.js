const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="css/AppHeader.css" />
    <header id="app-header">
       <h1>Select a Puzzle</h1>
     </header>
    `;

export class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-header', AppHeader);