import { Mediaq } from "mediaq";

// Media queries used by the fixture UI.
const mediaQueries = [
  { media: "only screen and (min-width: 600px)", name: "desktop" },
  { media: "(orientation: landscape)", name: "landscape" },
  { media: "only screen and (max-width: 400px)", name: "mobile" },
  { media: "(prefers-color-scheme: dark)", name: "dark-mode" },
  { media: "(prefers-reduced-motion: reduce)", name: "reduced-motion" },
  { media: "print", name: "print" },
  { media: "only screen and (min-width: 600pz)", name: "broken" },
];

// Cache each query input by its `data-query` value so updates can be applied directly.
const queryInputs = new Map<string, HTMLInputElement>();

for (const element of document.querySelectorAll<HTMLInputElement>(
  "input[data-query]",
)) {
  const query = element.dataset.query;

  if (!query) {
    continue;
  }

  queryInputs.set(query, element);
}

// Button used to stop the Mediaq observer from the fixture UI.
const stopButton = document.querySelector<HTMLButtonElement>(
  "button[data-action='stop-observing']",
);

// Button used to restart the observer from the fixture UI.
const startButton = document.querySelector<HTMLButtonElement>(
  "button[data-action='start-observing']",
);

// Wire Mediaq updates into the fixture UI by toggling the matching input state.
const mediaq = Mediaq({
  mediaQueries,
  onUpdate({ name, matches }) {
    const input = queryInputs.get(name);

    if (!input) {
      return;
    }

    input.checked = matches;
  },
});

// Start observing immediately so the fixture reflects the current environment.
mediaq.start();

// Allow the fixture to stop and restart observation on demand.
stopButton?.addEventListener("click", () => {
  mediaq.stop();
});

startButton?.addEventListener("click", () => {
  mediaq.start();
});
