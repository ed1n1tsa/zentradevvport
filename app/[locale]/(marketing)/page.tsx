import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/ContactForm";
import { HeroSection } from "@/components/HeroSection";
import { HomeProjectsSection } from "@/components/HomeProjectsSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TestimonialCard } from "@/components/TestimonialCard";
import { WhyGrid } from "@/components/WhyGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/lib/data";
import { testimonials } from "@/lib/data";
import { getPublishedProjects } from "@/lib/projects-db";
type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "Services",
  });
  const tWhy = await getTranslations({ locale, namespace: "Why" });
  const tProcess = await getTranslations({ locale, namespace: "Process" });
  const tTestimonials = await getTranslations({
    locale,
    namespace: "Testimonials",
  });
  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const loc = locale as AppLocale;
  const projects = await getPublishedProjects();

  return (
    <>
      <HeroSection />

      <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/70">{t("subtitle")}</p>
        </div>
        <div className="mt-10">
          <ServicesGrid locale={loc} />
        </div>
      </section>

      <HomeProjectsSection projects={projects} />

      <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {tWhy("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/70">{tWhy("subtitle")}</p>
        </div>
        <div className="mt-10">
          <WhyGrid locale={loc} />
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {tProcess("title")}
            </h2>
            <p className="mt-3 text-lg text-primary/70">{tProcess("subtitle")}</p>
          </div>
          <Link
            href="/process"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit border-primary/35 bg-white text-primary hover:bg-primary/10",
            )}
          >
            {tProcess("seeDetails")}
          </Link>
        </div>
        <div className="mt-10 max-w-3xl">
          <ProcessTimeline locale={loc} variant="compact" />
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {tTestimonials("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/70">{tTestimonials("subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} locale={loc} index={i} />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {tContact("title")}
            </h2>
            <p className="mt-3 text-lg text-primary/70">{tContact("subtitle")}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
