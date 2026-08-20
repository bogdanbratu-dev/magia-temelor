"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, checkAdminPassword, createSessionToken } from "@/lib/auth";

export type LoginState = { error: string } | null;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  let isValid: boolean;
  try {
    isValid = checkAdminPassword(password);
  } catch {
    return { error: "Configurarea serverului este incompletă. Contactează administratorul tehnic." };
  }

  if (!isValid) {
    return { error: "Parolă incorectă. Încearcă din nou." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}
