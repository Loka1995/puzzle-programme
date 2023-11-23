const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="css/HomePageTile.css" />
    <div id="puzzle-images__container">
        <div class="puzzle-image__container" id="pi1"></div>
        <div class="puzzle-image__container" id="pi2"></div>
        <div class="puzzle-image__container" id="pi3"></div>
    </div>
    `;

export class HomePageTile extends HTMLElement {
    //static element to track id needed.
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('homepage-tile', HomePageTile);