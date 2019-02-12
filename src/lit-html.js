import { render, html } from "lit-html";

const Bottom = message =>
  html`
    <div style="border:1px solid red">Hello there Im the bottom ${message}</div>
  `;

const Recursive = (depth, message) => html`
  <span>
    Level: ${depth}
    ${depth > 0 ? Recursive(depth - 1, message) : Bottom(message)}
  </span>
`;

export default element => {
  let count = 2000;
  let startTime = performance.now();
  const update = () => {
    if (count > 0) {
      Promise.resolve()
        .then(() => count--)
        .then(renderComponent);
    } else {
      console.log(`Test took ${performance.now() - startTime} ms`);
    }
  };
  const renderComponent = () => {
    render(Recursive(200, count), element);
    update();
  };
  update();
  return () => (element.innerHTML = "");
};
