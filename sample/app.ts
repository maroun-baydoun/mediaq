"use strict";
import mm = require("../mediaq");

var events: HTMLElement = document.getElementById("events");

var mediaq = new mm.Mediaq()
    .fromStyleSheets()
    .onMediaQueriesMatched((mediaQuery: mm.MediaQuery, matched: boolean) => {
        var event: HTMLElement = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
    .match()
    .listen();
