
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
                    mediaQueryList = window.matchMedia(mediaList.mediaText);

                    this._mediaQueryLists.push(mediaQueryList);

                }
            }

        }

        return this;
    }


    public onMediaQueryMatched(listener: MediaQueryMatchChangedListener): Mediaq {

        this._listeners.push(listener);

        return this;
    }

    public listen(): Mediaq {

        var length: number = this._mediaQueryLists.length,
            i: number = length,
            self: Mediaq = this,
            mediaQueryList: MediaQueryList = null,
            matches: boolean = false;

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

        while (i--) {

            mediaQueryList = this._mediaQueryLists[i];

            matches = mediaQueryList.matches;

            invokeListeners(mediaQueryList.media, matches);

            mediaQueryList.addListener(function(event) {
              invokeListeners(event.media, event.matches);
            });

        }

        return this;
    }

    public reset(): void {
        this._mediaQueryLists = [];
        this._listeners = [];
    }


}
