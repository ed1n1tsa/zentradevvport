import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProcessTimeline } from "@/components/ProcessTimeline";
import type { AppLocale } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProcessPage" });
  const loc = locale as AppLocale;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section id="process-intro" className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-primary/72">{t("subtitle")}</p>
      </section>

      <section id="process-steps" className="mt-12 max-w-3xl">
        <ProcessTimeline locale={loc} variant="full" />
      </section>
    </div>
  );
}
