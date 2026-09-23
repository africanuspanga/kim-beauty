import Image from "next/image";

/** Turns a YouTube / Vimeo watch link into its embed form. */
function embedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

/**
 * A style's photo — or its video when one has been uploaded.
 * Falls back to the parent service's photo so a card is never empty.
 */
export function ServiceOptionMedia({
  imageUrl,
  videoUrl,
  alt,
  className = "aspect-[4/3]",
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw",
}: {
  imageUrl?: string | null;
  videoUrl?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const wrapper = `relative w-full overflow-hidden bg-blush-100 ${className}`;

  if (videoUrl) {
    const embed = embedUrl(videoUrl);

    if (embed) {
      return (
        <div className={wrapper}>
          <iframe
            src={embed}
            title={alt}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      );
    }

    return (
      <div className={wrapper}>
        <video
          src={videoUrl}
          poster={imageUrl ?? undefined}
          controls
          playsInline
          preload="none"
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={wrapper}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
    </div>
  );
}
