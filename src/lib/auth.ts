import "server-only";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "magia_admin_session";
const SESSION_DURATION = "8h";

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "Lipsește variabila de mediu AUTH_SECRET. Adaug-o în .env.local / setările proiectului Vercel."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      "Lipsește variabila de mediu ADMIN_PASSWORD. Adaug-o în .env.local / setările proiectului Vercel."
    );
  }
  return password === expected;
}
