import "./style.css";

import { Mediaq } from "mediaq";

import "./components/snippet-copy-button";
import "./components/snippet-card";
import "./components/chip-tabs";

import { mediaQueries } from "./media-queries";

type MediaCard = {
  element: HTMLElement;
  status: HTMLElement;
};

const mediaGrid = document.querySelector<HTMLElement>("[data-media-grid]");
const mediaSummaryCount = document.querySelector<HTMLElement>(
  "[data-media-summary-count]",
);
const mediaSummaryTotal = document.querySelector<HTMLElement>(
  "[data-media-summary-total]",
);

if (mediaGrid && mediaSummaryCount && mediaSummaryTotal) {
  mediaSummaryTotal.textContent = String(mediaQueries.length);

  mediaGrid.innerHTML = mediaQueries
    .map(
      (query, index) => `
        <article class="media-card" data-media-card data-media-index="${index}" data-matches="false">
          <div class="media-card-head">
            <h4 class="media-card-title">${query.name}</h4>
            <span class="media-card-status" data-media-state>not matching</span>
          </div>
          <p class="media-card-query">${query.media}</p>
          <p class="media-card-note">${query.description}</p>
        </article>
      `,
    )
    .join("");

  const cards = new Map<number, MediaCard>();

  mediaGrid.querySelectorAll<HTMLElement>("[data-media-card]").forEach((card) => {
    const index = Number(card.dataset.mediaIndex);
    const status = card.querySelector<HTMLElement>("[data-media-state]");

    if (!Number.isNaN(index) && status) {
      cards.set(index, {
        element: card,
        status,
      });
    }
  });

  const states = new Map<number, boolean>(
    mediaQueries.map((_, index) => [index, false]),
  );
  const mediaQueryIndex = new Map(
    mediaQueries.map((query, index) => [query.media, index]),
  );

  const renderSummary = () => {
    const matching = [...states.values()].filter(Boolean).length;
    mediaSummaryCount.textContent = String(matching);
  };

  const renderCard = (index: number, matches: boolean) => {
    const card = cards.get(index);

    if (!card) {
      return;
    }

    card.element.dataset.matches = String(matches);
    card.status.textContent = matches ? "matching" : "not matching";
  };

  const mediaq = Mediaq({
    mediaQueries: mediaQueries.map((query) => ({
      media: query.media,
      name: query.name,
    })),
    onUpdate: ({ media, matches }) => {
      const index = mediaQueryIndex.get(media);

      if (index === undefined) {
        return;
      }

      states.set(index, matches);
      renderCard(index, matches);
      renderSummary();
    },
  });

  mediaq.start();
  renderSummary();
}
