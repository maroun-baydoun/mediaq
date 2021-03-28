import { Mediaq } from "mediaq";

window.addEventListener("DOMContentLoaded", () => {
  const demoContainer = document.querySelector(".demo");

  const mediaQueries = [
    {
      name: "small screen",
      media: "only screen and (max-device-width: 480px)",
    },
    {
      name: "medium screen",
      media:
        "only screen and (min-device-width: 481px) and (max-device-width: 768px)",
    },
    {
      name: "large screen",
      media:
        "only screen and (min-device-width: 768px) and (max-device-width: 1024px)",
    },
    {
      name: "x-large screen",
      media: "only screen and (min-device-width: 1024px)",
    },
    {
      name: "portrait",
      media: "only screen and (orientation: portrait)",
    },
    {
      name: "landscape",
      media: "only screen and (orientation: landscape)",
    },
  ];

  const items = mediaQueries.map(
    (mediaQuery) =>
      `<div data-name="${mediaQuery.name}" class="demo__item">
            <div class="demo__item__mediaquery">
                <div>${mediaQuery.name}</div>
                <div>${mediaQuery.media}</div>
            </div>
            <div class="demo__item__match">
            </div>
        </div>`
  );

  demoContainer.innerHTML = items.join("");

  const mediaq = Mediaq({
    mediaQueries,
    onUpdate: (e) => {
      const itemMatch = demoContainer.querySelector(
        `.demo__item[data-name="${e.name}"]>.demo__item__match`
      );

      if (!itemMatch) {
        return;
      }

      itemMatch.innerHTML = e.matches ? "&#x2705;" : "&#x274C;";
      itemMatch.title = e.matches ? "Matches" : "Doesn't match";
    },
  });

  mediaq.start();
});
