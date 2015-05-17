
export class MediaQuery {

    private _value: string;

    public constructor(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

};

export interface MediaQueryMatchChangedListener {
    (mediaQuery: MediaQuery, matched: boolean): void;
}

export class Mediaq {
    private _mediaQueryLists: Array<MediaQueryList>;
    private _listeners: Array<MediaQueryMatchChangedListener>;
    private _listening: boolean = false;

    public constructor() {

        this._mediaQueryLists = [];
        this._listeners = [];

    }


    public fromStyleSheets(): Mediaq {

        var sheets: StyleSheetList = document.styleSheets,
            length: number = sheets.length,
            sheet: CSSStyleSheet = null,
            rules: CSSRuleList = null,
            rule: CSSRule = null,
            mediaList: MediaList = null,
            mediaQueryList: MediaQueryList = null,
            i: number = length,
            j: number = 0;

        while (i--) {

            sheet = <CSSStyleSheet>sheets[i];
            rules = sheet.cssRules;
            j = rules.length;

            while (j--) {

                rule = rules[j];

                if (rule.constructor === CSSMediaRule) {
                    mediaList = (<CSSMediaRule>rule).media;
                    this.addMediaQuery(mediaList.mediaText);
                }
            }

        }

        return this;
    }

    public mediaQuery(media: string): Mediaq {

      this.addMediaQuery(media);

      return this;
    }


    public onMediaQueryMatched(listener: MediaQueryMatchChangedListener): Mediaq {

      this._listeners.push(listener);

      return this;
    }

    public start(): Mediaq {

      if (this._listening) {
        throw new Error("This Mediaq intance has already started");
      }

      var length = this._mediaQueryLists.length,
          i = length;

      while (i--) {
        this.listenToMediaQueryChanges(this._mediaQueryLists[i]);
      }

      this._listening = true;

      return this;
    }

    private addMediaQuery(media: string): void {

      var mediaQueryList = window.matchMedia(media);

      if (this._listening) {

        this.listenToMediaQueryChanges(mediaQueryList);
      }

      this._mediaQueryLists.push(mediaQueryList);
    }

    private listenToMediaQueryChanges(mediaQueryList : MediaQueryList): void {

      var invokeListeners = (media: string, matches: boolean) => {
        if (this._listeners.length > 0) {
            length = this._listeners.length;
            var listener: Function = null,
                mediaQuery: MediaQuery = new MediaQuery(media),
                j = length;

            while (j--) {

                listener = this._listeners[j];

                listener.call(this, mediaQuery, matches);
            }
        }
      };

      invokeListeners(mediaQueryList.media, mediaQueryList.matches);

      mediaQueryList.addListener(function(event) {
        invokeListeners(event.media, event.matches);
      });
    }
}
