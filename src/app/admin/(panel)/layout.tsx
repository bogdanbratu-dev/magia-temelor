import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: "Panou de administrare",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-30 border-b border-navy-950/10 bg-navy-950 text-cream-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-lg leading-tight">Magia Temelor</p>
            <p className="text-xs text-cream-100/60">Panou de administrare</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/statistici"
              className="text-sm text-cream-100/80 hover:text-white underline underline-offset-2"
            >
              Statistici
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-cream-100/80 hover:text-white underline underline-offset-2"
            >
              Vezi site-ul live
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition-colors"
              >
                Deconectare
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
