"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE } from "@/lib/auth";
import { saveSiteContent } from "@/lib/content";
import { uploadImage } from "@/lib/images";
import type { SiteContent } from "@/lib/types";

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function saveContentAction(
  content: SiteContent
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await saveSiteContent(content);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch {
    return { ok: false, error: "Salvarea a eșuat. Verifică conexiunea și încearcă din nou." };
  }
}

export async function uploadImageAction(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "misc");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Niciun fișier selectat." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Fișierul trebuie să fie o imagine." };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { ok: false, error: "Imaginea este prea mare (maxim 8MB)." };
  }

  try {
    const url = await uploadImage(file, folder);
    return { ok: true, url };
  } catch {
    return { ok: false, error: "Încărcarea imaginii a eșuat. Încearcă din nou." };
  }
}
