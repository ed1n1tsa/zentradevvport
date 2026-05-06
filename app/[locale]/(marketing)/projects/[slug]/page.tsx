import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageSquareQuote, Milestone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { ProjectGalleryLightbox } from "@/components/ProjectGalleryLightbox";
import { ProjectPdfPreviewButton } from "@/components/ProjectPdfPreviewButton";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/lib/data";
import { getLocalized } from "@/lib/data";
import {
  getProjectGalleryBySlug,
  getProjectPdfBySlug,
  getPublishedProjects,
} from "@/lib/projects-db";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

const detailExtras = {
  ru: {
    projectStory: "История проекта",
    stagesTitle: "Этапы разработки",
    reviewTitle: "Отзыв клиента",
    story: (name: string) =>
      `Проект ${name} стартовал с аудита текущих процессов и постановки KPI. Затем команда собрала прототип, согласовала UX-сценарии и перешла к поэтапной реализации с регулярными демо.`,
    stages: [
      "Discovery и аналитика задач бизнеса",
      "UX/UI-проектирование и прототипирование",
      "Разработка функционала и интеграций",
      "Тестирование, релиз и сопровождение",
    ],
    review:
      "Команда работала прозрачно по этапам: мы всегда понимали, на каком статусе проект и что будет дальше. Итог — удобный продукт, который реально помогает в ежедневной работе.",
    reviewAuthor: "Клиент проекта",
    faqTitle: "FAQ по проекту",
    faqItems: [
      {
        q: "Сколько заняла разработка?",
        a: "От первой аналитики до релиза проект занял 8 недель, включая дизайн, разработку, тестирование и подготовку контента.",
      },
      {
        q: "Кто работал над проектом?",
        a: "Над проектом работала кросс‑функциональная команда: project manager, UX/UI дизайнер, frontend и backend разработчики, а также QA инженер.",
      },
      {
        q: "Какой стек использовался?",
        a: "Использовали современный web‑стек с акцентом на производительность, масштабируемость и удобство дальнейшей поддержки проекта.",
      },
      {
        q: "Есть ли поддержка после релиза?",
        a: "Да, после запуска мы сопровождаем проект: мониторинг, исправления, улучшения и развитие функциональности по roadmap.",
      },
    ],
    galleryTitle: "Галерея проекта",
    pdfButton: "Посмотреть работу",
  },
  kk: {
    projectStory: "Жоба тарихы",
    stagesTitle: "Әзірлеу кезеңдері",
    reviewTitle: "Клиент пікірі",
    story: (name: string) =>
      `${name} жобасы бизнес-процестер аудиті мен KPI анықтаудан басталды. Кейін команда прототип дайындап, UX сценарийлерін бекітті де, тұрақты демолармен кезең-кезеңімен іске асырды.`,
    stages: [
      "Discovery және бизнес міндеттерін талдау",
      "UX/UI жобалау және прототиптеу",
      "Функционал мен интеграцияларды әзірлеу",
      "Тестілеу, релиз және сүйемелдеу",
    ],
    review:
      "Команда кезеңдер бойынша ашық жұмыс істеді: жобаның қай статусында екенін және келесі қадамды әрдайым түсініп отырдық. Нәтижесінде күнделікті жұмысқа ыңғайлы өнім алдық.",
    reviewAuthor: "Жоба клиенті",
    faqTitle: "Жоба бойынша FAQ",
    faqItems: [
      {
        q: "Әзірлеу қанша уақытқа созылды?",
        a: "Алғашқы аналитикадан релизге дейін жоба 8 аптаға созылды: дизайн, әзірлеу, тестілеу және контент дайындау кезеңдері кірді.",
      },
      {
        q: "Жобада қандай команда жұмыс істеді?",
        a: "Жобаға project manager, UX/UI дизайнер, frontend және backend әзірлеушілері, сондай-ақ QA инженері қатысты.",
      },
      {
        q: "Қандай технологиялар қолданылды?",
        a: "Жобада өнімділікке, масштабталуға және кейінгі қолдаудың ыңғайлылығына бағытталған заманауи web‑стек қолданылды.",
      },
      {
        q: "Релизден кейін қолдау бар ма?",
        a: "Иә, іске қосқаннан кейін біз жобаны сүйемелдейміз: мониторинг, қателерді түзету, жақсартулар және roadmap бойынша дамыту.",
      },
    ],
    galleryTitle: "Жоба галереясы",
    pdfButton: "Жұмысты көру",
  },
  en: {
    projectStory: "Project story",
    stagesTitle: "Development stages",
    reviewTitle: "Client review",
    story: (name: string) =>
      `The ${name} project started with process audit and KPI alignment. The team then prepared a prototype, validated UX scenarios, and moved into phased implementation with regular demos.`,
    stages: [
      "Discovery and business analysis",
      "UX/UI design and prototyping",
      "Feature and integration development",
      "QA, release, and post-launch support",
    ],
    review:
      "The team worked transparently across milestones: we always knew project status and next steps. The result is a practical product that helps our daily operations.",
    reviewAuthor: "Project client",
    faqTitle: "Project FAQ",
    faqItems: [
      {
        q: "How long did development take?",
        a: "From discovery to launch, the project took 8 weeks including design, implementation, QA, and content preparation.",
      },
      {
        q: "Who worked on this project?",
        a: "A cross-functional team handled delivery: project manager, UX/UI designer, frontend and backend engineers, and a QA specialist.",
      },
      {
        q: "What tech stack was used?",
        a: "We used a modern web stack focused on performance, scalability, and maintainability for future product growth.",
      },
      {
        q: "Do you provide post-launch support?",
        a: "Yes. After release we continue support with monitoring, fixes, iterative improvements, and roadmap-based enhancements.",
      },
    ],
    galleryTitle: "Project gallery",
    pdfButton: "View work",
  },
} as const;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const projects = await getPublishedProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const galleryImages = await getProjectGalleryBySlug(slug);
  const projectPdf = await getProjectPdfBySlug(slug);

  const t = await getTranslations({ locale, namespace: "ProjectDetail" });
  const loc = locale as AppLocale;
  const extras = detailExtras[loc];

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-8 -ml-2 inline-flex text-primary/85 hover:bg-primary/10 hover:text-primary",
        )}
      >
        <ArrowLeft className="mr-2 size-4" />
        {t("back")}
      </Link>

      <section id="project-intro" className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-primary/15">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {getLocalized(project.title, loc)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary/75">
            {getLocalized(project.description, loc)}
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary/60">
              {t("stack")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-sm text-primary/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-10 accent-gradient text-white shadow-xl shadow-primary/30",
            )}
          >
            {t("cta")}
          </Link>
          {projectPdf ? (
            <ProjectPdfPreviewButton pdfUrl={projectPdf} label={extras.pdfButton} />
          ) : null}
        </div>
      </section>

      <section id="project-story" className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Milestone className="size-5 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight text-primary">
              {extras.projectStory}
            </h2>
          </div>
          <p className="mt-4 text-primary/75">{extras.story(getLocalized(project.title, loc))}</p>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="size-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight text-primary">
              {extras.reviewTitle}
            </h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary/75">“{extras.review}”</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary/60">
            {extras.reviewAuthor}
          </p>
        </div>
      </section>

      <section id="project-stages" className="mt-8 glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {extras.stagesTitle}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {extras.stages.map((stage, index) => (
            <div
              key={`${project.slug}-stage-${index}`}
              className="rounded-2xl border border-primary/15 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-primary/80">{stage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="project-gallery" className="mt-8 glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {extras.galleryTitle}
        </h2>
        <ProjectGalleryLightbox images={galleryImages.length > 0 ? galleryImages : [project.image]} />
      </section>
    </article>
  );
}
