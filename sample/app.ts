"use strict";
import {Mediaq, MediaQuery} from "../mediaq";

var events: HTMLElement = document.getElementById("events");

var mediaq = new Mediaq()
    .onMediaQueryMatched((mediaQuery: MediaQuery, matched: boolean) => {
      var event: HTMLElement = document.createElement("li");
      event.innerText = mediaQuery.value + " " + (matched ? "was matched" : "was not matched");
      events.appendChild(event);
    })
    .fromStyleSheets()
    .mediaQuery("only screen and (max-width: 500px)");

    /** Media queries added subsequently will trigger listeners as well **/
    window.setTimeout(function(){
      mediaq.mediaQuery("only screen and (min-width: 500px)");
    }, 1000);

    window.setTimeout(function(){
      mediaq.mediaQuery("only screen and (max-width: 200px)");
    }, 2000);
