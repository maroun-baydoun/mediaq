export type MediaQuery = {
  media: string;
  name: string;
};

export type OnUpdateListenerArg = MediaQuery & {
  matches: boolean;
};

export type OnUpdateListener = (mediaQuery: OnUpdateListenerArg) => void;

export type MediaqArgs = {
  onUpdate: OnUpdateListener;
  mediaQueries: MediaQuery[];
};

export const Mediaq = ({ onUpdate, mediaQueries }: MediaqArgs) => {
  let listening = false;

  const indexedMediaQueries: {
    [media: string]: MediaQuery;
  } = mediaQueries.reduce(
    (prev, mediaQuery) => ({
      ...prev,
      [mediaQuery.media]: mediaQuery,
    }),
    {}
  );

  const mediaQueryLists = Object.keys(indexedMediaQueries).map((media) =>
    window.matchMedia(media)
  );

  function mediaQueryListChangeListener(event: MediaQueryListEvent): void {
    if (!(event.media in indexedMediaQueries)) {
      return;
    }

    const mediaQuery = indexedMediaQueries[event.media];

    onUpdate({
      name: mediaQuery.name,
      media: mediaQuery.media,
      matches: event.matches,
    });
  }

  function start() {
    if (listening) {
      return;
    }

    for (const mediaQueryList of mediaQueryLists) {
      mediaQueryList.addEventListener("change", mediaQueryListChangeListener);

      const mediaQuery = indexedMediaQueries[mediaQueryList.media];

      if (mediaQuery) {
        onUpdate({
          name: mediaQuery.name,
          media: mediaQuery.media,
          matches: mediaQueryList.matches,
        });
      }
    }

    listening = true;
  }

  function stop() {
    if (!listening) {
      return;
    }

    for (const mediaQueryList of mediaQueryLists) {
      mediaQueryList.removeEventListener(
        "change",
        mediaQueryListChangeListener
      );
    }

    listening = false;
  }

  function isListening(): boolean {
    return listening;
  }

  return {
    start,
    stop,
    isListening,
  };
};
