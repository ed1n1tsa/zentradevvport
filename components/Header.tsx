"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { usePathname } from "@/i18n/navigation";

const navKeys = ["home", "projects", "about", "process", "contact"] as const;

const hrefs: Record<(typeof navKeys)[number], string> = {
  home: "/",
  projects: "/projects",
  about: "/about",
  process: "/process",
  contact: "/contact",
};

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30">
            Z
          </span>
          <span className="text-sm font-semibold tracking-tight text-primary">
            ZENTRA
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={hrefs[key]}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition",
                isActive(hrefs[key])
                  ? "bg-primary/12 text-primary"
                  : "text-primary/80 hover:bg-primary/10 hover:text-primary",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <NextLink
            href="/client/login"
            className={cn(
              buttonVariants({ size: "sm" }),
              "accent-gradient text-white shadow-lg shadow-primary/30 hover:opacity-95",
            )}
          >
            Личный кабинет
          </NextLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              type="button"
              aria-label={t("openMenu")}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-primary/30 bg-white",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100%,380px)] flex-col gap-6 border-primary/20 bg-white p-6"
            >
              <div className="mt-8 flex flex-col gap-1">
                {navKeys.map((key) => (
                  <Link
                    key={key}
                    href={hrefs[key]}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-semibold transition",
                      isActive(hrefs[key])
                        ? "bg-primary/12 text-primary"
                        : "text-primary/90 hover:bg-primary/10",
                    )}
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2 border-t border-primary/15 pt-6">
                <NextLink
                  href="/client/login"
                  className={cn(
                    buttonVariants(),
                    "accent-gradient w-full justify-center text-white",
                  )}
                >
                  Личный кабинет
                </NextLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
