# Mediaq
Listen to media queries updates in JavaScript

[![npm version](https://badge.fury.io/js/mediaq.svg)](https://badge.fury.io/js/mediaq)

#### Basic usage
1. Define some media queries in a stylesheet
```css
@media only screen and (min-width: 760px){
    mediaq {
     content: "desktop"; /* custom name given to the media query */
    }
}
@media only screen and (max-width: 480px){
    mediaq {
     content: "mobile";
    }
}
```
2. Import Mediaq
```js
import {Mediaq, MediaQuery} from "mediaq";
```
3. Initialize a Mediaq instance
```js
var mediaq = new Mediaq()
                 .fromStyleSheets(href?: RegExp)
                 .mediaQuery(media: string, name?: string)
                 .onMediaQueryMatchedChanged((mediaQuery: MediaQuery) => { })
                 .start();
```


#### Methods
* ```fromStyleSheets(href?: RegExp)``` : searches for media queries defined in the stylesheets loaded in the document.
* ```mediaQuery(media: string, name?: string)``` : adds a media query that was not defined in stylesheets.
* ```onMediaQueryMatchedChanged(listener: MediaQueryMatchChangedListener)``` : adds a listener that will triggered every time a media query is matched or stops being matched.
* ```offMediaQueryMatchedChanged(listener?: MediaQueryMatchChangedListener)``` : removes a listener that was added by ```onMediaQueryMatchedChanged(listener: MediaQueryMatchChangedListener)```, or all listeners if a listener is not provided.
* ```start()``` : starts listening to changes in media queries.
* ```stop()``` : stops listening to changes in media queries.
* ```mediaQueries()``` : returns the media queries added by ```fromStyleSheets()``` and ```mediaQuery(media: string)``` methods.

#### Example
See [sample](https://github.com/maroun-baydoun/mediaq/tree/master/sample) directory.
