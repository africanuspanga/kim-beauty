"use client";

import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const MAX_BYTES = 8 * 1024 * 1024;

export function ImageGalleryField({
  value,
  onChange,
  label,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: File[]) {
    const invalid = files.find(
      (file) => !file.type.startsWith("image/") || file.size > MAX_BYTES
    );
    if (invalid) {
      setError("Each photo must be an image smaller than 8MB.");
      return;
    }

    setError(null);
    setUploading(true);
    const supabase = getSupabase();

    const urls = await Promise.all(
      files.map(async (file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `uploads/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(path, file, { cacheControl: "31536000", upsert: false });

        if (uploadError) throw uploadError;
        return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
      })
    ).catch((uploadError: { message?: string }) => {
      setError(uploadError.message || "The photos could not be uploaded.");
      return null;
    });

    if (urls) onChange([...value, ...urls]);
    setUploading(false);
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="block text-[13px] font-semibold text-ink">{label}</label>
        <span className="text-[11px] text-muted">{value.length} added</span>
      </div>
      <p className="mb-3 text-[12px] leading-relaxed text-muted">
        Upload extra angles or color photos. The main product image stays first.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length) uploadFiles(files);
          event.target.value = "";
        }}
      />

      {value.length ? (
        <ul className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, index) => (
            <li key={`${url}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-blush-100">
              <Image
                src={url}
                alt={`Additional product photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 28vw, 132px"
                className="object-cover"
                unoptimized={!url.startsWith("/")}
              />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                aria-label={`Remove photo ${index + 1}`}
                className="absolute right-1.5 top-1.5 rounded-full bg-ink/75 p-1.5 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-gold-500/40 px-4 text-[13px] font-medium text-gold-700 transition hover:bg-gold-50 disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Uploading photos…
          </>
        ) : (
          <>
            <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Add photos
          </>
        )}
      </button>

      {error ? <p role="alert" className="mt-2 text-[12px] text-red-600">{error}</p> : null}
    </div>
  );
}
