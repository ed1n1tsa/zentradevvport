"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";
import type { ProjectCategoryId } from "@/lib/data";
import { projectCategories } from "@/lib/data";
import type { AppLocale } from "@/lib/data";

export type CategoryFilterValue = ProjectCategoryId | "all";

interface CategoryFilterProps {
  locale: AppLocale;
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
  allLabel: string;
}

export function CategoryFilter({
  locale,
  value,
  onChange,
  allLabel,
}: CategoryFilterProps) {
  const items = useMemo(
    () => [{ id: "all" as const, label: allLabel }, ...projectCategories],
    [allLabel],
  );

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const id = item.id;
        const active = value === id;
        const label =
          id === "all"
            ? allLabel
            : projectCategories.find((c) => c.id === id)?.label[locale] ?? id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              active
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : "border-primary/25 bg-white text-primary/80 hover:border-primary/40 hover:bg-primary/10",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
