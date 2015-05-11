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
                   .fromStyleSheets()
                   .onMediaQueryMatched((mediaQuery: mq.MediaQuery, matched: boolean) => { })
                   .match()
                   .listen();
```


####Methods

* ```fromStyleSheets()``` : searches for media queries defined in the stylesheets loaded in the document.
* ```match()``` : does the initial matching of media queries, and notifies the listeners registered on the ```Mediaq``` instance.
* ```listen()``` : listens to changes in media queries and and notifies the listeners registered on the ```Mediaq``` instance everytime a media query becomes or stops being matched.
*```onMediaQueryMatched((mediaQuery: mq.MediaQuery, matched: boolean))``` : Adds a listener that will triggered by the ```match()``` and ```listen()``` methods.

####Example
See [sample](https://github.com/maroun-baydoun/mediaq/tree/master/sample) directory.
