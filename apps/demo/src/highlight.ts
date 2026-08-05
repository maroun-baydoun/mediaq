type SnippetLanguage = "typescript" | "shell";

const tsKeywords = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
]);

const shellKeywords = new Set(["npm", "pnpm", "yarn", "install", "add"]);

const punctuation = new Set(["{", "}", "(", ")", "[", "]", ",", ";", "."]);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const wrap = (kind: string, value: string) =>
  `<span class="token-${kind}">${escapeHtml(value)}</span>`;

const renderTypeScript = (source: string) => {
  const tokens: string[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];

    if (/\s/.test(char)) {
      let end = index + 1;
      while (end < source.length && /\s/.test(source[end])) {
        end += 1;
      }
      tokens.push(escapeHtml(source.slice(index, end)));
      index = end;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      const quote = char;
      let end = index + 1;
      while (end < source.length) {
        if (source[end] === "\\" && end + 1 < source.length) {
          end += 2;
          continue;
        }

        if (source[end] === quote) {
          end += 1;
          break;
        }

        end += 1;
      }

      tokens.push(wrap("string", source.slice(index, end)));
      index = end;
      continue;
    }

    if (char === "=" && source[index + 1] === ">") {
      tokens.push(wrap("operator", "=>"));
      index += 2;
      continue;
    }

    if (char === "=") {
      tokens.push(wrap("operator", "="));
      index += 1;
      continue;
    }

    if (punctuation.has(char)) {
      tokens.push(wrap("punctuation", char));
      index += 1;
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      let end = index + 1;
      while (end < source.length && /[A-Za-z0-9_$]/.test(source[end])) {
        end += 1;
      }

      const word = source.slice(index, end);
      tokens.push(
        tsKeywords.has(word) ? wrap("keyword", word) : wrap("identifier", word),
      );
      index = end;
      continue;
    }

    tokens.push(escapeHtml(char));
    index += 1;
  }

  return tokens.join("");
};

const renderShell = (source: string) =>
  source
    .split("\n")
    .map((line) =>
      line
        .split(/(\s+)/)
        .map((part) => {
          if (!part) {
            return part;
          }

          if (/^\s+$/.test(part)) {
            return escapeHtml(part);
          }

          if (shellKeywords.has(part)) {
            return wrap("keyword", part);
          }

          if (part.startsWith("-")) {
            return wrap("operator", part);
          }

          if (/^[A-Za-z0-9@._/-]+$/.test(part)) {
            return wrap("identifier", part);
          }

          return escapeHtml(part);
        })
        .join(""),
    )
    .join("\n");

export function renderHighlightedCode(
  source: string,
  language: SnippetLanguage = "typescript",
) {
  if (language === "shell") {
    return renderShell(source);
  }

  return renderTypeScript(source);
}
