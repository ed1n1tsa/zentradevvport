"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ProjectGalleryLightboxProps {
  images: string[];
}

export function ProjectGalleryLightbox({ images }: ProjectGalleryLightboxProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {images.map((imageUrl, index) => (
          <button
            key={`${imageUrl}-${index}`}
            type="button"
            onClick={() => setActiveImage(imageUrl)}
            className="group overflow-hidden rounded-2xl border border-primary/15 bg-white text-left"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
          </button>
        ))}
      </div>

      {mounted && activeImage
        ? createPortal(
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-5 top-5 z-[121] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white shadow-lg transition hover:bg-black/75"
            aria-label="Close preview"
          >
            <X className="size-5" />
          </button>

          <div
            className="relative"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt=""
              width={1800}
              height={1200}
              className="h-auto max-h-[85vh] w-auto max-w-[92vw] rounded-xl border border-white/15 object-contain shadow-2xl"
              sizes="92vw"
              priority
            />
          </div>
        </div>
        ,
        document.body,
      )
        : null}
    </>
  );
}
