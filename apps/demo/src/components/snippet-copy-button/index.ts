import "./style.css";

export class SnippetCopyButton extends HTMLElement {
  #clipboardText = "";
  #button: HTMLButtonElement | null = null;
  #label = "Copy";

  #boundClick = async () => {
    if (!this.#button || !this.#clipboardText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.#clipboardText);
    } catch {
      this.#hide();
      return;
    }

    this.#button.textContent = "Copied";
    this.#button.setAttribute("aria-label", "Snippet copied");

    window.setTimeout(() => {
      if (!this.#button) {
        return;
      }

      this.#button.textContent = this.#label;
      this.#button.removeAttribute("aria-label");
    }, 1500);
  };

  connectedCallback() {
    if (!navigator.clipboard?.writeText) {
      this.#hide();
      return;
    }

    if (this.#button) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = (this.textContent ?? "Copy").trim() || "Copy";
    this.#label = button.textContent;

    this.replaceChildren(button);

    button.addEventListener("click", this.#boundClick);
    this.#button = button;
  }

  disconnectedCallback() {
    this.#button?.removeEventListener("click", this.#boundClick);
    this.#button = null;
  }

  set clipboardText(value: string) {
    this.#clipboardText = value;
  }

  get clipboardText() {
    return this.#clipboardText;
  }

  #hide() {
    this.hidden = true;
    this.setAttribute("aria-hidden", "true");
    this.tabIndex = -1;
  }
}

if (!customElements.get("snippet-copy-button")) {
  customElements.define("snippet-copy-button", SnippetCopyButton);
}
