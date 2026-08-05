import "./style.css";

type TabButton = HTMLButtonElement & {
  hidden: boolean;
};

type TabPanel = HTMLElement & {
  hidden: boolean;
};

export class ChipTabs extends HTMLElement {
  #wired = false;
  #tablist: HTMLElement | null = null;
  #buttons: TabButton[] = [];
  #panels: TabPanel[] = [];

  connectedCallback() {
    if (this.#wired) {
      return;
    }

    const buttons = [...this.querySelectorAll<TabButton>("[data-tab]")];
    const panels = [...this.querySelectorAll<TabPanel>("[data-tab-panel]")];

    if (!buttons.length || !panels.length) {
      return;
    }

    const tablist =
      this.querySelector<HTMLElement>("[data-tablist]") ??
      (this.firstElementChild instanceof HTMLElement
        ? this.firstElementChild
        : null);

    this.#tablist = tablist;
    this.#buttons = buttons;
    this.#panels = panels;
    this.#wired = true;

    if (this.#tablist) {
      this.#tablist.setAttribute("role", "tablist");
    }

    this.#buttons.forEach((button) => {
      const tab = button.dataset.tab;

      button.type = "button";
      button.setAttribute("role", "tab");
      button.tabIndex = -1;
      button.setAttribute("aria-selected", "false");

      if (tab) {
        button.id = this.#buttonId(tab);
        button.setAttribute("aria-controls", this.#panelId(tab));
      }

      button.addEventListener("click", this.#selectFromEvent);
      button.addEventListener("keydown", this.#selectFromKeydown);
    });

    this.#panels.forEach((panel) => {
      const tab = panel.dataset.tabPanel;

      panel.setAttribute("role", "tabpanel");
      if (tab) {
        panel.id = this.#panelId(tab);
        panel.setAttribute("aria-labelledby", this.#buttonId(tab));
      }
    });

    const activeTab =
      this.dataset.defaultTab ?? this.#buttons[0]?.dataset.tab ?? "";

    this.#setActiveTab(activeTab);
  }

  disconnectedCallback() {
    this.#buttons.forEach((button) => {
      button.removeEventListener("click", this.#selectFromEvent);
      button.removeEventListener("keydown", this.#selectFromKeydown);
    });

    this.#wired = false;
  }

  #selectFromEvent = (event: MouseEvent) => {
    const button = event.currentTarget as TabButton | null;
    const tab = button?.dataset.tab;

    if (!tab) {
      return;
    }

    this.#setActiveTab(tab);
  };

  #selectFromKeydown = (event: KeyboardEvent) => {
    const currentIndex = this.#buttons.findIndex(
      (button) => button === event.currentTarget,
    );

    if (currentIndex === -1) {
      return;
    }

    const lastIndex = this.#buttons.length - 1;
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();

    const nextButton = this.#buttons[nextIndex];
    const tab = nextButton.dataset.tab;

    if (!tab) {
      return;
    }

    nextButton.focus();
    this.#setActiveTab(tab);
  };

  #setActiveTab(tab: string) {
    this.#buttons.forEach((button) => {
      const isActive = button.dataset.tab === tab;
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    this.#panels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === tab;

      panel.dataset.active = String(isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  }

  #panelId(tab: string) {
    return `${this.id || "chip-tabs"}-${tab}`;
  }

  #buttonId(tab: string) {
    return `${this.id || "chip-tabs"}-tab-${tab}`;
  }
}

if (!customElements.get("chip-tabs")) {
  customElements.define("chip-tabs", ChipTabs);
}
