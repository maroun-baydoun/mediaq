# Mediaq
Listen to media query updates in JavaScript

[![npm version](https://badge.fury.io/js/mediaq.svg)](https://badge.fury.io/js/mediaq)


#### Install

```
npm i mediaq
```
Or

```
yarn add mediaq
```

#### Use

```js
import { Mediaq } from "mediaq";

const mediaq = Mediaq({
  onUpdate: (e) => console.log(e.name, e.media, e.matches),
  mediaQueries: [{
    name: "mobile",
    media: "only screen and (max-width: 600px)"
  }, {
    name: "desktop",
    media: "only screen and (min-width: 600px)"
  }]
});


mediaq.start();

// When done listening 
mediaq.stop();
```


#### API

 The `Mediaq` function expects a single object argument with `onUpdate` and `mediaQueries` keys.

 * `onUpdate` takes one argument having the `media`, `name` and `matches` properties.
 * `mediaQueries` is an array of objects having the `name` and `media` keys.

It returns an object having the `start` and `stop` methods.

* `start` calls `onUpdate` with the current state of mediaquery matches and listens for future updates. Calling this method repeatedly has no effect.
* `stop` ceases listening for mediaquery updates. Calling this method repeatedly has no effect.


#### Demo

See it running in action in this [demo](https://dev.maroun-baydoun.com/mediaq/#demo).


#### License
MIT
Copyright (c) [Maroun Baydoun](https://maroun-baydoun.com/).
