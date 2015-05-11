"use strict";
import mq = require("../mediaq");

var events: HTMLElement = document.getElementById("events");

var mediaq = new mq.Mediaq()
    .fromStyleSheets()
    .onMediaQueryMatched((mediaQuery: mq.MediaQuery, matched: boolean) => {
        var event: HTMLElement = document.createElement("li");
        event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
        events.appendChild(event);
    })
    .match()
    .listen();
