"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavSection {
  id: string;
}

const HEADER_OFFSET = 84;

export function BlockNavigator() {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const collectSections = () => {
      const list = Array.from(
        document.querySelectorAll<HTMLElement>("main section[id], article section[id]"),
      )
        .filter((el) => el.id.length > 0 && el.getBoundingClientRect().height > 160)
        .map((el) => ({
          id: el.id,
        }))
        .filter((item) => item.id.length > 0);

      setSections(list);
      setActiveIndex(0);
    };

    collectSections();
    window.addEventListener("resize", collectSections);

    return () => window.removeEventListener("resize", collectSections);
  }, [pathname]);

  useEffect(() => {
    if (sections.length < 2) return;

    const getTops = () =>
      sections
        .map((section) => {
          const element = document.getElementById(section.id);
          if (!element) return null;
          return {
            id: section.id,
            top: Math.max(element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0),
          };
        })
        .filter((item): item is { id: string; top: number } => item !== null);

    const onScroll = () => {
      const tops = getTops();
      if (tops.length === 0) return;
      const marker = window.scrollY + window.innerHeight * 0.25;
      let nextIndex = 0;

      for (let i = 0; i < tops.length; i += 1) {
        if (tops[i].top <= marker) {
          nextIndex = i;
        } else {
          break;
        }
      }

      setActiveIndex(nextIndex);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const canGoUp = activeIndex > 0;
  const canGoDown = activeIndex < sections.length - 1;

  const jumpTo = (index: number) => {
    const section = sections[index];
    if (!section) return;
    const element = document.getElementById(section.id);
    if (!element) return;
    const top = Math.max(
      element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      0,
    );
    window.scrollTo({ top, behavior: "smooth" });
  };

  const dots = useMemo(
    () =>
      sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onClick={() => jumpTo(index)}
          aria-label={`Go to section ${index + 1}`}
          className={cn(
            "h-2.5 w-2.5 rounded-full border border-primary/35 transition",
            index === activeIndex
              ? "bg-primary shadow-[0_0_12px_rgba(31,91,255,0.75)]"
              : "bg-transparent hover:border-primary/60",
          )}
        />
      )),
    [activeIndex, sections],
  );

  if (sections.length < 2) return null;

  return (
    <aside className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="flex w-14 flex-col items-center gap-4 rounded-[28px] border border-primary/20 bg-[rgba(255,255,255,0.24)] px-3 py-4 shadow-[0_14px_34px_rgba(31,91,255,0.22)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => canGoUp && jumpTo(activeIndex - 1)}
          disabled={!canGoUp}
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-full transition",
            canGoUp
              ? "text-primary hover:bg-primary/10"
              : "cursor-not-allowed text-primary/35",
          )}
          aria-label="Previous block"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-4">{dots}</div>

        <button
          type="button"
          onClick={() => canGoDown && jumpTo(activeIndex + 1)}
          disabled={!canGoDown}
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-full transition",
            canGoDown
              ? "text-primary hover:bg-primary/10"
              : "cursor-not-allowed text-primary/35",
          )}
          aria-label="Next block"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
