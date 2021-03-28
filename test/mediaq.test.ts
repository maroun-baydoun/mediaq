import { Mediaq, MediaQuery } from "../src/mediaq";

import { create } from "./mediaQueryList";

describe("Mediaq", () => {
  let onUpdate = jasmine.createSpy();
  const mediaQueries: MediaQuery[] = [
    { media: "only screen and (min-width: 600px)", name: "desktop" },
    { media: "only screen and (max-width: 400px)", name: "mobile" },
  ];

  beforeEach(() => {
    window.matchMedia = jasmine
      .createSpy()
      .and.returnValue(create(mediaQueries[0].media)(false));
    onUpdate = jasmine.createSpy();
  });

  it("returns start, stop and isListening functions", () => {
    const mediaq = Mediaq({ onUpdate, mediaQueries });

    expect(Object.keys(mediaq).length).toBe(3);
    expect(mediaq.start).toEqual(jasmine.any(Function));
    expect(mediaq.stop).toEqual(jasmine.any(Function));
    expect(mediaq.isListening).toEqual(jasmine.any(Function));
  });

  it("calls window.matchMedia for every mediaquery", () => {
    Mediaq({ onUpdate, mediaQueries });

    const callArgs = (window.matchMedia as jasmine.Spy).calls.allArgs();

    expect(window.matchMedia).toHaveBeenCalledTimes(2);
    expect(callArgs).toEqual([
      ["only screen and (min-width: 600px)"],
      ["only screen and (max-width: 400px)"],
    ]);
  });

  describe("start", () => {
    describe("when not already started", () => {
      it("sets listening to true", () => {
        const mediaq = Mediaq({ onUpdate, mediaQueries });

        expect(mediaq.isListening()).toBe(false);

        mediaq.start();

        expect(mediaq.isListening()).toBe(true);
      });

      it("adds event listeners to mediaQueryLists", () => {
        const mediaQueryLists = [
          create(mediaQueries[0].media)(false),
          create(mediaQueries[1].media)(false),
        ];

        window.matchMedia = jasmine
          .createSpy()
          .and.returnValues(...mediaQueryLists);

        const mediaq = Mediaq({ onUpdate, mediaQueries });

        mediaq.start();

        expect(mediaQueryLists[0].addEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
        expect(mediaQueryLists[1].addEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
      });

      it("calls onUpdate", () => {
        const mediaQueryLists = [
          create(mediaQueries[0].media)(false),
          create(mediaQueries[1].media)(true),
        ];

        window.matchMedia = jasmine
          .createSpy()
          .and.returnValues(...mediaQueryLists);

        const mediaq = Mediaq({ onUpdate, mediaQueries });

        mediaq.start();

        expect(onUpdate).toHaveBeenCalledTimes(2);
        expect(onUpdate.calls.allArgs()).toEqual([
          [{ ...mediaQueries[0], matches: false }],
          [{ ...mediaQueries[1], matches: true }],
        ]);
      });
    });

    describe("when already started", () => {
      it("doesn't add event listeners to mediaQueryLists", () => {
        const mediaQueryLists = [
          create(mediaQueries[0].media)(false),
          create(mediaQueries[1].media)(false),
        ];

        window.matchMedia = jasmine
          .createSpy()
          .and.returnValues(...mediaQueryLists);

        const mediaq = Mediaq({ onUpdate, mediaQueries });

        mediaq.start();
        mediaq.start();

        expect(mediaQueryLists[0].addEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
        expect(mediaQueryLists[1].addEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
      });

      it("doesn't call onUpdate", () => {
        const mediaq = Mediaq({ onUpdate, mediaQueries });

        mediaq.start();
        mediaq.start();

        expect(onUpdate).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("stop", () => {
    describe("when already started", () => {
      it("sets listening to false", () => {
        const mediaq = Mediaq({ onUpdate, mediaQueries });

        expect(mediaq.isListening()).toBe(false);

        mediaq.start();
        mediaq.stop();

        expect(mediaq.isListening()).toBe(false);
      });

      it("removes event listeners from mediaQueryLists", () => {
        const mediaQueryLists = [
          create(mediaQueries[0].media)(false),
          create(mediaQueries[1].media)(false),
        ];

        window.matchMedia = jasmine
          .createSpy()
          .and.returnValues(...mediaQueryLists);

        const mediaq = Mediaq({ onUpdate, mediaQueries });

        mediaq.start();
        mediaq.stop();

        expect(mediaQueryLists[0].removeEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
        expect(mediaQueryLists[1].removeEventListener).toHaveBeenCalledOnceWith(
          "change",
          jasmine.any(Function)
        );
      });
    });
  });
});
