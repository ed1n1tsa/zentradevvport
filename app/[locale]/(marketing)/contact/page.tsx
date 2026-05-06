import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section id="contact-page" className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-primary/72">{t("subtitle")}</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
