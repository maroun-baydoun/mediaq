"use strict";
define(["require", "exports", "../mediaq"], function (require, exports, mediaq_1) {
    var events = document.getElementById("events");
    var mediaq = new mediaq_1.Mediaq()
        .onMediaQueryMatched(function (mediaQuery, matched) {
        var event = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
        .fromStyleSheets()
        .mediaQuery("only screen and (max-width: 500px)");
});
