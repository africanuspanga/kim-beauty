"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageUp, Loader2, Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

/**
 * Image picker that uploads into the public `media` bucket and stores the
 * resulting public URL. A URL can also be pasted directly.
 */
export function ImageField({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is larger than 8MB.");
      return;
    }

    setUploading(true);
    const supabase = getSupabase();

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "31536000", upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-ink">
        {label}
      </label>

      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-blush-100">
          {value ? (
            <Image
              src={value}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
              unoptimized={!value.startsWith("/")}
            />
          ) : (
            <span className="flex h-full items-center justify-center text-[11px] text-muted">
              No image
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-gold-500/40 px-4 text-[13px] font-medium text-gold-700 transition hover:bg-gold-50 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Uploading…
                </>
              ) : (
                <>
                  <ImageUp className="h-3.5 w-3.5" aria-hidden="true" />
                  Upload image
                </>
              )}
            </button>

            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[13px] font-medium text-muted transition hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            ) : null}
          </div>

          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL / path"
            className="h-10 w-full rounded-xl border border-line bg-cream px-3.5 text-[13px] outline-none transition focus:border-gold-400"
          />

          {error ? (
            <p role="alert" className="text-[12px] text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
