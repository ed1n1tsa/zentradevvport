export type AppLocale = "ru" | "kk" | "en";

export type ProjectCategoryId =
  | "web"
  | "mobile"
  | "telegram"
  | "ai"
  | "ecommerce"
  | "cabinet";

export type ServiceId =
  | "web"
  | "mobile"
  | "telegram"
  | "ai"
  | "ecommerce"
  | "cabinet";

export interface LocalizedString {
  ru: string;
  kk: string;
  en: string;
}

export interface ProjectItem {
  slug: string;
  category: ProjectCategoryId;
  year: string;
  tech: string[];
  image: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  description: LocalizedString;
}

export interface ServiceItem {
  id: ServiceId;
  icon: "globe" | "smartphone" | "bot" | "sparkles" | "shoppingCart" | "layoutDashboard";
  title: LocalizedString;
  description: LocalizedString;
}

export interface ServiceDetail {
  what: LocalizedString;
  how: LocalizedString[];
}

export interface WhyItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ProcessStep {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface Testimonial {
  id: string;
  name: string;
  role: LocalizedString;
  company: string;
  quote: LocalizedString;
  rating: number;
}

export const projectCategories: {
  id: ProjectCategoryId;
  label: LocalizedString;
}[] = [
  {
    id: "web",
    label: {
      ru: "Веб-сайты",
      kk: "Веб-сайттар",
      en: "Websites",
    },
  },
  {
    id: "mobile",
    label: {
      ru: "Мобильные приложения",
      kk: "Мобильді қосымшалар",
      en: "Mobile apps",
    },
  },
  {
    id: "telegram",
    label: {
      ru: "Telegram-боты",
      kk: "Telegram-боттар",
      en: "Telegram bots",
    },
  },
  {
    id: "ai",
    label: {
      ru: "AI-ассистенты",
      kk: "AI-ассистенттер",
      en: "AI assistants",
    },
  },
  {
    id: "ecommerce",
    label: {
      ru: "Интернет-магазины",
      kk: "Интернет-дүкендер",
      en: "E‑commerce",
    },
  },
  {
    id: "cabinet",
    label: {
      ru: "Windows приложения",
      kk: "Windows қосымшалары",
      en: "Windows applications",
    },
  },
];

export const services: ServiceItem[] = [
  {
    id: "web",
    icon: "globe",
    title: {
      ru: "Веб-сайты",
      kk: "Веб-сайттар",
      en: "Websites",
    },
    description: {
      ru: "Лендинги, корпоративные порталы и сложные веб-платформы.",
      kk: "Лендингтер, корпоративті порталдар және күрделі веб-платформалар.",
      en: "Landing pages, corporate portals, and complex web platforms.",
    },
  },
  {
    id: "mobile",
    icon: "smartphone",
    title: {
      ru: "Мобильные приложения",
      kk: "Мобильді қосымшалар",
      en: "Mobile apps",
    },
    description: {
      ru: "iOS и Android с продуманным UX и стабильной архитектурой.",
      kk: "UX ойластырылған және тұрақты архитектуралы iOS және Android.",
      en: "iOS and Android with thoughtful UX and solid architecture.",
    },
  },
  {
    id: "telegram",
    icon: "bot",
    title: {
      ru: "Telegram-боты",
      kk: "Telegram-боттар",
      en: "Telegram bots",
    },
    description: {
      ru: "Автоматизация продаж, поддержка и интеграции с CRM.",
      kk: "Сатуды автоматтандыру, қолдау және CRM интеграциялары.",
      en: "Sales automation, support, and CRM integrations.",
    },
  },
  {
    id: "ai",
    icon: "sparkles",
    title: {
      ru: "AI-ассистенты",
      kk: "AI-ассистенттер",
      en: "AI assistants",
    },
    description: {
      ru: "Чат-боты, RAG и инструменты для команды на базе LLM.",
      kk: "Чат-боттар, RAG және LLM негізіндегі құралдар.",
      en: "Chatbots, RAG, and LLM-powered tools for your team.",
    },
  },
  {
    id: "ecommerce",
    icon: "shoppingCart",
    title: {
      ru: "Интернет-магазины",
      kk: "Интернет-дүкендер",
      en: "E‑commerce",
    },
    description: {
      ru: "Каталоги, оплата, аналитика и интеграции доставки.",
      kk: "Каталогтар, төлем, аналитика және жеткізу интеграциялары.",
      en: "Catalogs, payments, analytics, and shipping integrations.",
    },
  },
  {
    id: "cabinet",
    icon: "layoutDashboard",
    title: {
      ru: "Windows приложения",
      kk: "Windows қосымшалары",
      en: "Windows applications",
    },
    description: {
      ru: "Desktop-решения под Windows для внутренних процессов и рабочих команд.",
      kk: "Ішкі процестер мен командаларға арналған Windows desktop-шешімдері.",
      en: "Windows desktop solutions for internal operations and team workflows.",
    },
  },
];

export const serviceDetails: Record<ServiceId, ServiceDetail> = {
  web: {
    what: {
      ru: "Создаем сайты, которые не только красиво выглядят, но и конвертируют: от лендингов до корпоративных платформ с интеграциями.",
      kk: "Тек әдемі емес, сонымен қатар конверсия беретін сайттар жасаймыз: лендингтен интеграциясы бар корпоративті платформаларға дейін.",
      en: "We build websites that look great and convert—from landing pages to integrated corporate platforms.",
    },
    how: [
      {
        ru: "Проводим бриф и определяем бизнес-цели, структуру и KPI сайта.",
        kk: "Бриф өткізіп, сайттың бизнес мақсаттарын, құрылымын және KPI-ларын анықтаймыз.",
        en: "We run discovery and define business goals, structure, and KPIs.",
      },
      {
        ru: "Проектируем UX-прототипы и визуальную систему интерфейса.",
        kk: "UX прототиптерін және визуалды интерфейс жүйесін жобалаймыз.",
        en: "We design UX prototypes and a visual UI system.",
      },
      {
        ru: "Разрабатываем, тестируем и запускаем с аналитикой и SEO-базой.",
        kk: "Әзірлейміз, тестілейміз және аналитика мен SEO негізімен іске қосамыз.",
        en: "We develop, test, and launch with analytics and SEO basics.",
      },
    ],
  },
  mobile: {
    what: {
      ru: "Разрабатываем мобильные приложения для iOS и Android с удобным UX, стабильной архитектурой и готовностью к росту продукта.",
      kk: "iOS және Android үшін ыңғайлы UX, тұрақты архитектура және өнім өсуіне дайын мобильді қосымшалар жасаймыз.",
      en: "We build iOS and Android apps with strong UX, stable architecture, and room to scale.",
    },
    how: [
      {
        ru: "Собираем требования, сценарии и пользовательские флоу.",
        kk: "Талаптарды, сценарийлерді және пайдаланушы флоуларын жинаймыз.",
        en: "We gather requirements, scenarios, and user flows.",
      },
      {
        ru: "Готовим кликабельный прототип и UI-kit под обе платформы.",
        kk: "Екі платформаға арналған кликабельді прототип пен UI-kit дайындаймыз.",
        en: "We create a clickable prototype and UI kit for both platforms.",
      },
      {
        ru: "Реализуем приложение, подключаем API и публикуем в сторы.",
        kk: "Қосымшаны жасап, API қосып, сторларға жариялаймыз.",
        en: "We implement the app, integrate APIs, and publish to stores.",
      },
    ],
  },
  telegram: {
    what: {
      ru: "Запускаем Telegram-ботов для продаж, поддержки и внутренних процессов с интеграцией CRM и внешних сервисов.",
      kk: "CRM және сыртқы сервистермен интеграцияланған сату, қолдау және ішкі процестерге арналған Telegram-боттар жасаймыз.",
      en: "We launch Telegram bots for sales, support, and internal operations with CRM integrations.",
    },
    how: [
      {
        ru: "Проектируем логику команд, сценарии диалогов и роли пользователей.",
        kk: "Командалар логикасын, диалог сценарийлерін және пайдаланушы рөлдерін жобалаймыз.",
        en: "We design command logic, conversation flows, and user roles.",
      },
      {
        ru: "Интегрируем бота с CRM, платежами, уведомлениями и админ-панелью.",
        kk: "Ботты CRM, төлемдер, хабарламалар және админ панельмен интеграциялаймыз.",
        en: "We integrate the bot with CRM, payments, notifications, and admin tooling.",
      },
      {
        ru: "Тестируем edge-cases, подключаем аналитику и запускаем в прод.",
        kk: "Edge-case-терді тестілеп, аналитиканы қосып, продқа шығарамыз.",
        en: "We test edge cases, add analytics, and ship to production.",
      },
    ],
  },
  ai: {
    what: {
      ru: "Делаем AI-ассистентов и автоматизации на базе LLM: поддержка, база знаний, внутренние инструменты для команд.",
      kk: "LLM негізінде AI-ассистенттер мен автоматтандыру жасаймыз: қолдау, білім базасы, командалық ішкі құралдар.",
      en: "We build LLM-powered AI assistants and automations for support, knowledge, and internal team workflows.",
    },
    how: [
      {
        ru: "Определяем сценарии, где AI дает измеримую пользу бизнесу.",
        kk: "AI бизнеске нақты пайда беретін сценарийлерді анықтаймыз.",
        en: "We identify AI use cases with measurable business impact.",
      },
      {
        ru: "Настраиваем RAG, источники данных и контроль качества ответов.",
        kk: "RAG, дереккөздер және жауап сапасын бақылауды баптаймыз.",
        en: "We set up RAG, data sources, and response quality controls.",
      },
      {
        ru: "Интегрируем в текущие процессы и обучаем команду работе с системой.",
        kk: "Қазіргі процестерге интеграциялап, команданы жүйемен жұмыс істеуге үйретеміз.",
        en: "We integrate into existing workflows and train your team.",
      },
    ],
  },
  ecommerce: {
    what: {
      ru: "Разрабатываем интернет-магазины с удобным каталогом, быстрым чекаутом и интеграциями оплаты, доставки и аналитики.",
      kk: "Ыңғайлы каталогы, жылдам checkout және төлем, жеткізу, аналитика интеграциялары бар интернет-дүкендер жасаймыз.",
      en: "We build e-commerce stores with smooth catalog UX, fast checkout, and payment/shipping/analytics integrations.",
    },
    how: [
      {
        ru: "Проектируем структуру каталога, карточки товара и путь до оплаты.",
        kk: "Каталог құрылымын, тауар картасын және төлемге дейінгі жолды жобалаймыз.",
        en: "We design catalog structure, product pages, and checkout flow.",
      },
      {
        ru: "Интегрируем платежи, доставку, CRM и маркетинговые инструменты.",
        kk: "Төлем, жеткізу, CRM және маркетинг құралдарын интеграциялаймыз.",
        en: "We integrate payments, shipping, CRM, and marketing tools.",
      },
      {
        ru: "Настраиваем аналитику конверсий и дорабатываем узкие места после запуска.",
        kk: "Конверсия аналитикасын орнатып, іске қосқаннан кейін тар орындарды жетілдіреміз.",
        en: "We configure conversion analytics and optimize post-launch bottlenecks.",
      },
    ],
  },
  cabinet: {
    what: {
      ru: "Разрабатываем Windows-приложения для бизнеса: внутренние инструменты, учетные системы, операторские панели и desktop-продукты с интеграциями.",
      kk: "Бизнеске арналған Windows-қосымшалар жасаймыз: ішкі құралдар, есеп жүйелері, оператор панельдері және интеграциясы бар desktop өнімдер.",
      en: "We build Windows applications for business: internal tools, accounting systems, operator panels, and integrated desktop products.",
    },
    how: [
      {
        ru: "Собираем требования по ролям, сценариям сотрудников и бизнес-процессам.",
        kk: "Рөлдер, қызметкерлер сценарийлері және бизнес-процестер бойынша талаптарды жинаймыз.",
        en: "We gather requirements around user roles, employee scenarios, and business processes.",
      },
      {
        ru: "Проектируем удобный desktop-интерфейс под Windows с акцентом на скорость и понятную навигацию.",
        kk: "Жылдамдық пен түсінікті навигацияға назар аудара отырып, Windows үшін ыңғайлы desktop-интерфейс жобалаймыз.",
        en: "We design a Windows-first desktop interface focused on speed and clarity.",
      },
      {
        ru: "Реализуем функционал, интеграции с API/БД, устанавливаем у клиента и сопровождаем после запуска.",
        kk: "Функционалды, API/ДБ интеграцияларын жүзеге асырамыз, клиентке орнатып, іске қосқаннан кейін сүйемелдейміз.",
        en: "We implement core features, API/database integrations, deploy to client environments, and provide post-launch support.",
      },
    ],
  },
};

export const whyItems: WhyItem[] = [
  {
    id: "design",
    title: {
      ru: "Современный дизайн",
      kk: "Заманауи дизайн",
      en: "Modern design",
    },
    description: {
      ru: "Премиальный UI, анимации и консистентная дизайн-система.",
      kk: "Премиум UI, анимациялар және тұрақты дизайн жүйесі.",
      en: "Premium UI, motion, and a consistent design system.",
    },
  },
  {
    id: "architecture",
    title: {
      ru: "Чистая архитектура",
      kk: "Таза архитектура",
      en: "Clean architecture",
    },
    description: {
      ru: "Масштабируемый код, понятная структура и документация.",
      kk: "Өлшемделінетін код, түсінікті құрылым және құжаттама.",
      en: "Scalable code, clear structure, and documentation.",
    },
  },
  {
    id: "ai",
    title: {
      ru: "Интеграция AI",
      kk: "AI интеграциясы",
      en: "AI integration",
    },
    description: {
      ru: "Умные сценарии: от поддержки до автоматизации процессов.",
      kk: "Ақылды сценарийлер: қолдаудан процестерді автоматтандыруға дейін.",
      en: "Smart flows—from support to process automation.",
    },
  },
  {
    id: "portal",
    title: {
      ru: "Личный кабинет клиента",
      kk: "Клиенттің жеке кабинеті",
      en: "Client portal",
    },
    description: {
      ru: "Прозрачность этапов, файлы, сообщения и статус проекта.",
      kk: "Қадамдардың ашықтығы, файлдар, хабарламалар және жоба статусы.",
      en: "Stages, files, messages, and project status—transparent by design.",
    },
  },
  {
    id: "support",
    title: {
      ru: "Поддержка после запуска",
      kk: "Іске қосқаннан кейін қолдау",
      en: "Post‑launch support",
    },
    description: {
      ru: "Сопровождение, доработки и мониторинг после релиза.",
      kk: "Сүйемелдеу, жетілдірулер және релизден кейін бақылау.",
      en: "Maintenance, iterations, and monitoring after release.",
    },
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "analysis",
    title: { ru: "Анализ", kk: "Талдау", en: "Discovery" },
    description: {
      ru: "Погружаемся в бизнес-цели, аудиторию и ограничения.",
      kk: "Бизнес мақсаттарға, аудиторияға және шектеулерге сүңгеміз.",
      en: "We align on goals, audience, and constraints.",
    },
  },
  {
    id: "prototype",
    title: { ru: "Прототип", kk: "Прототип", en: "Prototype" },
    description: {
      ru: "Быстрый каркас и сценарии пользовательских путей.",
      kk: "Жылдам каркас және пайдаланушы жолдарының сценарийлері.",
      en: "Fast wireframes and user journey scenarios.",
    },
  },
  {
    id: "design",
    title: { ru: "Дизайн", kk: "Дизайн", en: "Design" },
    description: {
      ru: "UI‑kit, экраны и интерактивные состояния.",
      kk: "UI‑kit, экрандар және интерактивті күйлер.",
      en: "UI kit, screens, and interactive states.",
    },
  },
  {
    id: "dev",
    title: { ru: "Разработка", kk: "Әзірлеу", en: "Development" },
    description: {
      ru: "Итерации, код‑ревью, CI/CD и безопасные релизы.",
      kk: "Итерациялар, код‑ревью, CI/CD және қауіпсіз релиздер.",
      en: "Iterations, code review, CI/CD, and safe releases.",
    },
  },
  {
    id: "qa",
    title: { ru: "Тестирование", kk: "Тестілеу", en: "QA" },
    description: {
      ru: "Функциональное, кросс‑браузерное и нагрузочное тестирование.",
      kk: "Функционалды, кросс‑браузерлік және жүктемелік тестілеу.",
      en: "Functional, cross‑browser, and load testing.",
    },
  },
  {
    id: "launch",
    title: { ru: "Запуск", kk: "Іске қосу", en: "Launch" },
    description: {
      ru: "Деплой, мониторинг и передача доступов.",
      kk: "Деплой, мониторинг және қол жеткізуді беру.",
      en: "Deploy, monitoring, and handover.",
    },
  },
  {
    id: "care",
    title: { ru: "Поддержка", kk: "Қолдау", en: "Support" },
    description: {
      ru: "Планы сопровождения и развитие продукта.",
      kk: "Сүйемелдеу жоспарлары және өнімді дамыту.",
      en: "Care plans and continuous improvement.",
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Айгерим Н.",
    role: {
      ru: "CEO",
      kk: "CEO",
      en: "CEO",
    },
    company: "Nova Retail",
    quote: {
      ru: "Команда ZENTRA собрала интернет‑магазин за рекордные сроки — чистый код и отличная коммуникация.",
      kk: "ZENTRA команда интернет‑дүкенді рекордтық мерзімде орнатты — таза код және тамаша коммуникация.",
      en: "ZENTRA shipped our store fast—clean code and great communication.",
    },
    rating: 5,
  },
  {
    id: "t2",
    name: "Daniel K.",
    role: {
      ru: "Product Lead",
      kk: "Product Lead",
      en: "Product Lead",
    },
    company: "Flowdesk",
    quote: {
      ru: "AI‑ассистент реально снял нагрузку с поддержки. Интеграции прошли без боли.",
      kk: "AI‑ассистент қолдау жүктемесін шынымен азайтты. Интеграциялар ауырсынусыз өтті.",
      en: "The AI assistant seriously reduced support load—integrations were painless.",
    },
    rating: 5,
  },
  {
    id: "t3",
    name: "Ерлан С.",
    role: {
      ru: "Основатель",
      kk: "Негізін қалаушы",
      en: "Founder",
    },
    company: "Steppe Logistics",
    quote: {
      ru: "Личный кабинет клиента — это то, чего нам не хватало: статусы, файлы и сообщения в одном месте.",
      kk: "Клиент кабинеті — бізге жетіспеген нәрсе: статустар, файлдар және хабарламалар бір жерде.",
      en: "The client portal was the missing piece—status, files, and messages in one place.",
    },
    rating: 5,
  },
];

export const projects: ProjectItem[] = [
  {
    slug: "aurora-analytics",
    category: "web",
    year: "2025",
    tech: ["Next.js", "TypeScript", "Supabase"],
    image: "/globe.svg",
    title: {
      ru: "Aurora Analytics",
      kk: "Aurora Analytics",
      en: "Aurora Analytics",
    },
    excerpt: {
      ru: "Корпоративный дашборд с ролями и аналитикой в реальном времени.",
      kk: "Рөлдері бар корпоративтік дашборд және нақты уақытта аналитика.",
      en: "Corporate dashboard with roles and real‑time analytics.",
    },
    description: {
      ru: "Платформа для руководителей с KPI, отчётами и контролем доступа. Оптимизация производительности и безопасности.",
      kk: "KPI, есептер және қол жеткізуді басқару арқылы басшыларға арналған платформа. Өнімділік пен қауіпсіздікті оңтайландыру.",
      en: "Executive platform with KPIs, reporting, and access control—performance and security tuned.",
    },
  },
  {
    slug: "pulse-mobile",
    category: "mobile",
    year: "2025",
    tech: ["React Native", "Expo", "Stripe"],
    image: "/globe.svg",
    title: {
      ru: "Pulse Fitness",
      kk: "Pulse Fitness",
      en: "Pulse Fitness",
    },
    excerpt: {
      ru: "Мобильное приложение для абонементов и тренировок.",
      kk: "Абонементтер мен жаттығуларға арналған мобильді қосымша.",
      en: "Mobile app for memberships and workouts.",
    },
    description: {
      ru: "Подписки, расписание и персональные планы. Офлайн‑режим и плавные анимации интерфейса.",
      kk: "Жазылымдар, кесте және жеке жоспарлар. Офлайн режимі және интерфейстің жеңіл анимациялары.",
      en: "Subscriptions, schedules, and personal plans—offline mode and smooth UI motion.",
    },
  },
  {
    slug: "orbit-bot",
    category: "telegram",
    year: "2024",
    tech: ["Node.js", "PostgreSQL", "Telegram API"],
    image: "/globe.svg",
    title: {
      ru: "Orbit Concierge",
      kk: "Orbit Concierge",
      en: "Orbit Concierge",
    },
    excerpt: {
      ru: "Telegram‑бот для заявок и статусов заказов.",
      kk: "Өтінімдер мен тапсырыс статустары үшін Telegram‑бот.",
      en: "Telegram bot for requests and order statuses.",
    },
    description: {
      ru: "Интеграция с CRM, шаблоны ответов и эскалация на оператора.",
      kk: "CRM интеграциясы, жауап үлгілері және операторға эскалация.",
      en: "CRM integration, response templates, and operator escalation.",
    },
  },
  {
    slug: "vertex-ai",
    category: "ai",
    year: "2025",
    tech: ["OpenAI", "Next.js", "Vector DB"],
    image: "/globe.svg",
    title: {
      ru: "Vertex Knowledge",
      kk: "Vertex Knowledge",
      en: "Vertex Knowledge",
    },
    excerpt: {
      ru: "RAG‑ассистент для внутренней базы знаний компании.",
      kk: "Компанияның ішкі білім базасы үшін RAG‑ассистент.",
      en: "RAG assistant for internal knowledge bases.",
    },
    description: {
      ru: "Векторный поиск, источники ответов и права доступа по командам.",
      kk: "Векторлық іздеу, жауап көздері және командалар бойынша қол жеткізу құқықтары.",
      en: "Vector search, cited answers, and team‑based permissions.",
    },
  },
  {
    slug: "lyra-shop",
    category: "ecommerce",
    year: "2024",
    tech: ["Next.js", "Shopify", "Payments"],
    image: "/globe.svg",
    title: {
      ru: "Lyra Boutique",
      kk: "Lyra Boutique",
      en: "Lyra Boutique",
    },
    excerpt: {
      ru: "Интернет‑магазин fashion‑бренда с быстрой оплатой.",
      kk: "Жылдам төлемі бар fashion‑бренд интернет‑дүкені.",
      en: "Fashion e‑commerce with fast checkout.",
    },
    description: {
      ru: "Каталог, фильтры, промокоды и аналитика конверсий.",
      kk: "Каталог, сүзгілер, промокодтар және конверсия аналитикасы.",
      en: "Catalog, filters, promos, and conversion analytics.",
    },
  },
  {
    slug: "nimbus-portal",
    category: "cabinet",
    year: "2023",
    tech: [".NET", "WPF", "MS SQL"],
    image: "/globe.svg",
    title: {
      ru: "Nimbus Desk",
      kk: "Nimbus Desk",
      en: "Nimbus Desk",
    },
    excerpt: {
      ru: "Windows-приложение для операторов с очередями заявок и отчетами.",
      kk: "Өтінім кезектері мен есептері бар операторларға арналған Windows-қосымша.",
      en: "Windows app for operators with request queues and reporting.",
    },
    description: {
      ru: "Desktop-система для внутренней команды: обработка заявок, контроль статусов, экспорт отчетов и синхронизация с корпоративной базой.",
      kk: "Ішкі командаға арналған desktop-жүйе: өтінімдерді өңдеу, статустарды бақылау, есеп экспорттау және корпоративті базамен синхрондау.",
      en: "Desktop system for internal teams: request processing, status tracking, report export, and sync with corporate databases.",
    },
  },
];

export function getLocalized<T extends LocalizedString>(
  item: T,
  locale: AppLocale,
): string {
  return item[locale];
}

export function projectsByCategory(category: ProjectCategoryId | "all") {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}

export const adminDashboardStats = {
  projects: 18,
  requests: 42,
  activeClients: 9,
  inProgress: 5,
};

export type RequestStatus = "new" | "in_review" | "closed";

export interface LeadRequest {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  status: RequestStatus;
  createdAt: string;
}

export const mockRequests: LeadRequest[] = [
  {
    id: "req-1",
    name: "Марат А.",
    phone: "+7 700 000‑11‑22",
    projectType: "Сайт",
    status: "new",
    createdAt: "2026-05-01",
  },
  {
    id: "req-2",
    name: "Sara M.",
    phone: "+1 415 555‑0199",
    projectType: "AI-ассистент",
    status: "in_review",
    createdAt: "2026-04-28",
  },
  {
    id: "req-3",
    name: "Бауыржан Т.",
    phone: "+7 747 333‑44‑55",
    projectType: "Telegram-бот",
    status: "closed",
    createdAt: "2026-04-20",
  },
];

export interface AdminProjectRow {
  id: string;
  name: string;
  client: string;
  status: "active" | "paused" | "done";
  updatedAt: string;
}

export const mockAdminProjects: AdminProjectRow[] = [
  {
    id: "p-101",
    name: "Aurora Analytics",
    client: "Nova Retail",
    status: "active",
    updatedAt: "2026-05-02",
  },
  {
    id: "p-102",
    name: "Pulse Fitness",
    client: "Pulse LLC",
    status: "active",
    updatedAt: "2026-04-30",
  },
  {
    id: "p-103",
    name: "Orbit Concierge",
    client: "Orbit",
    status: "paused",
    updatedAt: "2026-03-15",
  },
];

export interface ClientTask {
  id: string;
  title: string;
  done: boolean;
}

export interface ClientFile {
  id: string;
  name: string;
  size: string;
}

export interface ClientMessage {
  id: string;
  author: "client" | "team";
  text: string;
  time: string;
}

export interface ClientPayment {
  id: string;
  title: string;
  amount: string;
  status: "paid" | "pending";
  due: string;
}

export interface ClientProjectOverview {
  projectName: string;
  stage: string;
  progress: number;
  deadline: string;
  tasks: ClientTask[];
  files: ClientFile[];
  messages: ClientMessage[];
  payments: ClientPayment[];
}

export const mockClientProject: ClientProjectOverview = {
  projectName: "Aurora Analytics",
  stage: "Разработка",
  progress: 62,
  deadline: "2026-06-15",
  tasks: [
    { id: "1", title: "Согласовать UX‑сценарии отчётов", done: true },
    { id: "2", title: "Интеграция SSO", done: false },
    { id: "3", title: "Финальный проход по доступам ролей", done: false },
  ],
  files: [
    { id: "f1", name: "Design_system_v3.fig", size: "12 MB" },
    { id: "f2", name: "API_contracts.pdf", size: "840 KB" },
  ],
  messages: [
    {
      id: "m1",
      author: "team",
      text: "Подготовили черновик модулей аналитики — ждём ваш фидбек до пятницы.",
      time: "10:24",
    },
    {
      id: "m2",
      author: "client",
      text: "Отлично, посмотрим и вернёмся со списком правок.",
      time: "11:02",
    },
  ],
  payments: [
    {
      id: "pay1",
      title: "Этап: Дизайн",
      amount: "1 200 000 ₸",
      status: "paid",
      due: "2026-04-10",
    },
    {
      id: "pay2",
      title: "Этап: Разработка (40%)",
      amount: "2 400 000 ₸",
      status: "pending",
      due: "2026-05-20",
    },
  ],
};
