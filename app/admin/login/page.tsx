"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ru from "@/messages/ru.json";

const copy = ru.Admin;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextFieldErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextFieldErrors.email = "Введите email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextFieldErrors.email = "Некорректный формат email.";
    }

    if (!password.trim()) {
      nextFieldErrors.password = "Введите пароль.";
    } else if (password.trim().length < 6) {
      nextFieldErrors.password = "Минимум 6 символов.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) return;

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Не удалось войти.");
      setLoading(false);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-6">
      <div className="glass-panel relative w-full max-w-md overflow-hidden rounded-3xl border border-primary/20 bg-white p-8 shadow-[0_24px_60px_rgba(31,91,255,0.2)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(31,91,255,0.32)_0%,rgba(31,91,255,0)_72%)]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(31,91,255,0.22)_0%,rgba(31,91,255,0)_74%)] [animation-delay:320ms]" />
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-lg shadow-primary/30">
            Z
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-primary">ZENTRA</div>
            <div className="text-xs text-primary/60">Admin Panel</div>
          </div>
          <ShieldCheck className="ml-auto size-5 text-primary/70" />
        </div>

        <h1 className="relative z-10 text-2xl font-semibold text-primary">{copy.loginTitle}</h1>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">{copy.email}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className="border-primary/20 !bg-white"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
            />
            {fieldErrors.email ? (
              <p className="text-xs text-rose-400">{fieldErrors.email}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{copy.password}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="border-primary/20 !bg-white pr-10"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-primary/65 transition hover:text-primary"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {fieldErrors.password ? (
              <p className="text-xs text-rose-400">{fieldErrors.password}</p>
            ) : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <Button
            type="submit"
            disabled={loading}
            className="accent-gradient w-full justify-center text-white"
          >
            {loading ? "Входим..." : copy.signIn}
          </Button>
        </form>
      </div>
    </div>
  );
}
