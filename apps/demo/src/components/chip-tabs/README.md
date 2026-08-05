# chip-tabs

`chip-tabs` is a lightweight custom element for tabbed content. It wires a tab list, tab buttons, and tab panels using `data-*` attributes, then handles the active state and keyboard navigation.

It expects:

- one element with `data-tablist`
- one or more buttons with `data-tab`
- one or more panels with `data-tab-panel`
- an optional `data-default-tab` attribute on the host

## Usage

```html
<chip-tabs data-default-tab="npm" id="install-tabs">
  <div data-tablist aria-label="Package manager">
    <button type="button" data-tab="npm">npm</button>
    <button type="button" data-tab="pnpm">pnpm</button>
    <button type="button" data-tab="yarn">yarn</button>
  </div>

  <div data-tab-panels>
    <section data-tab-panel="npm">npm panel</section>
    <section data-tab-panel="pnpm">pnpm panel</section>
    <section data-tab-panel="yarn">yarn panel</section>
  </div>
</chip-tabs>
```

## Notes

- The first matching tab becomes active if `data-default-tab` is omitted.
- Arrow keys, `Home`, and `End` move between tabs.
- Panels are stacked in the same grid cell so the layout stays stable while switching tabs.
