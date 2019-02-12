import { render, html } from "lit-html";

class Recursive extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.pendingRequest = false;
    this.rendered = false;
    this.shadow = this.attachShadow({ mode: "closed" });
  }

  static get observedAttributes() {
    return ["depth", "message"];
  }

  requestUpdate() {
    if (!this.pendingRequest) {
      this.pendingRequest = true;
      Promise.resolve().then(() => {
        this.pendingRequest = false;
        this.update();
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.rendered) {
      this.rendered = true;
      this.render();
    } else {
      this.requestUpdate();
    }
  }

  update() {
    const depth = Number(this.getAttribute("depth"));
    const message = this.getAttribute("message");
    if (depth == 0) {
      this.leafNode.textContent = `Hello boys! ${message}`;
    } else {
      this.levelNode.textContent = `Level: ${depth}`;
      this.recursiveNode.setAttribute("depth", depth - 1);
      this.recursiveNode.setAttribute("message", message);
    }
  }

  render() {
    const depth = Number(this.getAttribute("depth"));
    const message = this.getAttribute("message");
    if (depth == 0) {
      render(
        html`
          <div style="border:1px solid red;">Hello boys! ${message}</div>
        `,
        this.shadow
      );
    } else {
      render(
        html`
          <span>
            <i>Level: ${depth}</i>
            <rg-recursive
              depth="${depth - 1}"
              message="${message}"
            ></rg-recursive>
          </span>
        `,
        this.shadow
      );
    }
    this.leafNode = this.shadow.querySelector("div");
    this.levelNode = this.shadow.querySelector("i");
    this.recursiveNode = this.shadow.querySelector("rg-recursive");
  }
}

customElements.define("rg-recursive", Recursive);

class WebComponentStart extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.count = 1000;
    this.shadow = this.attachShadow({ mode: "closed" });
    this.render();
  }

  connectedCallback() {
    console.log("connected");
    this.start();
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  start() {
    this.startTime = performance.now();
    this.onFrame();
  }

  render() {
    render(
      html`
        <rg-recursive depth="${100}" message="${this.count}"></rg-recursive>
      `,
      this.shadow
    );
  }

  onFrame() {
    if (this.count > 0) {
      Promise.resolve().then(() => this.onFrame());
      this.count--;
      this.render();
    } else {
      console.log(`Test took ${performance.now() - this.startTime} ms`);
    }
  }
}

customElements.define("rg-start-element", WebComponentStart);
