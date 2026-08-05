import "./style.css";

import type { SnippetCopyButton } from "../snippet-copy-button";

export class SnippetCard extends HTMLElement {
  #wired = false;

  connectedCallback() {
    if (this.#wired) {
      return;
    }

    const codeBlock = this.querySelector<HTMLElement>("code[data-code]");
    const copyButton = this.querySelector<SnippetCopyButton>(
      "snippet-copy-button",
    );
    const title = this.querySelector<HTMLElement>("[data-snippet-title]");
    const language = this.querySelector<HTMLElement>("[data-snippet-language]");

    if (!codeBlock) {
      return;
    }

    // Vite injects the final highlighted code here, so the rendered text can
    // drive both the copy action and the layout choice.
    const source = codeBlock.textContent ?? "";
    const isInline = !source.includes("\n");
    const titleText = this.getAttribute("title");
    const languageText = this.getAttribute("language-label");

    // One-line snippets use a tighter card treatment so they do not feel
    // oversized compared with the surrounding prose.
    this.toggleAttribute("inline", isInline);

    if (title) {
      this.#setVisible(title, Boolean(titleText));
      title.textContent = titleText ?? "";
    }

    if (language) {
      this.#setVisible(language, Boolean(languageText));
      language.textContent = languageText ?? "";
    }

    if (copyButton) {
      copyButton.clipboardText = source;
      copyButton.dataset.position = "bottom-right";
    }

    this.#wired = true;
  }

  #setVisible(element: HTMLElement, visible: boolean) {
    element.hidden = !visible;
  }
}

if (!customElements.get("snippet-card")) {
  customElements.define("snippet-card", SnippetCard);
}
