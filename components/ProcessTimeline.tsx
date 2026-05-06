"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import type { AppLocale } from "@/lib/data";
import { getLocalized, processSteps } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProcessTimelineProps {
  locale: AppLocale;
  variant?: "compact" | "full";
}

export function ProcessTimeline({
  locale,
  variant = "full",
}: ProcessTimelineProps) {
  const steps = variant === "compact" ? processSteps.slice(0, 4) : processSteps;

  return (
    <div className="relative">
      <div className="absolute bottom-2 left-[18px] top-2 w-px bg-gradient-to-b from-primary/60 via-primary/35 to-transparent sm:left-[22px]" />
      <ol className="space-y-6">
        {steps.map((step, idx) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="relative flex gap-4 sm:gap-6"
          >
            <div
              className={cn(
                "relative z-10 mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-white shadow-[0_0_30px_rgba(31,91,255,0.2)] sm:size-11",
              )}
            >
              <Check className="size-4 text-primary sm:size-5" />
            </div>
            <div className="glass-panel flex-1 rounded-2xl p-5">
              <div className="text-xs font-medium uppercase tracking-wide text-primary/55">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-primary">
                {getLocalized(step.title, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary/72">
                {getLocalized(step.description, locale)}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
