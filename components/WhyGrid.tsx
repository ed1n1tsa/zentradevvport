"use client";

import { motion } from "framer-motion";
import { Cpu, LayoutPanelLeft, Palette, ShieldCheck, Sparkles } from "lucide-react";

import type { AppLocale } from "@/lib/data";
import { getLocalized, whyItems } from "@/lib/data";

const icons = [Palette, Cpu, Sparkles, LayoutPanelLeft, ShieldCheck];

export function WhyGrid({ locale }: { locale: AppLocale }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {whyItems.map((item, idx) => {
        const Icon = icons[idx] ?? Sparkles;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="glass-panel rounded-2xl p-6"
          >
            <Icon className="size-6 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-primary">
              {getLocalized(item.title, locale)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-primary/70">
              {getLocalized(item.description, locale)}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
