import { Evented, Event } from "evented-ts";

export class MediaQuery {

  private _media: string;
  private _name?: string;
  private _mediaQueryList: MediaQueryList;

  public constructor(media: string, name?: string) {
    this._media = media;
    this._name = name;
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

  get name(): string | undefined {
    return this._name;
  }

  public toString(): string {
    return this._media;
  }

}

export type MediaQueryMatchChangedListener = (mediaQuery: MediaQuery) => void;


export class Mediaq {
  private _mediaQueries: { [id: string]: MediaQuery };
  private _eventedMap: { eventedOff: () => void, listener: MediaQueryMatchChangedListener }[] = [];
  private _listening: boolean = false;
  private _mediaQueryListListener: MediaQueryListListener = (mediaQueryList: MediaQueryList) => {
    let mediaQuery: MediaQuery | undefined = this._mediaQueries[mediaQueryList.media];

    if (mediaQuery) {
      this.invokeListeners(mediaQuery);
    }
  }
  private static EVENTED_EVENT_NAME = "mediaQueryMatchedChanged";

  public constructor() {

    this._mediaQueries = {};
  }

  get listening(): boolean {

    return this._listening;
  }

  public fromStyleSheets(href?: RegExp): Mediaq {

    const sheets = document.styleSheets;

    range(sheets.length)
      .map((_, i) => <CSSStyleSheet>sheets[i])
      .filter((sheet) => !href || (sheet.href !== null && (href.test(sheet.href))))
      .map((sheet) => sheet.cssRules)
      .forEach((ruleList) => {
        range(ruleList.length)
          .map((_, j) => ruleList[j])
          .forEach((rule) => {
            const mediaText = mediaTextFromRule(rule);
            const name = nameFromRule(rule);

            if (mediaText) {
              this.addMediaQuery(mediaText, name);
            }
          });
      });

    return this;
  }

  public mediaQuery(media: string, name?: string): Mediaq {

    this.addMediaQuery(media, name);

    return this;
  }


  public onMediaQueryMatchedChanged(listener: MediaQueryMatchChangedListener): Mediaq {
    const eventedListener = (event: Event<MediaQuery>) => {
      if (event.args) {
        listener(event.args);
      }
    };

    const eventedOff = Evented.on(Mediaq.EVENTED_EVENT_NAME, eventedListener);

    this._eventedMap.push({ eventedOff: eventedOff, listener: listener });

    return this;
  }

  public offMediaQueryMatchedChanged(listener?: MediaQueryMatchChangedListener): Mediaq {
    if (!listener) {
      Evented.off(Mediaq.EVENTED_EVENT_NAME);
    } else {
      this._eventedMap = this._eventedMap.filter((l) => {
        if (l.listener !== listener) {
          return l;
        }
        l.eventedOff();
      });
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
      if (hasMediaQuery(this._mediaQueries, media)) {
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
      if (hasMediaQuery(this._mediaQueries, media)) {
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
      if (hasMediaQuery(this._mediaQueries, media)) {
        mediaQueries.push(this._mediaQueries[media]);
      }
    }

    return mediaQueries;
  }

  private addMediaQuery(media: string, name?: string): void {

    let mediaQuery = new MediaQuery(media, name);

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
    if (Evented.listensTo(Mediaq.EVENTED_EVENT_NAME)) {
      Evented.fire<MediaQuery>(Mediaq.EVENTED_EVENT_NAME, mediaQuery);
    }
  }
}

const range = (length: number) => (<any[]>Array.apply(null, { length: length }));

const hasMediaQuery = (mediaQueries: { [id: string]: MediaQuery }, media: string): boolean => {
  return Object.prototype.hasOwnProperty.call(mediaQueries, media);
};

const mediaTextFromRule = (rule: CSSRule): string | undefined => {
  if (rule.constructor === CSSMediaRule) {
    return (<CSSMediaRule>rule).media.mediaText;
  }
};

const nameFromRule = (rule: CSSRule): string | undefined => {
  if (rule.constructor === CSSMediaRule) {
    const mediaRuleRules = (<CSSMediaRule>rule).cssRules;
    if (mediaRuleRules.length && mediaRuleRules[0].type === CSSRule.STYLE_RULE) {
      const mediaqRule = (<CSSStyleRule>mediaRuleRules.item(0));
      if (mediaqRule.selectorText === "mediaq" && mediaqRule.style.content) {
        return mediaqRule.style.content.replace(/"/g, "");
      }
    }
  }
};
