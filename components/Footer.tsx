import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/15 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="text-sm font-semibold text-primary">ZENTRA</div>
          <p className="mt-1 text-sm text-primary/65">
            {t("rights", { year })}
          </p>
        </div>
        <div className="text-sm text-primary/70 sm:items-end">
          <div className="flex flex-wrap gap-4">
            <span className="cursor-default hover:text-primary">{t("privacy")}</span>
            <span className="cursor-default hover:text-primary">{t("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
