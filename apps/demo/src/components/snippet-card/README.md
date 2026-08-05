# snippet-card

`snippet-card` renders a code sample card with optional title and language labels, plus a copy button wired to the highlighted code inside the card.

The component:

- reads the rendered code text from `code[data-code]`
- sets `inline` automatically when the code is a single line
- passes the code text to `snippet-copy-button`
- reads `title` and `language-label` from the host element

## Usage

```html
<snippet-card title="Example" language-label="TypeScript">
  <div data-snippet-header>
    <span data-snippet-title></span>
    <span data-snippet-language></span>
  </div>

  <pre><code data-code="example" data-language="typescript"></code></pre>

  <snippet-copy-button>Copy</snippet-copy-button>
</snippet-card>
```

## Notes

- `data-code` is the hook used by the build step that injects the highlighted source.
- `title` and `language-label` belong on the host element.
- The card adds the `inline` attribute when the code has no newline characters.
