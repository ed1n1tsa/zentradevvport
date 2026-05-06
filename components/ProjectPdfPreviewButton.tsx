"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectPdfPreviewButtonProps {
  pdfUrl: string;
  label: string;
}

export function ProjectPdfPreviewButton({
  pdfUrl,
  label,
}: ProjectPdfPreviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="mt-4 border-primary/30 bg-white text-primary hover:bg-primary/10"
      >
        <FileText className="mr-2 size-4" />
        {label}
      </Button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            >
              <div
                className="flex h-full w-full flex-col"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-end px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white shadow-lg transition hover:bg-black/75"
                    aria-label="Close PDF preview"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <div className="min-h-0 flex-1 px-4 pb-4">
                  <div className="h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white">
                    <iframe
                      src={pdfUrl}
                      title="Project PDF"
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
