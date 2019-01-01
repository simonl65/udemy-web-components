class Reveal extends HTMLElement {
  constructor() {
    super();
    this._visible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        #info-box {
            display: none;
        }
        </style>
        <button>Show</button>
        <p id="info-box"><slot></slot></p>
    `;

    this._button = this.shadowRoot.querySelector("button");
    this._infoEl = this.shadowRoot.querySelector("p");

    this._button.addEventListener("click", this._doShowHide.bind(this));
  }

  connectedCallback() {
    if (
      this.hasAttribute("visible") &&
      this.getAttribute("visible") === "true"
    ) {
      this._visible = true;
      this._infoEl.style.display = "block";
      this._button.textContent = "Hide";
    } else {
      this._visible = false;
      this._infoEl.style.display = "none";
      this._button.textContent = "Show";
    }
    console.log("_visible:", this._visible);
  }

  _doShowHide() {
    console.log("this._visible:", this._visible);
    if (this._visible) {
      console.log("Visible");
      this._infoEl.style.display = "block";
      this._button.textContent = "Hide";
      this._visible = false;
    } else {
      console.log("Hidden");
      this._infoEl.style.display = "none";
      this._button.textContent = "Show";
      this._visible = true;
    }
  }
}

customElements.define("sl-reveal", Reveal);
