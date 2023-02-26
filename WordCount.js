class MyDiv extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.innerHTML = `
    <div style="width: 100px;height: 100px;background-color: pink">
      <slot></slot>
    </div> 
    `;
  }


  connectedCallback() {
    console.log("connectedCallback");
  }

  attributeChangedCallback() {
    console.log("attributeChangedCallback");
  }
}

customElements.define("my-div", MyDiv);

class Counter extends HTMLElement {

  get count() {
    return this.getAttribute("count") ?? 0;
  }

  set count(value) {
    this.setAttribute("count", value);
  }

  static get observedAttributes() {
    return ["count"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === "count") {
      this.shadowRoot.querySelector("button").textContent = newValue;
    }
  }


  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const btn = this.generateBtn();
    this.shadowRoot.appendChild(btn);
    btn.onclick = (ev) => {
      this.count++;
    };
  }

  generateBtn() {
    const btn = document.createElement("button");
    btn.textContent = `${this.count}`;
    return btn;
  }
}

customElements.define("the-counter", Counter);
