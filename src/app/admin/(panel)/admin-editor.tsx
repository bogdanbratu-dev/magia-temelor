"use client";

import { useState } from "react";
import { saveContentAction } from "../actions";
import type {
  SiteContent,
  AboutHighlight,
  PricingTier,
  Activity,
  GalleryImage,
  Testimonial,
} from "@/lib/types";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  ImageUploadField,
  IconPickerField,
  SectionCard,
  ListItemCard,
  AddButton,
} from "./fields";

const TABS = [
  { id: "brand", label: "Brand" },
  { id: "hero", label: "Prima secțiune" },
  { id: "about", label: "Despre noi" },
  { id: "program", label: "Program" },
  { id: "pricing", label: "Prețuri" },
  { id: "activities", label: "Activități" },
  { id: "gallery", label: "Galerie" },
  { id: "testimonials", label: "Testimoniale" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Subsol" },
  { id: "seo", label: "SEO" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("brand");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function updateSection<K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    const result = await saveContentAction(content);
    setSaving(false);
    setStatus(
      result.ok
        ? { ok: true, message: "Modificările au fost salvate." }
        : { ok: false, message: result.error }
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors " +
              (activeTab === tab.id
                ? "bg-navy-950 text-cream-100"
                : "bg-white text-navy-900/70 ring-1 ring-navy-950/10 hover:bg-cream-100")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "brand" ? (
        <SectionCard title="Brand" description="Numele, sloganul și sigla afișate pe tot site-ul.">
          <TextField label="Nume" value={content.brand.name} onChange={(v) => updateSection("brand", { name: v })} />
          <TextField
            label="Slogan"
            value={content.brand.tagline}
            onChange={(v) => updateSection("brand", { tagline: v })}
          />
          <ImageUploadField
            label="Siglă (logo)"
            value={content.brand.logoUrl}
            onChange={(url) => updateSection("brand", { logoUrl: url })}
            folder="brand"
          />
        </SectionCard>
      ) : null}

      {activeTab === "hero" ? (
        <SectionCard
          title="Prima secțiune (Hero)"
          description="Ce vede vizitatorul imediat, în partea de sus a paginii."
        >
          <TextField
            label="Etichetă mică (deasupra titlului)"
            value={content.hero.eyebrow}
            onChange={(v) => updateSection("hero", { eyebrow: v })}
          />
          <TextField
            label="Titlu principal"
            value={content.hero.headline}
            onChange={(v) => updateSection("hero", { headline: v })}
          />
          <TextField
            label="Cuvânt evidențiat din titlu"
            value={content.hero.highlightWord}
            onChange={(v) => updateSection("hero", { highlightWord: v })}
            hint="Acest cuvânt din titlu apare colorat cu auriu."
          />
          <TextAreaField
            label="Text descriptiv"
            value={content.hero.subheadline}
            onChange={(v) => updateSection("hero", { subheadline: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Text buton principal"
              value={content.hero.ctaPrimaryText}
              onChange={(v) => updateSection("hero", { ctaPrimaryText: v })}
            />
            <TextField
              label="Link buton principal"
              value={content.hero.ctaPrimaryLink}
              onChange={(v) => updateSection("hero", { ctaPrimaryLink: v })}
            />
            <TextField
              label="Text buton secundar"
              value={content.hero.ctaSecondaryText}
              onChange={(v) => updateSection("hero", { ctaSecondaryText: v })}
            />
            <TextField
              label="Link buton secundar"
              value={content.hero.ctaSecondaryLink}
              onChange={(v) => updateSection("hero", { ctaSecondaryLink: v })}
            />
          </div>
          <ImageUploadField
            label="Imagine principală"
            value={content.hero.imageUrl}
            onChange={(url) => updateSection("hero", { imageUrl: url })}
            folder="hero"
          />
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-navy-950">
              Cifre rapide (ex: &ldquo;6-11 ani&rdquo;)
            </span>
            {content.hero.stats.map((stat, index) => (
              <ListItemCard
                key={index}
                onRemove={() =>
                  updateSection("hero", { stats: content.hero.stats.filter((_, i) => i !== index) })
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Valoare"
                    value={stat.value}
                    onChange={(v) =>
                      updateSection("hero", {
                        stats: content.hero.stats.map((s, i) => (i === index ? { ...s, value: v } : s)),
                      })
                    }
                  />
                  <TextField
                    label="Etichetă"
                    value={stat.label}
                    onChange={(v) =>
                      updateSection("hero", {
                        stats: content.hero.stats.map((s, i) => (i === index ? { ...s, label: v } : s)),
                      })
                    }
                  />
                </div>
              </ListItemCard>
            ))}
            <AddButton
              label="Adaugă cifră"
              onClick={() =>
                updateSection("hero", { stats: [...content.hero.stats, { value: "", label: "" }] })
              }
            />
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "about" ? (
        <SectionCard title="Despre noi" description="Prezentarea afterschool-ului și punctele forte.">
          <TextField label="Titlu" value={content.about.title} onChange={(v) => updateSection("about", { title: v })} />
          <TextAreaField
            label="Text"
            value={content.about.text}
            onChange={(v) => updateSection("about", { text: v })}
            rows={5}
          />
          <ImageUploadField
            label="Imagine"
            value={content.about.imageUrl}
            onChange={(url) => updateSection("about", { imageUrl: url })}
            folder="about"
          />
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-navy-950">Puncte forte (cardurile cu iconițe)</span>
            {content.about.highlights.map((item, index) => (
              <ListItemCard
                key={item.id}
                onRemove={() =>
                  updateSection("about", { highlights: content.about.highlights.filter((_, i) => i !== index) })
                }
                onMoveUp={
                  index > 0
                    ? () => updateSection("about", { highlights: moveItem(content.about.highlights, index, -1) })
                    : undefined
                }
                onMoveDown={
                  index < content.about.highlights.length - 1
                    ? () => updateSection("about", { highlights: moveItem(content.about.highlights, index, 1) })
                    : undefined
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Titlu"
                    value={item.title}
                    onChange={(v) => updateHighlight(content, updateSection, index, { title: v })}
                  />
                  <IconPickerField
                    label="Iconiță"
                    value={item.icon}
                    onChange={(v) => updateHighlight(content, updateSection, index, { icon: v })}
                  />
                </div>
                <TextAreaField
                  label="Text"
                  value={item.text}
                  onChange={(v) => updateHighlight(content, updateSection, index, { text: v })}
                />
              </ListItemCard>
            ))}
            <AddButton
              label="Adaugă punct forte"
              onClick={() =>
                updateSection("about", {
                  highlights: [
                    ...content.about.highlights,
                    { id: newId(), icon: "sparkles", title: "", text: "" },
                  ],
                })
              }
            />
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "program" ? (
        <SectionCard title="Program" description="Orarul și informațiile despre desfășurarea programului.">
          <TextField
            label="Titlu"
            value={content.program.title}
            onChange={(v) => updateSection("program", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.program.description}
            onChange={(v) => updateSection("program", { description: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Grupe de vârstă"
              value={content.program.ageGroups}
              onChange={(v) => updateSection("program", { ageGroups: v })}
            />
            <TextField
              label="Zile"
              value={content.program.days}
              onChange={(v) => updateSection("program", { days: v })}
            />
            <TextField
              label="Ora de preluare"
              value={content.program.pickupTime}
              onChange={(v) => updateSection("program", { pickupTime: v })}
            />
            <TextField
              label="Ora de final"
              value={content.program.endTime}
              onChange={(v) => updateSection("program", { endTime: v })}
            />
          </div>
          <TextAreaField
            label="Notă suplimentară"
            value={content.program.extraNote}
            onChange={(v) => updateSection("program", { extraNote: v })}
          />
        </SectionCard>
      ) : null}

      {activeTab === "pricing" ? (
        <SectionCard title="Prețuri" description="Pachetele și tarifele afișate în secțiunea Program.">
          <TextField
            label="Titlu"
            value={content.pricing.title}
            onChange={(v) => updateSection("pricing", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.pricing.description}
            onChange={(v) => updateSection("pricing", { description: v })}
          />
          <TextAreaField
            label="Notă (sub prețuri)"
            value={content.pricing.note}
            onChange={(v) => updateSection("pricing", { note: v })}
          />
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-navy-950">Pachete</span>
            {content.pricing.tiers.map((tier, index) => (
              <ListItemCard
                key={tier.id}
                onRemove={() =>
                  updateSection("pricing", { tiers: content.pricing.tiers.filter((_, i) => i !== index) })
                }
                onMoveUp={
                  index > 0
                    ? () => updateSection("pricing", { tiers: moveItem(content.pricing.tiers, index, -1) })
                    : undefined
                }
                onMoveDown={
                  index < content.pricing.tiers.length - 1
                    ? () => updateSection("pricing", { tiers: moveItem(content.pricing.tiers, index, 1) })
                    : undefined
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Nume pachet"
                    value={tier.name}
                    onChange={(v) => updateTier(content, updateSection, index, { name: v })}
                  />
                  <TextField
                    label="Preț"
                    value={tier.price}
                    onChange={(v) => updateTier(content, updateSection, index, { price: v })}
                  />
                  <TextField
                    label="Perioadă (ex: lei / lună)"
                    value={tier.period}
                    onChange={(v) => updateTier(content, updateSection, index, { period: v })}
                  />
                  <CheckboxField
                    label="Evidențiat (recomandat)"
                    checked={tier.highlighted}
                    onChange={(v) => updateTier(content, updateSection, index, { highlighted: v })}
                  />
                </div>
                <TextAreaField
                  label="Beneficii (câte unul pe rând)"
                  value={tier.features.join("\n")}
                  onChange={(v) => updateTier(content, updateSection, index, { features: v.split("\n") })}
                  rows={5}
                />
              </ListItemCard>
            ))}
            <AddButton
              label="Adaugă pachet"
              onClick={() =>
                updateSection("pricing", {
                  tiers: [
                    ...content.pricing.tiers,
                    { id: newId(), name: "", price: "", period: "lei / lună", highlighted: false, features: [] },
                  ],
                })
              }
            />
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "activities" ? (
        <SectionCard title="Activități" description="Lista de activități și ateliere oferite.">
          <TextField
            label="Titlu"
            value={content.activities.title}
            onChange={(v) => updateSection("activities", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.activities.description}
            onChange={(v) => updateSection("activities", { description: v })}
          />
          <div className="flex flex-col gap-3">
            {content.activities.items.map((item, index) => (
              <ListItemCard
                key={item.id}
                onRemove={() =>
                  updateSection("activities", { items: content.activities.items.filter((_, i) => i !== index) })
                }
                onMoveUp={
                  index > 0
                    ? () => updateSection("activities", { items: moveItem(content.activities.items, index, -1) })
                    : undefined
                }
                onMoveDown={
                  index < content.activities.items.length - 1
                    ? () => updateSection("activities", { items: moveItem(content.activities.items, index, 1) })
                    : undefined
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Titlu"
                    value={item.title}
                    onChange={(v) => updateActivity(content, updateSection, index, { title: v })}
                  />
                  <IconPickerField
                    label="Iconiță"
                    value={item.icon}
                    onChange={(v) => updateActivity(content, updateSection, index, { icon: v })}
                  />
                </div>
                <TextAreaField
                  label="Descriere"
                  value={item.description}
                  onChange={(v) => updateActivity(content, updateSection, index, { description: v })}
                />
              </ListItemCard>
            ))}
            <AddButton
              label="Adaugă activitate"
              onClick={() =>
                updateSection("activities", {
                  items: [
                    ...content.activities.items,
                    { id: newId(), icon: "sparkles", title: "", description: "" },
                  ],
                })
              }
            />
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "gallery" ? (
        <SectionCard title="Galerie foto" description="Fotografiile afișate în secțiunea de galerie.">
          <TextField
            label="Titlu"
            value={content.gallery.title}
            onChange={(v) => updateSection("gallery", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.gallery.description}
            onChange={(v) => updateSection("gallery", { description: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.gallery.images.map((img, index) => (
              <ListItemCard
                key={img.id}
                onRemove={() =>
                  updateSection("gallery", { images: content.gallery.images.filter((_, i) => i !== index) })
                }
                onMoveUp={
                  index > 0
                    ? () => updateSection("gallery", { images: moveItem(content.gallery.images, index, -1) })
                    : undefined
                }
                onMoveDown={
                  index < content.gallery.images.length - 1
                    ? () => updateSection("gallery", { images: moveItem(content.gallery.images, index, 1) })
                    : undefined
                }
              >
                <ImageUploadField
                  label="Fotografie"
                  value={img.url}
                  onChange={(url) => updateGalleryImage(content, updateSection, index, { url })}
                  folder="gallery"
                />
                <TextField
                  label="Descriere (opțional)"
                  value={img.caption}
                  onChange={(v) => updateGalleryImage(content, updateSection, index, { caption: v })}
                />
              </ListItemCard>
            ))}
          </div>
          <AddButton
            label="Adaugă fotografie"
            onClick={() =>
              updateSection("gallery", {
                images: [...content.gallery.images, { id: newId(), url: "", caption: "" }],
              })
            }
          />
        </SectionCard>
      ) : null}

      {activeTab === "testimonials" ? (
        <SectionCard title="Testimoniale" description="Păreri ale părinților.">
          <TextField
            label="Titlu"
            value={content.testimonials.title}
            onChange={(v) => updateSection("testimonials", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.testimonials.description}
            onChange={(v) => updateSection("testimonials", { description: v })}
          />
          <TextField
            label="Link review Google"
            value={content.testimonials.googleReviewUrl}
            onChange={(v) => updateSection("testimonials", { googleReviewUrl: v })}
          />
          <div className="flex flex-col gap-3">
            {content.testimonials.items.map((item, index) => (
              <ListItemCard
                key={item.id}
                onRemove={() =>
                  updateSection("testimonials", {
                    items: content.testimonials.items.filter((_, i) => i !== index),
                  })
                }
                onMoveUp={
                  index > 0
                    ? () =>
                        updateSection("testimonials", { items: moveItem(content.testimonials.items, index, -1) })
                    : undefined
                }
                onMoveDown={
                  index < content.testimonials.items.length - 1
                    ? () =>
                        updateSection("testimonials", { items: moveItem(content.testimonials.items, index, 1) })
                    : undefined
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Nume părinte"
                    value={item.name}
                    onChange={(v) => updateTestimonial(content, updateSection, index, { name: v })}
                  />
                  <TextField
                    label="Rol (ex: părintele Mariei)"
                    value={item.role}
                    onChange={(v) => updateTestimonial(content, updateSection, index, { role: v })}
                  />
                </div>
                <TextAreaField
                  label="Mesaj"
                  value={item.text}
                  onChange={(v) => updateTestimonial(content, updateSection, index, { text: v })}
                />
                <TextField
                  label="Rating (1-5)"
                  type="number"
                  value={String(item.rating)}
                  onChange={(v) =>
                    updateTestimonial(content, updateSection, index, {
                      rating: Math.max(1, Math.min(5, Number(v) || 5)),
                    })
                  }
                />
              </ListItemCard>
            ))}
            <AddButton
              label="Adaugă testimonial"
              onClick={() =>
                updateSection("testimonials", {
                  items: [
                    ...content.testimonials.items,
                    { id: newId(), name: "", role: "", text: "", rating: 5 },
                  ],
                })
              }
            />
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "contact" ? (
        <SectionCard title="Contact" description="Datele de contact și harta afișate pe site.">
          <TextField
            label="Titlu"
            value={content.contact.title}
            onChange={(v) => updateSection("contact", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.contact.description}
            onChange={(v) => updateSection("contact", { description: v })}
          />
          <TextField
            label="Adresă"
            value={content.contact.address}
            onChange={(v) => updateSection("contact", { address: v })}
          />
          <TextField
            label="Notă adresă"
            value={content.contact.addressNote}
            onChange={(v) => updateSection("contact", { addressNote: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Telefon"
              value={content.contact.phone}
              onChange={(v) => updateSection("contact", { phone: v })}
            />
            <TextField
              label="Email"
              value={content.contact.email}
              onChange={(v) => updateSection("contact", { email: v })}
            />
            <TextField
              label="Persoană de contact"
              value={content.contact.contactPerson}
              onChange={(v) => updateSection("contact", { contactPerson: v })}
            />
            <TextField
              label="Link Facebook"
              value={content.contact.facebookUrl}
              onChange={(v) => updateSection("contact", { facebookUrl: v })}
            />
            <TextField
              label="Link Instagram"
              value={content.contact.instagramUrl}
              onChange={(v) => updateSection("contact", { instagramUrl: v })}
            />
          </div>
          <TextField
            label="Link hartă Google Maps (embed)"
            value={content.contact.mapEmbedUrl}
            onChange={(v) => updateSection("contact", { mapEmbedUrl: v })}
            hint="Pe Google Maps: Distribuie → Încorporare hartă → copiază doar linkul din src=&quot;...&quot;"
          />
        </SectionCard>
      ) : null}

      {activeTab === "footer" ? (
        <SectionCard title="Subsol" description="Textul afișat în josul fiecărei pagini.">
          <TextField label="Text" value={content.footer.text} onChange={(v) => updateSection("footer", { text: v })} />
        </SectionCard>
      ) : null}

      {activeTab === "seo" ? (
        <SectionCard
          title="SEO"
          description="Informații folosite de Google și la partajarea pe rețele sociale."
        >
          <TextField
            label="Titlu (tab browser / Google)"
            value={content.seo.title}
            onChange={(v) => updateSection("seo", { title: v })}
          />
          <TextAreaField
            label="Descriere"
            value={content.seo.description}
            onChange={(v) => updateSection("seo", { description: v })}
          />
          <TextField
            label="Cuvinte cheie (separate prin virgulă)"
            value={content.seo.keywords}
            onChange={(v) => updateSection("seo", { keywords: v })}
          />
          <ImageUploadField
            label="Imagine partajare (social media)"
            value={content.seo.ogImageUrl}
            onChange={(url) => updateSection("seo", { ogImageUrl: url })}
            folder="seo"
          />
        </SectionCard>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-950/10 bg-cream-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          {status ? (
            <p className={"text-sm " + (status.ok ? "text-green-700" : "text-red-600")}>{status.message}</p>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-gold-500 px-5 py-2.5 font-semibold text-navy-950 hover:bg-gold-400 transition-colors disabled:opacity-60"
          >
            {saving ? "Se salvează..." : "Salvează modificările"}
          </button>
        </div>
      </div>
    </div>
  );
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function updateHighlight(
  content: SiteContent,
  updateSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void,
  index: number,
  patch: Partial<AboutHighlight>
) {
  updateSection("about", {
    highlights: content.about.highlights.map((h, i) => (i === index ? { ...h, ...patch } : h)),
  });
}

function updateTier(
  content: SiteContent,
  updateSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void,
  index: number,
  patch: Partial<PricingTier>
) {
  updateSection("pricing", {
    tiers: content.pricing.tiers.map((t, i) => (i === index ? { ...t, ...patch } : t)),
  });
}

function updateActivity(
  content: SiteContent,
  updateSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void,
  index: number,
  patch: Partial<Activity>
) {
  updateSection("activities", {
    items: content.activities.items.map((a, i) => (i === index ? { ...a, ...patch } : a)),
  });
}

function updateGalleryImage(
  content: SiteContent,
  updateSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void,
  index: number,
  patch: Partial<GalleryImage>
) {
  updateSection("gallery", {
    images: content.gallery.images.map((g, i) => (i === index ? { ...g, ...patch } : g)),
  });
}

function updateTestimonial(
  content: SiteContent,
  updateSection: <K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) => void,
  index: number,
  patch: Partial<Testimonial>
) {
  updateSection("testimonials", {
    items: content.testimonials.items.map((t, i) => (i === index ? { ...t, ...patch } : t)),
  });
}
