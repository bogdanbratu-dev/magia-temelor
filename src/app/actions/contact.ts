"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Te rugăm să introduci numele tău."),
  phone: z.string().trim().min(6, "Te rugăm să introduci un număr de telefon valid."),
  email: z.email("Te rugăm să introduci un email valid.").optional().or(z.literal("")),
  message: z.string().trim().min(5, "Te rugăm să scrii un mesaj scurt."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datele completate nu sunt valide.";
    return { status: "error", message: firstError };
  }

  const { name, phone, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return {
      status: "error",
      message:
        "Formularul nu este configurat încă pentru trimitere automată. Te rugăm să ne suni sau să ne scrii direct.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Magia Temelor <site@resend.dev>",
        to: [toEmail],
        reply_to: email || undefined,
        subject: `Mesaj nou de pe site de la ${name}`,
        text: `Nume: ${name}\nTelefon: ${phone}\nEmail: ${email || "-"}\n\nMesaj:\n${message}`,
      }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "A apărut o eroare la trimitere. Te rugăm să ne suni direct.",
      };
    }

    return {
      status: "success",
      message: "Mulțumim! Ți-am primit mesajul și revenim cât mai curând.",
    };
  } catch {
    return {
      status: "error",
      message: "A apărut o eroare la trimitere. Te rugăm să ne suni direct.",
    };
  }
}
