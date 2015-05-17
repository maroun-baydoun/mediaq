"use strict";
define(["require", "exports", "../mediaq"], function (require, exports, mediaq_1) {
    var mediaQueriesList = document.getElementById("mediaQueries");
    var mediaq = new mediaq_1.Mediaq()
        .fromStyleSheets()
        .mediaQuery("only screen and (max-width: 500px)")
        .onMediaQueryMatchedChanged(function (mediaQuery) {
        var mediaQueryItem = document.querySelector("li[data-media='" + mediaQuery + "']");
        if (!mediaQueryItem) {
            mediaQueryItem = document.createElement("li");
            mediaQueryItem.innerText = mediaQuery.media;
            mediaQueryItem.dataset["media"] = mediaQuery.media;
            mediaQueriesList.appendChild(mediaQueryItem);
        }
        if (mediaQuery.matched) {
            mediaQueryItem.classList.add("matched");
        }
        else {
            mediaQueryItem.classList.remove("matched");
        }
    })
        .start();
    window.setTimeout(function () {
        mediaq.mediaQuery("only screen and (min-width: 500px)");
    }, 1000);
    window.setTimeout(function () {
        mediaq.mediaQuery("only screen and (max-width: 200px)");
    }, 2000);
    window.setTimeout(function () {
        mediaq.stop();
    }, 10000);
    window.setTimeout(function () {
        mediaq.start();
    }, 15000);
});
