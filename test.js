import { HomeView } from "./views/HomeView.js";

const homeView = new HomeView();
const body = document.getElementsByTagName('body')[0];
body.appendChild(homeView)
