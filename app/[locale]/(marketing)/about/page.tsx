import {
  Bot,
  BrainCircuit,
  Globe,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/ContactForm";

type Props = { params: Promise<{ locale: string }> };
type Locale = "ru" | "kk" | "en";

const aboutContent: Record<
  Locale,
  {
    title: string;
    lead: string;
    servicesTitle: string;
    services: string[];
    whyTitle: string;
    why: string[];
    ctaTitle: string;
  }
> = {
  ru: {
    title: "ZENTRA — разработка цифровых продуктов под ключ",
    lead: "Создаём сайты, мобильные приложения, Telegram-боты и AI-решения для бизнеса. От идеи до запуска.",
    servicesTitle: "Что мы делаем",
    services: [
      "Веб-сайты",
      "Мобильные приложения",
      "Telegram-боты",
      "AI-ассистенты",
      "Интернет-магазины",
    ],
    whyTitle: "Почему ZENTRA",
    why: [
      "Качественная разработка",
      "Интеграция AI",
      "Чистая архитектура",
      "Личный кабинет клиента",
    ],
    ctaTitle: "Готовы обсудить ваш проект?",
  },
  kk: {
    title: "ZENTRA — цифрлық өнімдерді толық циклмен әзірлеу",
    lead: "Бизнеске арналған сайттар, мобильді қосымшалар, Telegram-боттар және AI-шешімдер жасаймыз. Идеядан іске қосуға дейін.",
    servicesTitle: "Біз не жасаймыз",
    services: [
      "Веб-сайттар",
      "Мобильді қосымшалар",
      "Telegram-боттар",
      "AI-ассистенттер",
      "Интернет-дүкендер",
    ],
    whyTitle: "Неге ZENTRA",
    why: [
      "Сапалы әзірлеу",
      "AI интеграциясы",
      "Таза архитектура",
      "Клиенттің жеке кабинеті",
    ],
    ctaTitle: "Жобаңызды талқылауға дайынсыз ба?",
  },
  en: {
    title: "ZENTRA — turnkey digital product development",
    lead: "We build websites, mobile apps, Telegram bots, and AI solutions for business. From idea to launch.",
    servicesTitle: "What we do",
    services: [
      "Websites",
      "Mobile applications",
      "Telegram bots",
      "AI assistants",
      "E-commerce stores",
    ],
    whyTitle: "Why ZENTRA",
    why: [
      "High-quality development",
      "AI integration",
      "Clean architecture",
      "Client portal",
    ],
    ctaTitle: "Ready to discuss your project?",
  },
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (["ru", "kk", "en"].includes(locale) ? locale : "ru") as Locale;
  const t = aboutContent[loc];
  const serviceIcons = [Globe, Smartphone, Bot, BrainCircuit, Store];
  const whyIcons = [Rocket, Sparkles, ShieldCheck, LockKeyhole];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section id="about-hero" className="glass-panel relative min-h-[22rem] overflow-hidden rounded-3xl p-8 sm:min-h-[26rem] sm:p-10">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src="/about/about.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(31,91,255,0.72),rgba(31,91,255,0.46))]" />
        <div className="relative z-10 mt-auto flex min-h-[18rem] flex-col justify-end sm:min-h-[22rem]">
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90">{t.lead}</p>
        </div>
      </section>

      <section id="about-services" className="mt-10">
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.servicesTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Globe;
            return (
              <div key={service} className="glass-panel rounded-2xl p-5">
                <Icon className="size-5 text-primary" />
                <p className="mt-3 text-primary/85">{service}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about-why" className="mt-10">
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.whyTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {t.why.map((item, index) => {
            const Icon = whyIcons[index] ?? Sparkles;
            return (
              <div key={item} className="glass-panel rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="font-medium text-primary/85">{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about-contact" className="mt-10">
        <h3 className="text-2xl font-semibold tracking-tight text-primary">{t.ctaTitle}</h3>
        <div className="mt-5">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
