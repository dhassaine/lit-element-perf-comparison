import "./start-lit-element";
import "./webcomponent";
import createLitHtml from "./lit-html";

const litElementButton = document.createElement("button");
litElementButton.textContent = "Do lit-element";
const litHtmlButton = document.createElement("button");
litHtmlButton.textContent = "Do lit-html";
const webComponentButton = document.createElement("button");
webComponentButton.textContent = "Do webcomponent";

const litElementContainer = document.createElement("div");
const litHtmlContainer = document.createElement("div");
const webComponentContainer = document.createElement("div");

document.body.appendChild(litElementButton);
document.body.appendChild(litHtmlButton);
document.body.appendChild(webComponentButton);
document.body.appendChild(litElementContainer);
document.body.appendChild(litHtmlContainer);
document.body.appendChild(webComponentContainer);

const doLitElement = () => {
  litElementContainer.innerHTML = "";
  litElementContainer.innerHTML = "<start-lit-element></start-lit-element>";
};

const doHtmlElement = () => {
  createLitHtml(litHtmlContainer);
};

const doWebComponent = () => {
  webComponentContainer.innerHTML = "";
  webComponentContainer.innerHTML = "<rg-start-element></rg-start-element>";
};

litElementButton.addEventListener("click", doLitElement);
litHtmlButton.addEventListener("click", doHtmlElement);
webComponentButton.addEventListener("click", doWebComponent);
