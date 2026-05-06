import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import {
  getLocalized,
  getServiceById,
  projectCategories,
  serviceDetails,
  type AppLocale,
  type ServiceId,
} from "@/lib/data";

type Props = { params: Promise<{ locale: string; slug: string }> };

const serviceImageById: Record<ServiceId, string> = {
  web: "/uslugi/websites/1.png",
  mobile: "/uslugi/websites/2.png",
  telegram: "/uslugi/websites/3.png",
  ai: "/uslugi/websites/4.png",
  ecommerce: "/uslugi/websites/5.png",
  cabinet: "/uslugi/websites/6.png",
};

const webServiceExtended = {
  ru: {
    sectionTitle: "Что входит в разработку сайта",
    intro:
      "Делаем не просто красивую страницу, а полноценный инструмент роста: с продуманной структурой, аналитикой и готовностью к рекламе или SEO. На старте фиксируем цель сайта и строим решение под конкретный результат: заявки, продажи или укрепление бренда.",
    blocks: [
      {
        title: "Стратегия и структура",
        text: "Проводим аудит ниши, проектируем карту страниц, оффер и пользовательские сценарии, чтобы сайт сразу работал на конверсию.",
      },
      {
        title: "Дизайн и контент",
        text: "Собираем UI в едином стиле бренда, подготавливаем тексты и визуальные блоки, уделяя внимание читаемости и мобильной версии.",
      },
      {
        title: "Разработка и запуск",
        text: "Верстаем и подключаем функционал, формы, CRM и аналитику. Перед запуском тестируем скорость, адаптивность и корректность всех сценариев.",
      },
    ],
  },
  kk: {
    sectionTitle: "Сайт әзірлеуге не кіреді",
    intro:
      "Тек әдемі бет емес, өсуге арналған толық құрал жасаймыз: ойластырылған құрылым, аналитика және жарнама/SEO-ға дайындықпен. Бастапқыда сайттың мақсатын бекітіп, нақты нәтиже үшін шешім құрастырамыз: өтінім, сату немесе брендті нығайту.",
    blocks: [
      {
        title: "Стратегия және құрылым",
        text: "Нишаны талдаймыз, беттер картасын, офферді және пайдаланушы сценарийлерін жобалаймыз — сайт конверсияға бірден жұмыс істеуі үшін.",
      },
      {
        title: "Дизайн және контент",
        text: "Бренд стилінде UI жинаймыз, мәтіндер мен визуал блоктарды дайындаймыз, оқылымдылық пен мобильді нұсқаға ерекше мән береміз.",
      },
      {
        title: "Әзірлеу және іске қосу",
        text: "Верстка, функционал, формалар, CRM және аналитиканы қосамыз. Іске қосар алдында жылдамдық, адаптивтілік және барлық сценарийлерді тексереміз.",
      },
    ],
  },
  en: {
    sectionTitle: "What is included in website development",
    intro:
      "We build more than a pretty page. You get a growth-ready product with clear structure, analytics, and readiness for ads or SEO. We define the business goal first and shape the website around measurable outcomes: leads, sales, or stronger brand trust.",
    blocks: [
      {
        title: "Strategy and structure",
        text: "We analyze your niche and craft page architecture, offer positioning, and user flows so the website starts converting from day one.",
      },
      {
        title: "Design and content",
        text: "We create a consistent UI aligned with your brand, prepare content blocks, and optimize readability across desktop and mobile.",
      },
      {
        title: "Development and launch",
        text: "We implement features, forms, CRM, and analytics. Before launch, we test speed, responsiveness, and end-to-end user scenarios.",
      },
    ],
  },
} satisfies Record<
  AppLocale,
  { sectionTitle: string; intro: string; blocks: Array<{ title: string; text: string }> }
>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    (Object.keys(serviceDetails) as ServiceId[]).map((slug) => ({ locale, slug })),
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceById(slug);
  if (!service) notFound();

  const details = serviceDetails[service.id];
  const t = await getTranslations({ locale, namespace: "ServiceDetail" });
  const loc = locale as AppLocale;
  const categoryLabel =
    projectCategories.find((item) => item.id === service.id)?.label[loc] ??
    getLocalized(service.title, loc);
  const serviceImage = serviceImageById[service.id];
  const isWebService = service.id === "web";
  const webContent = webServiceExtended[loc];

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-8 -ml-2 inline-flex text-primary/85 hover:bg-primary/10 hover:text-primary",
        )}
      >
        <ArrowLeft className="mr-2 size-4" />
        {t("back")}
      </Link>

      <section id="service-intro" className="glass-panel rounded-3xl p-8 sm:p-10">
        <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
          {categoryLabel}
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          {getLocalized(service.title, loc)}
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-primary/75">
          {details.what[loc]}
        </p>
      </section>

      <section id="service-overview" className="mt-10 glass-panel rounded-3xl p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-white">
            <Image
              src={serviceImage}
              alt={getLocalized(service.title, loc)}
              width={1100}
              height={760}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            {isWebService ? (
              <>
                <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  {webContent.sectionTitle}
                </h2>
                <p className="mt-4 text-primary/75">{webContent.intro}</p>
                <div className="mt-6 grid gap-3">
                  {webContent.blocks.map((block) => (
                    <div
                      key={block.title}
                      className="rounded-2xl border border-primary/15 bg-white p-4"
                    >
                      <h3 className="text-base font-semibold text-primary">{block.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-primary/75">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  {t("howTitle")}
                </h2>
                <p className="mt-4 text-primary/75">{details.what[loc]}</p>
                <div className="mt-6 grid gap-3">
                  {details.how.map((step, index) => (
                    <div
                      key={`${service.id}-photo-block-${index}`}
                      className="rounded-2xl border border-primary/15 bg-white p-4"
                    >
                      <p className="text-sm leading-relaxed text-primary/80">{step[loc]}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="service-steps" className="mt-10 glass-panel rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {t("howTitle")}
        </h2>
        <div className="mt-6 grid gap-4">
          {details.how.map((step, index) => (
            <div
              key={`${service.id}-${index}`}
              className="rounded-2xl border border-primary/15 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-primary/80">{step[loc]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="service-works" className="mt-10">
        <Link
          href={{ pathname: "/projects", query: { category: service.id } }}
          className={cn(
            buttonVariants({ size: "lg" }),
            "accent-gradient text-white shadow-xl shadow-primary/30",
          )}
        >
          {t("worksCta")}
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>
    </article>
  );
}
