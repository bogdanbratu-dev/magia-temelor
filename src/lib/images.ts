import "server-only";
import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const LOCAL_UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function safeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
  return allowed.includes(ext) ? ext : ".jpg";
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = safeExtension(file.name);
  const filename = `${folder}/${randomUUID()}${ext}`;

  if (hasBlob()) {
    const blob = await put(`uploads/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const destDir = path.join(LOCAL_UPLOADS_DIR, folder);
  await fs.mkdir(destDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const destPath = path.join(destDir, `${randomUUID()}${ext}`);
  await fs.writeFile(destPath, buffer);
  const relative = path.relative(path.join(process.cwd(), "public"), destPath).replace(/\\/g, "/");
  return `/${relative}`;
}
