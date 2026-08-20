import { Phone, MessageCircle } from "lucide-react";

export function StickyMobileBar({ phone }: { phone: string }) {
  const digits = phone.replace(/\s+/g, "");
  const waDigits = digits.startsWith("0") ? `4${digits}` : digits;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-navy-950/10 bg-cream-50/95 backdrop-blur px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex gap-2.5">
      <a
        href={`tel:${digits}`}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy-950 text-cream-50 py-3 text-sm font-semibold"
      >
        <Phone className="h-4 w-4" />
        Sună acum
      </a>
      <a
        href={`https://wa.me/${waDigits}`}
        target="_blank"
        rel="noreferrer noopener"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 text-navy-950 py-3 text-sm font-semibold"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
