"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImageAction } from "../actions";
import { Icon, ICON_OPTIONS } from "@/components/icon-map";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy-950">{label}</span>
      {children}
      {hint ? <span className="text-xs text-navy-900/50">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30";

export function TextField({
  label,
  value,
  onChange,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={inputClass + " resize-y"}
      />
    </Field>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-navy-950">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-navy-950/30 accent-gold-500"
      />
      {label}
    </label>
  );
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);
    const result = await uploadImageAction(formData);
    setUploading(false);
    if (result.ok) {
      onChange(result.url);
    } else {
      setError(result.error);
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-3">
        {value ? (
          <Image
            src={value}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 rounded-xl object-cover ring-1 ring-navy-950/10"
            unoptimized
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-950/5 text-xs text-navy-900/40">
            fără imagine
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-navy-950/15 bg-white px-3 py-1.5 text-xs font-semibold text-navy-950 hover:bg-cream-100 disabled:opacity-60"
          >
            {uploading ? "Se încarcă..." : "Încarcă imagine"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {error ? <span className="text-xs text-red-600">{error}</span> : null}
        </div>
      </div>
    </Field>
  );
}

export function IconPickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-1.5">
        {ICON_OPTIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            aria-label={name}
            className={
              "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors " +
              (value === name
                ? "border-gold-500 bg-gold-500/15 text-navy-950"
                : "border-navy-950/10 bg-white text-navy-900/50 hover:bg-cream-100")
            }
          >
            <Icon name={name} className="h-4 w-4" />
          </button>
        ))}
      </div>
    </Field>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-navy-950/8 flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-navy-950">{title}</h2>
        {description ? <p className="text-sm text-navy-900/60 mt-0.5">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function ListItemCard({
  children,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  return (
    <div className="rounded-xl border border-navy-950/10 bg-cream-100/50 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-end gap-1.5">
        {onMoveUp ? (
          <button
            type="button"
            onClick={onMoveUp}
            className="rounded-md px-2 py-1 text-xs text-navy-900/60 hover:bg-navy-950/5"
            aria-label="Mută mai sus"
          >
            ↑
          </button>
        ) : null}
        {onMoveDown ? (
          <button
            type="button"
            onClick={onMoveDown}
            className="rounded-md px-2 py-1 text-xs text-navy-900/60 hover:bg-navy-950/5"
            aria-label="Mută mai jos"
          >
            ↓
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50"
        >
          Șterge
        </button>
      </div>
      {children}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start rounded-lg border border-dashed border-navy-950/25 px-3.5 py-2 text-sm font-medium text-navy-900/70 hover:bg-navy-950/5"
    >
      + {label}
    </button>
  );
}
