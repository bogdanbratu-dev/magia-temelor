"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-navy-950 mb-1.5">
          Parolă
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-xl border border-navy-950/15 bg-white px-4 py-3 text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
        />
      </div>

      {state?.error ? (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-gold-500 px-4 py-3 font-semibold text-navy-950 hover:bg-gold-400 transition-colors disabled:opacity-60"
      >
        {isPending ? "Se verifică..." : "Intră în panou"}
      </button>
    </form>
  );
}
