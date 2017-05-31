import {Mediaq, MediaQuery} from "../mediaq";

let mediaQueriesList: HTMLElement | null = document.getElementById("mediaQueries");

let mediaq = new Mediaq()
  .fromStyleSheets()
  .mediaQuery("only screen and (max-width: 500px)")
  .onMediaQueryMatchedChanged((mediaQuery: MediaQuery) => {
    let mediaQueryItem: HTMLElement = <HTMLElement>document.querySelector("li[data-media='" + mediaQuery + "']");
    if (!mediaQueryItem) {
      mediaQueryItem = document.createElement("li");
      mediaQueryItem.innerText = mediaQuery.media;
      mediaQueryItem.dataset.media = mediaQuery.media;
      if (mediaQueriesList) {
        mediaQueriesList.appendChild(mediaQueryItem);
      }
    }

    if (mediaQuery.matched) {
      mediaQueryItem.classList.add("matched");

    } else {
      mediaQueryItem.classList.remove("matched");
    }

  })
  .start();

/** Media queries added subsequently will trigger listeners as well **/
window.setTimeout(function() {
  mediaq.mediaQuery("only screen and (min-width: 500px)");
}, 1000);

window.setTimeout(function() {
  mediaq.mediaQuery("only screen and (max-width: 200px)");
}, 2000);

/** Stop listening after 10 seconds**/
window.setTimeout(function() {
  mediaq.stop();
}, 10000);

/** Resume listening after 15 seconds**/
window.setTimeout(function() {
  mediaq.start();
}, 15000);
