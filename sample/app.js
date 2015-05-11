"use strict";
define(["require", "exports", "../mediaq"], function (require, exports, mm) {
    var events = document.getElementById("events");
    var mediaq = new mm.Mediaq()
        .fromStyleSheets()
        .onMediaQueriesMatched(function (mediaQuery, matched) {
        var event = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
        .match()
        .listen();
});
