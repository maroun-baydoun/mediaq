
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

};

export interface MediaQueryMatchChangedListener {
    (mediaQuery: MediaQuery): void;
}

export class Mediaq {
    private _mediaQueries: collections.Dictionary<string, MediaQuery>;
    private _listeners: Array<MediaQueryMatchChangedListener>;
    private _listening: boolean = false;
    private _mediaQueryListListener: MediaQueryListListener = (mediaQueryList: MediaQueryList) => {
        var mediaQuery: MediaQuery = this._mediaQueries.getValue(mediaQueryList.media);

        if (mediaQuery) {
            this.invokeListeners(mediaQuery);
        }
    };

    public constructor() {

        this._mediaQueries = new collections.Dictionary<string, MediaQuery>();
        this._listeners = [];

    }

    get listening(): boolean {

        return this._listening;
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

        var length: number = this._listeners.length,
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

        if (this._listening) {
            throw new Error("This Mediaq intance has already started");
        }

        this._mediaQueries.forEach((media: string, mediaQuery: MediaQuery) => {
            this.listenToMediaQueryChanges(mediaQuery);
        });

        this._listening = true;

        return this;
    }

    public stop(): Mediaq {

        if (!this._listening) {
            throw new Error("This Mediaq intance is not started");
        }

        this._mediaQueries.forEach((media: string, mediaQuery: MediaQuery) => {
            mediaQuery.mediaQueryList.removeListener(this._mediaQueryListListener);
        });

        this._listening = false;

        return this;
    }

    public mediaQueries(): Array<MediaQuery> {

        return this._mediaQueries.values();
    }

    private addMediaQuery(media: string): void {

        var mediaQuery: MediaQuery = new MediaQuery(media);

        if (this._listening) {

            this.listenToMediaQueryChanges(mediaQuery);
        }

        this._mediaQueries.setValue(media, mediaQuery);
    }

    private listenToMediaQueryChanges(mediaQuery: MediaQuery): void {

        this.invokeListeners(mediaQuery);

        mediaQuery.mediaQueryList.addListener(this._mediaQueryListListener);

    }

    private invokeListeners(mediaQuery: MediaQuery): void {
        if (this._listeners.length > 0) {

            var length = this._listeners.length,
                listener: MediaQueryMatchChangedListener = null,
                j = length;

            while (j--) {

                listener = this._listeners[j];

                listener.call(this, mediaQuery);
            }
        }
    };
}

// From https://github.com/basarat/typescript-collections by Basarat Ali Syed.
// Licensed under MIT open source license http://opensource.org/licenses/MIT
module collections {
    var _hasOwnProperty = Object.prototype.hasOwnProperty,
        has = function(obj, prop) {
            return _hasOwnProperty.call(obj, prop);
        };

    function isString(obj: any): boolean {
        return Object.prototype.toString.call(obj) === "[object String]";
    }

    function isUndefined(obj: any): boolean {
        return (typeof obj) === "undefined";
    }

    function defaultToString(item: any): string {
        if (item === null) {
            return "COLLECTION_NULL";
        } else if (isUndefined(item)) {
            return "COLLECTION_UNDEFINED";
        } else if (isString(item)) {
            return "$s" + item;
        } else {
            return "$o" + item.toString();
        }
    }

    interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }

    export class Dictionary<K, V>{


        private table: { [key: string]: IDictionaryPair<K, V> };

        private nElements: number;

        private toStr: (key: K) => string;

        constructor(toStrFunction?: (key: K) => string) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || defaultToString;
        }

        getValue(key: K): V {
            var pair: IDictionaryPair<K, V> = this.table["$" + this.toStr(key)];
            if (isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        }

        setValue(key: K, value: V): V {

            if (isUndefined(key) || isUndefined(value)) {
                return undefined;
            }

            var ret: V;
            var k = "$" + this.toStr(key);
            var previousElement: IDictionaryPair<K, V> = this.table[k];
            if (isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        }

        remove(key: K): V {
            var k = "$" + this.toStr(key);
            var previousElement: IDictionaryPair<K, V> = this.table[k];
            if (!isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        }

        keys(): K[] {
            var array: K[] = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        }

        values(): V[] {
            var array: V[] = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        }

        forEach(callback: (key: K, value: V) => any): void {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair: IDictionaryPair<K, V> = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        }

        containsKey(key: K): boolean {
            return !isUndefined(this.getValue(key));
        }


        clear() {

            this.table = {};
            this.nElements = 0;
        }

        size(): number {
            return this.nElements;
        }

        isEmpty(): boolean {
            return this.nElements <= 0;
        }

        toString(): string {
            var toret = "{";
            this.forEach((k, v) => {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        }
    }
}
