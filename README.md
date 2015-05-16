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
import mq = require("mediaq");
```
3. Initialize a Mediaq instance
```typescript
var mediaq = new mq.Mediaq()
                   .onMediaQueryMatched((mediaQuery: mq.MediaQuery, matched: boolean) => { })
                   .fromStyleSheets()
                   .mediaQuery(mediaQuery: string);
```


####Methods
* ```onMediaQueryMatched((mediaQuery: mq.MediaQuery, matched: boolean))``` : adds a listener that will triggered every time a media query is matched. Should be called before ```fromStyleSheets()``` and ```mediaQuery(mediaQuery: string)```,  otherwise the listeners will not be triggered on page load .
* ```fromStyleSheets()``` : searches for media queries defined in the stylesheets loaded in the document.
* ```mediaQuery(mediaQuery: string)``` : adds a media query that was not defined in stylesheets.

####Example
See [sample](https://github.com/maroun-baydoun/mediaq/tree/master/sample) directory.
