import { AppHeader } from "../components/AppHeader.js";
import { HomePageTile } from "../components/HomePageTile.js";

const template = document.createElement('template');
template.innerHTML = `
    <div id="homeview-container">
    </div>
`;

export class HomeView extends HTMLElement {
    constructor() {
        super();
        const appHeader = new AppHeader();
        const homePageTile = new HomePageTile();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById('homeview-container').appendChild(appHeader);
        this.shadowRoot.getElementById('homeview-container').appendChild(homePageTile);
    }
}

customElements.define('home-view', HomeView);