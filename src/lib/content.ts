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

export async function getSiteContent(): Promise<SiteContent> {
  const saved = hasBlob() ? await readBlobContent() : await readLocalContent();
  return mergeWithDefaults(DEFAULT_CONTENT, saved);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (hasBlob()) {
    await writeBlobContent(content);
  } else {
    await writeLocalContent(content);
  }
}

export function isStorageConfigured(): boolean {
  return hasBlob() || process.env.NODE_ENV !== "production";
}
