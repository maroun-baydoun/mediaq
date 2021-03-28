export const create = (mediaQuery: string, inheritsEvenTarget = true) => {
  const listeners: { [event: string]: Function[] } = {};

  return (matches: boolean) => ({
    matches,
    media: mediaQuery,
    addEventListener: undefined,
    removeEventListener: undefined,
    ...(inheritsEvenTarget && {
      addEventListener: jasmine
        .createSpy()
        .and.callFake((event: string, listener: Function) =>
          event in listeners
            ? listeners[event].push(listener)
            : (listeners[event] = [listener])
        ),
      removeEventListener: jasmine.createSpy(),
    }),

    addListener: jasmine.createSpy().and.callFake((listener: Function) => {
      "change" in listeners
        ? listeners["change"].push(listener)
        : (listeners["change"] = [listener]);
    }),
    removeListener: jasmine.createSpy(),
    onchange: jasmine.createSpy(),
    dispatchEvent: jasmine
      .createSpy()
      .and.callFake((event: string, arg: any) => {
        listeners[event].forEach((listener) => {
          listener({ ...arg, media: mediaQuery });
        });
      }),
  });
};
