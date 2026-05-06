"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GalleryItemDeleteButtonProps {
  projectId: string;
  galleryId: string;
}

export function GalleryItemDeleteButton({
  projectId,
  galleryId,
}: GalleryItemDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    const confirmed = window.confirm("Удалить это изображение из галереи?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/gallery/${galleryId}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        window.alert(payload?.error ?? "Не удалось удалить изображение.");
      } else {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={onDelete}
      disabled={loading}
      className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
