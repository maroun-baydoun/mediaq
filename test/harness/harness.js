import { Mediaq } from "../../dist/mediaq.js";

// Media queries used by the harness UI.
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
const queryInputs = new Map(
  [...document.querySelectorAll("input[data-query]")].map((element) => [
    element.dataset.query,
    element,
  ]),
);

// Button used to stop the Mediaq observer from the harness UI.
const stopButton = document.querySelector(
  "button[data-action='stop-observing']",
);

// Wire Mediaq updates into the harness UI by toggling the matching input state.
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

// Start observing immediately so the harness reflects the current environment.
mediaq.start();

// Allow the harness to stop observation on demand.
stopButton.addEventListener("click", () => {
  mediaq.stop();
});
