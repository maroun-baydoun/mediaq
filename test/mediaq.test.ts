import { Mediaq, MediaQuery } from "../src/mediaq";

describe("Mediaq", () => {
  describe("fromStyleSheets", () => {
    it("loads media queries", () => {
      const mediaq = new Mediaq().fromStyleSheets();
      const mediaQuery1 = new MediaQuery(
        "only screen and (max-width: 767px)",
        "mobile"
      );
      const mediaQuery2 = new MediaQuery(
        "only screen and (min-width: 1000px)",
        "desktop"
      );
      const mediaQuery3 = new MediaQuery(
        "only screen and (min-width: 2000px)",
        "large-screen"
      );

      expect(mediaq.mediaQueries()).toEqual([
        mediaQuery1,
        mediaQuery2,
        mediaQuery3,
      ]);
    });

    it("loads media queries from stylesheets with matching href regex", () => {
      const mediaq = new Mediaq().fromStyleSheets(/style2.css/);
      const mediaQuery = new MediaQuery(
        "only screen and (min-width: 2000px)",
        "large-screen"
      );

      expect(mediaq.mediaQueries()).toEqual([mediaQuery]);
    });

    it("loads no media queries when no matching stylesheets are found", () => {
      const mediaq = new Mediaq().fromStyleSheets(/style3.css/);

      expect(mediaq.mediaQueries()).toEqual([]);
    });
  });

  describe("mediaQuery", () => {
    it("adds a media query", () => {
      const mediaQuery = new MediaQuery(
        "only screen and (max-width: 500px)",
        "mobile"
      );
      const mediaq = new Mediaq().mediaQuery(
        "only screen and (max-width: 500px)",
        "mobile"
      );

      expect(mediaq.mediaQueries()).toEqual([mediaQuery]);
    });
  });

  describe("start", () => {
    it("starts listening", () => {
      const mediaq = new Mediaq();

      expect(mediaq.listening).toBeFalse();

      mediaq.start();

      expect(mediaq.listening).toBeTrue();
    });

    it("throws if already listening", () => {
      const mediaq = new Mediaq().start();

      expect(() => mediaq.start()).toThrow(
        new Error("This Mediaq instance has already started")
      );
    });
  });

  describe("stop", () => {
    it("stops listening", () => {
      const mediaq = new Mediaq().start();

      expect(mediaq.listening).toBeTrue();

      mediaq.stop();

      expect(mediaq.listening).toBeFalse();
    });

    it("throws if not already listening", () => {
      const mediaq = new Mediaq();

      expect(() => mediaq.stop()).toThrow(
        new Error("This Mediaq instance is not started")
      );
    });
  });
});
