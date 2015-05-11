"use strict";
define(["require", "exports", "../mediaq"], function (require, exports, mq) {
    var events = document.getElementById("events");
    var mediaq = new mq.Mediaq()
        .fromStyleSheets()
        .onMediaQueryMatched(function (mediaQuery, matched) {
        var event = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
        .match()
        .listen();
});
