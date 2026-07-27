import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, "..", "src", "content", "posts");

function walk(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (file === "index.md") {
      results.push(full);
    }
  }
  return results;
}

function getDescription(body) {
  const lines = body.split(/\r?\n/);
  const out = [];

  for (const line of lines) {
    const t = line.trim();

    if (
      !t ||
      t.startsWith("#") ||
      t.startsWith("!") ||
      t.startsWith(">") ||
      t.startsWith("*") ||
      t.startsWith("-")
    ) continue;

    out.push(t);

    if (out.join(" ").length > 170) break;
  }

  let text = out.join(" ");

  text = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");

  if (text.length > 160)
    text = text.substring(0,157).trim() + "...";

  return text;
}

const posts = walk(POSTS_DIR);

let converted = 0;

for (const file of posts) {

  const text = fs.readFileSync(file,"utf8");

  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!m) continue;

  const front = m[1];
  const body = m[2];

  const title = front.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
  const date = front.match(/date:\s*([0-9-]+)/)?.[1] ?? "";
  const cover = front.match(/coverImage:\s*"([^"]+)"/)?.[1] ?? "";

  const cat =
    front.match(/categories:\s*\n\s*-\s*"([^"]+)"/)?.[1] ??
    front.match(/categories:\s*\n\s*-\s*([^\n]+)/)?.[1] ??
    "others";

  const description = getDescription(body);

  let output = `---
title: "${title}"
description: "${description}"
pubDatetime: ${date}T00:00:00Z
tags:
  - ${cat}
`;

  if (cover) {
    output += `ogImage: "./images/${cover}"\n`;
  }

  output += `---\n\n${body}`;

  fs.writeFileSync(file, output);

  converted++;
}

console.log(`✅ Converted ${converted} posts.`);