# snippet-copy-button

`snippet-copy-button` is a small custom element that renders a real button and copies the text provided through its `clipboardText` property.

If the Clipboard API is not available, the component hides itself.

## Usage

```html
<snippet-copy-button>Copy</snippet-copy-button>
```

```ts
const copyButton = document.querySelector("snippet-copy-button");

if (copyButton) {
  copyButton.clipboardText = "npm i mediaq";
}
```

## Notes

- The element turns its light DOM content into the button label.
- `clipboardText` must be set before the user clicks.
- The component keeps the host as a wrapper and renders an actual `<button>` inside it.
