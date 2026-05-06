import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-white">404</h1>
      <p className="mt-3 max-w-md text-white/65">
        Страница не найдена. Вернитесь на главную или воспользуйтесь меню.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        На главную
      </Link>
    </div>
  );
}
