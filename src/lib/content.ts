import "server-only";
import { list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_CONTENT } from "./default-content";
import { mergeWithDefaults } from "./merge";
import type { SiteContent } from "./types";

const CONTENT_PATHNAME = "content/site-content.json";
const LOCAL_CONTENT_PATH = path.join(process.cwd(), ".data", "site-content.json");

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const hasGithub = () => Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);

function githubContentsUrl(): string {
  const repo = process.env.GITHUB_REPO;
  return `https://api.github.com/repos/${repo}/contents/${CONTENT_PATHNAME}`;
}

function githubHeaders(accept: string): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function readLocalContent(): Promise<unknown | null> {
  try {
    const raw = await fs.readFile(LOCAL_CONTENT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeLocalContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_CONTENT_PATH), { recursive: true });
  await fs.writeFile(LOCAL_CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}

async function readBlobContent(): Promise<unknown | null> {
  const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
  const match = blobs.find((b) => b.pathname === CONTENT_PATHNAME);
  if (!match) return null;
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function writeBlobContent(content: SiteContent): Promise<void> {
  await put(CONTENT_PATHNAME, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readGithubContent(): Promise<unknown | null> {
  const branch = process.env.GITHUB_BRANCH || "master";
  const res = await fetch(`${githubContentsUrl()}?ref=${branch}`, {
    headers: githubHeaders("application/vnd.github.raw+json"),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function writeGithubContent(content: SiteContent): Promise<void> {
  const branch = process.env.GITHUB_BRANCH || "master";

  let sha: string | undefined;
  const existing = await fetch(`${githubContentsUrl()}?ref=${branch}`, {
    headers: githubHeaders("application/vnd.github+json"),
    cache: "no-store",
  });
  if (existing.ok) {
    const data = (await existing.json()) as { sha?: string };
    sha = data.sha;
  }

  const body = JSON.stringify(content, null, 2);
  const res = await fetch(githubContentsUrl(), {
    method: "PUT",
    headers: {
      ...githubHeaders("application/vnd.github+json"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Actualizare conținut site din panoul de administrare",
      content: Buffer.from(body, "utf-8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Salvarea în GitHub a eșuat (${res.status})`);
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const saved = hasBlob()
    ? await readBlobContent()
    : hasGithub()
      ? await readGithubContent()
      : await readLocalContent();
  return mergeWithDefaults(DEFAULT_CONTENT, saved);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (hasBlob()) {
    await writeBlobContent(content);
  } else if (hasGithub()) {
    await writeGithubContent(content);
  } else {
    await writeLocalContent(content);
  }
}

export function isStorageConfigured(): boolean {
  return hasBlob() || hasGithub() || process.env.NODE_ENV !== "production";
}
