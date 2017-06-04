
export class MediaQuery {

    private _media: string;
    private _mediaQueryList: MediaQueryList;

    public constructor(media: string) {
        this._media = media;
        this._mediaQueryList = window.matchMedia(media);
    }

    get media(): string {
        return this._media;
    }

    get mediaQueryList(): MediaQueryList {
        return this._mediaQueryList;
    }

    get matched(): boolean {
        return this._mediaQueryList.matches;
    }

    public toString(): string {
        return this._media;
    }

}

export interface MediaQueryMatchChangedListener {
    (mediaQuery: MediaQuery): void;
}


export class Mediaq {
    private _mediaQueries: {[id: string]: MediaQuery};
    private _listeners: Array<MediaQueryMatchChangedListener>;
    private _listening: boolean = false;
    private _mediaQueryListListener: MediaQueryListListener = (mediaQueryList: MediaQueryList) => {
        let mediaQuery: MediaQuery | undefined = this._mediaQueries[mediaQueryList.media];

        if (mediaQuery) {
            this.invokeListeners(mediaQuery);
        }
    }

    public constructor() {

        this._mediaQueries = {};
        this._listeners = [];

    }

    get listening(): boolean {

        return this._listening;
    }

    public fromStyleSheets(): Mediaq {

        let sheets: StyleSheetList = document.styleSheets,
            length: number = sheets.length,
            sheet: CSSStyleSheet,
            rules: CSSRuleList,
            rule: CSSRule,
            mediaList: MediaList,
            mediaQueryList: MediaQueryList,
            i: number = length,
            j: number = 0;

        while (i--) {

            sheet = <CSSStyleSheet>sheets[i];
            rules = sheet.cssRules;

            if (rules) {

                j = rules.length;

                while (j--) {

                    rule = rules[j];

                    if (rule.constructor === CSSMediaRule) {
                        mediaList = (<CSSMediaRule>rule).media;
                        this.addMediaQuery(mediaList.mediaText);
                    }
                }
            }

        }

        return this;
    }

    public mediaQuery(media: string): Mediaq {

        this.addMediaQuery(media);

        return this;
    }


    public onMediaQueryMatchedChanged(listener: MediaQueryMatchChangedListener): Mediaq {

        this._listeners.push(listener);

        return this;
    }

    public offMediaQueryMatchedChanged(listener: MediaQueryMatchChangedListener): Mediaq {

        let length: number = this._listeners.length,
            i: number = length;

        while (i--) {
            if (this._listeners[i] === listener) {
                this._listeners.splice(i, 1);
                break;
            }
        }

        return this;
    }

    public start(): Mediaq {

        let media: string,
            mediaQuery: MediaQuery;

        if (this._listening) {
            throw new Error("This Mediaq intance has already started");
        }

        for (media in this._mediaQueries) {
          if (this.hasMediaQuery(media)) {
            mediaQuery = this._mediaQueries[media];
            this.listenToMediaQueryChanges(mediaQuery);
          }
        }

        this._listening = true;

        return this;
    }

    public stop(): Mediaq {

      let media: string,
          mediaQuery: MediaQuery;

        if (!this._listening) {
            throw new Error("This Mediaq intance is not started");
        }

        for (media in this._mediaQueries) {
          if (this.hasMediaQuery(media)) {
            mediaQuery = this._mediaQueries[media];
            mediaQuery.mediaQueryList.removeListener(this._mediaQueryListListener);
          }
        }

        this._listening = false;

        return this;
    }

    public mediaQueries(): Array<MediaQuery> {
        let mediaQueries = new Array<MediaQuery>(),
            media: string;

        for (media in this._mediaQueries) {
          if (this.hasMediaQuery(media)) {
                mediaQueries.push(this._mediaQueries[media]);
            }
          }

        return mediaQueries;
    }

    private addMediaQuery(media: string): void {

        let mediaQuery = new MediaQuery(media);

        if (this._listening) {

            this.listenToMediaQueryChanges(mediaQuery);
        }

        this._mediaQueries[media] = mediaQuery;
    }

    private listenToMediaQueryChanges(mediaQuery: MediaQuery): void {

        this.invokeListeners(mediaQuery);

        mediaQuery.mediaQueryList.addListener(this._mediaQueryListListener);

    }

    private invokeListeners(mediaQuery: MediaQuery): void {
        if (this._listeners.length > 0) {

            let length = this._listeners.length,
                listener: MediaQueryMatchChangedListener,
                j = length;

            while (j--) {

                listener = this._listeners[j];

                listener.call(this, mediaQuery);
            }
        }
    }

  private hasMediaQuery(media: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._mediaQueries, media);
  }
}
