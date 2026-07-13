import { useState, useEffect } from "react";
import { Play, X, Film } from "lucide-react";
import { SITE } from "@/lib/site";

interface Props {
  /** Image shown as the video thumbnail/poster */
  posterSrc: string;
  posterAlt?: string;
  /** Label shown on the play button area */
  label?: string;
  /** Label shown below the button (for the "coming soon" state) */
  comingSoonLabel?: string;
}

export function VideoModal({ posterSrc, posterAlt = "Video preview", label, comingSoonLabel }: Props) {
  const [open, setOpen] = useState(false);
  const hasSelfHosted = Boolean(SITE.videoUrl);
  const hasYouTube = Boolean(SITE.videoYouTubeId);
  const hasVideo = hasSelfHosted || hasYouTube;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Thumbnail + play button */}
      <div
        className="relative aspect-video rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)] group cursor-pointer"
        onClick={() => hasVideo && setOpen(true)}
        role={hasVideo ? "button" : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        onKeyDown={(e) => { if (hasVideo && (e.key === "Enter" || e.key === " ")) setOpen(true); }}
        aria-label={hasVideo ? (label ?? "Play video") : undefined}
      >
        <img src={posterSrc} alt={posterAlt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 transition-colors duration-300 ${hasVideo ? "bg-primary/40 group-hover:bg-primary/25" : "bg-primary/50"}`} />

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-4">
            <span className={`size-20 md:size-24 rounded-full gradient-warm grid place-items-center shadow-[var(--shadow-gold)] transition-transform duration-300 ${hasVideo ? "group-hover:scale-110" : "opacity-60"}`}>
              {hasVideo
                ? <Play className="size-8 text-primary fill-primary ml-1" />
                : <Film className="size-8 text-primary" />
              }
            </span>
            {!hasVideo && comingSoonLabel && (
              <span className="px-4 py-1.5 rounded-full bg-cream/20 backdrop-blur text-cream text-xs font-medium border border-cream/30">
                {comingSoonLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {open && hasVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 size-9 rounded-full bg-cream/20 hover:bg-cream/30 grid place-items-center text-cream transition-colors"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              {hasSelfHosted ? (
                <video
                  src={SITE.videoUrl!}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 size-full"
                >
                  Your browser does not support embedded video.
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${SITE.videoYouTubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title="YatraPK — video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
