"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel mx-auto max-w-6xl overflow-hidden p-8 sm:p-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white">
          <Sparkles className="size-4 text-white" />
          <span>{t("badge")}</span>
        </div>

        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary/75 sm:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "accent-gradient h-12 px-8 text-base text-white shadow-xl shadow-primary/35",
            )}
          >
            {t("primaryCta")}
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-primary/35 bg-white px-8 text-base text-primary hover:bg-primary/10",
            )}
          >
            {t("secondaryCta")}
          </Link>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 hidden h-72 w-72 rounded-full bg-primary/30 blur-3xl lg:block"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
    </section>
  );
}
