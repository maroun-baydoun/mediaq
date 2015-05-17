# Mediaq
Listen to media queries updates in TypeScript

#### Basic usage
1. Define some media queries in a stylesheet
```css
@media only screen and (max-width: 760px){
...
}
@media only screen and (max-width: 480px){
...
}
```
2. Import Mediaq
```typescript
import {Mediaq, MediaQuery} from "mediaq";
```
3. Initialize a Mediaq instance
```typescript
var mediaq = new Mediaq()
                 .fromStyleSheets()
                 .mediaQuery(mediaQuery: string)
                 .onMediaQueryMatched((mediaQuery: MediaQuery, matched: boolean) => { })
                 .start();
```


####Methods
* ```fromStyleSheets()``` : searches for media queries defined in the stylesheets loaded in the document.
* ```mediaQuery(mediaQuery: string)``` : adds a media query that was not defined in stylesheets.
* ```onMediaQueryMatched((mediaQuery: MediaQuery, matched: boolean))``` : adds a listener that will triggered every time a media query is matched.
* ```start()``` : starts listening to changes in media queries.
* ```stop()``` : stops listening to changes in media queries.
####Example
See [sample](https://github.com/maroun-baydoun/mediaq/tree/master/sample) directory.
