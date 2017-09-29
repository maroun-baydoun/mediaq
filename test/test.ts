
import {Mediaq, MediaQuery} from "../src/mediaq";

QUnit.test("mediaq fromStyleSheets", (assert) => {

  const mediaq = new Mediaq().fromStyleSheets(),
    mediaQuery1 = new MediaQuery("only screen and (max-width: 767px)", "mobile"),
    mediaQuery2 = new MediaQuery("only screen and (min-width: 1000px)", "desktop");

  assert.propEqual(mediaq.mediaQueries(), [mediaQuery2, mediaQuery1], "2 media queries read from stylesheets");

});

QUnit.test("mediaq fromStyleSheets with matching href regex", (assert) => {

  const mediaq = new Mediaq().fromStyleSheets(/style.css/),
    mediaQuery1 = new MediaQuery("only screen and (max-width: 767px)", "mobile"),
    mediaQuery2 = new MediaQuery("only screen and (min-width: 1000px)", "desktop");

  assert.propEqual(mediaq.mediaQueries(), [mediaQuery2, mediaQuery1], "2 media queries read from stylesheets");

});

QUnit.test("mediaq fromStyleSheets with non-matching href regex", (assert) => {

  const mediaq = new Mediaq().fromStyleSheets(/other-style.css/);

  assert.equal(mediaq.mediaQueries().length, 0, "No media queries read from stylesheets");

});


QUnit.test("mediaq mediaQuery", (assert) => {

  const mediaQuery1 = new MediaQuery("only screen and (max-width: 500px)"),
    mediaQuery2 = new MediaQuery("only screen and (min-width: 300px)"),
    mediaq = new Mediaq().mediaQuery("only screen and (max-width: 500px)")
      .mediaQuery("only screen and (min-width: 300px)");

  assert.propEqual(mediaq.mediaQueries(), [mediaQuery1, mediaQuery2], "2 media queries added");


});

QUnit.test("mediaq start", (assert) => {

  const mediaq = new Mediaq();

  assert.equal(mediaq.listening, false, "Mediaq is not listening yet");

  mediaq.start();

  assert.equal(mediaq.listening, true, "Mediaq is listening");

  assert.throws(
    () => { mediaq.start(); },
    Error("This Mediaq intance has already started"),
    "Mediaq throws exception if started again"
  );

});


QUnit.test("mediaq stop", (assert) => {

  const mediaq = new Mediaq().fromStyleSheets();

  assert.throws(
    () => { mediaq.stop(); },
    Error("This Mediaq intance is not started"),
    "Mediaq throws exception if stoped without being started"
  );

  mediaq.start();

  assert.equal(mediaq.listening, true, "Mediaq is listening");

  mediaq.stop();

  assert.equal(mediaq.listening, false, "Mediaq is not listening");

});
