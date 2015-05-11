
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
    private _mediaLists: Array<MediaList>;
    private _mediaQueryLists: Array<MediaQueryList>;
    private _listeners: Array<MediaQueryMatchChangedListener>;

    public constructor() {
        this._mediaLists = [];
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
            ruleMediaText: string = null,
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
                    this._mediaLists.push(mediaList);

                }
            }

        }

        return this;
    }

    public onMediaQueriesMatched(listener: MediaQueryMatchChangedListener): Mediaq {

        this._listeners.push(listener);

        return this;
    }

    public listen(): Mediaq {

        var length: number = this._mediaQueryLists.length,
            i: number = length,
            self: Mediaq = this,
            mediaQueryList: MediaQueryList = null;


        while (i--) {

            mediaQueryList = this._mediaQueryLists[i];

            mediaQueryList.addListener(function(event) {
                if (self._listeners.length > 0) {
                    length = self._listeners.length;
                    var listener: Function = null,
                        mediaQuery: MediaQuery = null,
                        j = length;

                    while (j--) {

                        mediaQuery = new MediaQuery(event.media);

                        listener = self._listeners[j];

                        listener.call(self, mediaQuery, event.matches);
                    }
                }
            });

        }

        return this;
    }

    public match(): Mediaq {

        var length: number = this._mediaLists.length,
            i: number = length,
            mediaList: MediaList = null,
            mediaQueryList: MediaQueryList = null,
            matches: boolean = false;


        while (i--) {

            mediaList = this._mediaLists[i];
            mediaQueryList = window.matchMedia(mediaList.mediaText);

            this._mediaQueryLists.push(mediaQueryList);

            matches = mediaQueryList.matches;

            if (this._listeners.length > 0) {
                length = this._listeners.length;
                var listener: Function = null,
                    mediaQuery: MediaQuery = null,
                    j = length;

                while (j--) {

                    mediaQuery = new MediaQuery(mediaQueryList.media);

                    listener = this._listeners[j];

                    listener.call(this, mediaQuery, matches);
                }
            }
        }

        return this;
    }


    public reset(): void {

        this._mediaLists = [];
        this._mediaQueryLists = [];
        this._listeners = [];
    }


}
