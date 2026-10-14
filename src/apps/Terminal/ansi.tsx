import * as React from "react";

/**
 * Parses ANSI color codes (including 24-bit truecolor used by lolcat) into React spans.
 */
export function formatAnsiToReact(rawText: string): React.ReactNode {
  if (!rawText || (!rawText.includes("\u001b") && !rawText.includes("\x1b"))) {
    return rawText;
  }

  const regex = /(?:\u001b|\x1b)\[([0-9;]+)m/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let currentColor: string | undefined = undefined;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(rawText)) !== null) {
    const textSegment = rawText.slice(lastIndex, match.index);
    if (textSegment) {
      elements.push(
        currentColor ? (
          <span key={elements.length} style={{ color: currentColor }}>
            {textSegment}
          </span>
        ) : (
          textSegment
        )
      );
    }

    const code = match[1];
    if (code === "0") {
      currentColor = undefined;
    } else if (code.startsWith("38;2;")) {
      const parts = code.split(";");
      if (parts.length >= 5) {
        currentColor = `rgb(${parts[2]}, ${parts[3]}, ${parts[4]})`;
      }
    } else if (code === "31") currentColor = "#ff5555";
    else if (code === "32") currentColor = "#50fa7b";
    else if (code === "33") currentColor = "#f1fa8c";
    else if (code === "34") currentColor = "#8be9fd";
    else if (code === "35") currentColor = "#bd93f9";
    else if (code === "36") currentColor = "#ff79c6";
    else if (code === "37") currentColor = "#f8f8f2";

    lastIndex = regex.lastIndex;
  }

  const remaining = rawText.slice(lastIndex);
  if (remaining) {
    elements.push(
      currentColor ? (
        <span key={elements.length} style={{ color: currentColor }}>
          {remaining}
        </span>
      ) : (
        remaining
      )
    );
  }

  return elements;
}

