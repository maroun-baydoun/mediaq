"use strict";
import {Mediaq, MediaQuery} from "../mediaq";

var events: HTMLElement = document.getElementById("events");

var mediaq = new Mediaq()
    .fromStyleSheets()
    .mediaQuery("only screen and (max-width: 500px)")
    .onMediaQueryMatched((mediaQuery: MediaQuery) => {
      var event: HTMLElement = document.createElement("li");
      event.innerText = mediaQuery.media + " " + (mediaQuery.matched ? "was matched" : "was not matched");
      events.appendChild(event);
    })
    .start();

    /** Media queries added subsequently will trigger listeners as well **/
    window.setTimeout(function(){
      mediaq.mediaQuery("only screen and (min-width: 500px)");
    }, 1000);

    window.setTimeout(function(){
      mediaq.mediaQuery("only screen and (max-width: 200px)");
    }, 2000);

    /** Stop listening after 10 seconds**/
    window.setTimeout(function(){
      mediaq.stop();
    }, 10000);

    /** Resume listening after 15 seconds**/
    window.setTimeout(function(){
      mediaq.start();
    }, 15000);
