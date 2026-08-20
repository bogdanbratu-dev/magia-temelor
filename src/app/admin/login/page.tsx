import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Autentificare admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[var(--shadow-card)]">
        <h1 className="font-display text-2xl text-navy-950 text-center mb-1">Magia Temelor</h1>
        <p className="text-sm text-navy-900/60 text-center mb-6">Panou de administrare</p>
        <LoginForm />
      </div>
    </div>
  );
}
