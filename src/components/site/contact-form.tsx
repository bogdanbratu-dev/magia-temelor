"use client";

import { useActionState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-900">
          Nume
          <input
            name="name"
            required
            type="text"
            placeholder="Numele tău"
            className="rounded-xl border border-navy-950/10 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-900">
          Telefon
          <input
            name="phone"
            required
            type="tel"
            placeholder="07xx xxx xxx"
            className="rounded-xl border border-navy-950/10 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-900">
        Email (opțional)
        <input
          name="email"
          type="email"
          placeholder="email@exemplu.ro"
          className="rounded-xl border border-navy-950/10 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-900">
        Mesaj
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Spune-ne despre copilul tău și ce te interesează..."
          className="resize-none rounded-xl border border-navy-950/10 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-950 text-cream-50 px-6 py-3 text-sm font-semibold hover:bg-navy-900 transition-colors disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {pending ? "Se trimite..." : "Trimite mesajul"}
      </button>

      {state.status !== "idle" ? (
        <p
          className={`flex items-start gap-2 text-sm ${
            state.status === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {state.status === "success" ? (
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          )}
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
