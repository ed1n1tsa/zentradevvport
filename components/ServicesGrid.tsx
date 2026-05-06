"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/lib/data";
import { getLocalized, services, type ServiceItem } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const icons: Record<ServiceItem["icon"], ComponentType<{ className?: string }>> =
  {
    globe: Globe,
    smartphone: Smartphone,
    bot: Bot,
    sparkles: Sparkles,
    shoppingCart: ShoppingCart,
    layoutDashboard: LayoutDashboard,
  };

export function ServicesGrid({ locale }: { locale: AppLocale }) {
  const t = useTranslations("Services");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((item, idx) => {
        const Icon = icons[item.icon];
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
              <Icon className="size-5 text-white" />
            </div>
            <Link href={`/services/${item.id}`} className="mt-4 block">
              <h3 className="text-lg font-semibold text-primary transition hover:opacity-85">
                {getLocalized(item.title, locale)}
              </h3>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-primary/70">
              {getLocalized(item.description, locale)}
            </p>
            <Link
              href={`/services/${item.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 border-primary/35 bg-white text-primary hover:bg-primary/10",
              )}
            >
              {t("more")}
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
