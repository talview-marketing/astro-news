import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import getReadingTime from "reading-time";
import { toString as ConvertToString } from "mdast-util-to-string";

export function modifiedTime() {
  return (_, file) => {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    if (result.toString().length > 0 || result.toString() === "") {
      const result = statSync(filepath);
      file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
    } else {
      file.data.astro.frontmatter.lastModified = result.toString();
    }
  };
}
export function readingTime() {
  return (tree, { data }) => {
    const textOnPage = ConvertToString(tree);
    const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 180 });

    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
