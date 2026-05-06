"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import type { AppLocale } from "@/lib/data";
import { getLocalized, type Testimonial } from "@/lib/data";

interface TestimonialCardProps {
  item: Testimonial;
  locale: AppLocale;
  index?: number;
}

export function TestimonialCard({
  item,
  locale,
  index = 0,
}: TestimonialCardProps) {
  const role = getLocalized(item.role, locale);
  const quote = getLocalized(item.quote, locale);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-panel h-full rounded-2xl p-6"
    >
      <Quote className="size-8 text-primary/45" />
      <blockquote className="mt-4 text-sm leading-relaxed text-primary/75">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-primary">{item.name}</div>
          <div className="text-xs text-primary/60">
            {role} · {item.company}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400/90 text-amber-400/90" />
          ))}
        </div>
      </figcaption>
    </motion.figure>
  );
}
