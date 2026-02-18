import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = toString(tree);
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    data.astro.frontmatter.minutesRead = `${minutes} min read`;
    data.astro.frontmatter.wordCount = words;
  };
}
