import "./style.css";

export class CopyrightYear extends HTMLElement {
  connectedCallback() {
    const fallbackYear = this.textContent?.trim();
    const currentYear = String(new Date().getFullYear());

    // Keep the server-rendered year as a fallback, but update it in the browser
    // so the footer stays current without manual edits.
    if (fallbackYear !== currentYear) {
      this.textContent = currentYear;
    }
  }
}

if (!customElements.get("copyright-year")) {
  customElements.define("copyright-year", CopyrightYear);
}
