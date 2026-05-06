"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectDeleteButtonProps {
  projectId: string;
  projectName: string;
}

export function ProjectDeleteButton({
  projectId,
  projectName,
}: ProjectDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    const confirmed = window.confirm(
      `Удалить проект "${projectName}"? Это действие необратимо.`,
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        window.alert(payload?.error ?? "Не удалось удалить проект.");
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
