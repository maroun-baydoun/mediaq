"use strict";
define(["require", "exports", "../mediaq"], function (require, exports, mediaq_1) {
    var events = document.getElementById("events");
    var mediaq = new mediaq_1.Mediaq()
        .fromStyleSheets()
        .onMediaQueryMatched(function (mediaQuery, matched) {
        var event = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
        .listen();
});
