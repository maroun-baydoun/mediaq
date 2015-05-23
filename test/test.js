define(["require", "exports", "../mediaq"], function (require, exports, mediaq_1) {
    "use strict";
    QUnit.test("mediaq fromStyleSheets", function (assert) {
        var mediaq = new mediaq_1.Mediaq().fromStyleSheets(), mediaQuery1 = new mediaq_1.MediaQuery("only screen and (max-width: 767px)"), mediaQuery2 = new mediaq_1.MediaQuery("only screen and (min-width: 1000px)");
        assert.propEqual(mediaq.mediaQueries(), [mediaQuery2, mediaQuery1], "Media queries read from stylesheets");
    });
    QUnit.test("mediaq mediaQuery", function (assert) {
        var mediaQuery1 = new mediaq_1.MediaQuery("only screen and (max-width: 500px)"), mediaQuery2 = new mediaq_1.MediaQuery("only screen and (min-width: 300px)"), mediaq = new mediaq_1.Mediaq().mediaQuery("only screen and (max-width: 500px)")
            .mediaQuery("only screen and (min-width: 300px)");
        assert.propEqual(mediaq.mediaQueries(), [mediaQuery1, mediaQuery2], "Media queries added");
    });
    QUnit.test("mediaq start", function (assert) {
        var mediaq = new mediaq_1.Mediaq();
        assert.equal(mediaq.listening, false, "Mediaq is not listening yet");
        mediaq.start();
        assert.equal(mediaq.listening, true, "Mediaq is listening");
        assert.throws(function () { mediaq.start(); }, Error("This Mediaq intance has already started"), "Mediaq throws exception if started again");
    });
    QUnit.test("mediaq stop", function (assert) {
        var mediaq = new mediaq_1.Mediaq().fromStyleSheets();
        assert.throws(function () { mediaq.stop(); }, Error("This Mediaq intance is not started"), "Mediaq throws exception if stoped without being started");
        mediaq.start();
        assert.equal(mediaq.listening, true, "Mediaq is listening");
        mediaq.stop();
        assert.equal(mediaq.listening, false, "Mediaq is not listening");
    });
});
