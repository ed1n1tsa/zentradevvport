"use client";

import { useLocale } from "next-intl";
import { Check, Languages } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";

const labels: Record<(typeof routing.locales)[number], string> = {
  ru: "RU",
  kk: "KK",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();

  function buildLocalizedPath(nextLocale: (typeof routing.locales)[number]) {
    const fullPath =
      window.location.pathname + window.location.search + window.location.hash;
    const pathWithoutLocale = fullPath.replace(/^\/(ru|kk|en)(?=\/|$)/, "") || "/";

    return `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Language"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "border-primary/30 bg-white text-primary hover:bg-primary/10",
        )}
      >
        <Languages className="mr-2 size-4 opacity-80" />
        {labels[locale as keyof typeof labels]}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 rounded-3xl border border-primary/20 bg-white p-2 shadow-[0_16px_38px_rgba(31,91,255,0.18)]"
      >
        {routing.locales.map((code) => {
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => {
                if (code === locale) return;
                const target = buildLocalizedPath(code);
                window.location.assign(target);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition",
                active
                  ? "bg-primary text-white"
                  : "text-primary/90 hover:bg-primary/10 hover:text-primary",
              )}
            >
              {labels[code]}
              {active ? <Check className="size-4" /> : <span className="size-4" />}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
