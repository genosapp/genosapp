import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "insights");

export type Faq = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  keywords: string[];
  faqs: Faq[];
};

export type Post = PostMeta & { html: string };

marked.setOptions({ gfm: true, breaks: false });

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function getPost(slug: string): Post | undefined {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    readingTime: estimateReadingTime(content),
    tags: Array.isArray(data.tags) ? data.tags : [],
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs.filter((f: unknown): f is Faq =>
          Boolean(f && typeof f === "object" && "q" in f && "a" in f)
        )
      : [],
    html,
  };
}

export function getAllPosts(): Post[] {
  return readSlugs()
    .map((slug) => getPost(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllPostMeta(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ html, ...meta }) => meta);
}
