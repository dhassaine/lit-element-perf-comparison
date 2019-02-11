import { LitElement, html } from "lit-element";

class BottomLitElement extends LitElement {
  static get properties() {
    return {
      message: { type: String }
    };
  }

  render() {
    return html`
      <div style="border: 1px solid red">${this.message}</div>
    `;
  }
}
customElements.define("bottom-lit-element", BottomLitElement);

class RecursiveLitElement extends LitElement {
  static get properties() {
    return {
      depth: { type: Number },
      message: { type: String }
    };
  }

  render() {
    return html`
      <span style="padding: 5px;">
        Level: ${this.depth}
        ${this.depth > 0
          ? html`
              <recursive-lit-element
                depth="${this.depth - 1}"
                message="${this.message}"
              ></recursive-lit-element>
            `
          : html`
              <bottom-lit-element
                message="${this.message}"
              ></bottom-lit-element>
            `}
      </span>
    `;
  }
}

customElements.define("recursive-lit-element", RecursiveLitElement);

/*
export default (element: HTMLElement) => {
  element.innerHTML = "";
  let count = 2000;
  let startTime = performance.now();
  const update = () => {
    if (count > 0) {
      Promise.resolve()
        .then(() => count--)
        .then(renderComponent);
    } else {
      window.alert(`Entire thing took ${performance.now() - startTime} ms`);
    }
  };
  const renderComponent = () => {
    render(Recursive(200, count), element);
    update();
  };
  update();
  return () => undefined;
};
*/

export class StartLitElement extends LitElement {
  static get properties() {
    return { count: { type: Number } };
  }

  set count(val) {
    const old = this._count;
    this._count = val;
    this.requestUpdate("count", old);
  }

  get count() {
    return this._count;
  }

  constructor() {
    super();
    this._count = 1000;
  }

  onFrame() {
    if (this.count > 0) {
      Promise.resolve().then(() => this.onFrame());
      this.count--;
    } else {
      console.log(`Test took ${performance.now() - this.startTime} ms`);
    }
  }

  start() {
    this.startTime = performance.now();
    this.onFrame();
  }

  render() {
    return html`
      <button @click="${() => this.start()}">Start</button>
      <recursive-lit-element
        depth="100"
        message="Hello there Im the bottom ${this.count}"
      ></recursive-lit-element>
    `;
  }
}
customElements.define("start-lit-element", StartLitElement);
