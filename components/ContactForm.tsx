"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  projectType: z.enum(["site", "mobile", "telegram", "ai", "shop", "other"]),
  description: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;
type ProjectTypeValue = FormValues["projectType"];

const projectTypeValues: ProjectTypeValue[] = [
  "site",
  "mobile",
  "telegram",
  "ai",
  "shop",
  "other",
];

export function ContactForm() {
  const t = useTranslations("Contact");
  const pt = useTranslations("ProjectTypes");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      projectType: "site",
      description: "",
    },
  });

  function onSubmit(values: FormValues) {
    void values;
    setStatus("success");
    form.reset();
    window.setTimeout(() => setStatus("idle"), 3200);
  }

  function onInvalid() {
    setStatus("error");
    window.setTimeout(() => setStatus("idle"), 2600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="glass-panel rounded-3xl p-6 sm:p-8"
    >
      <form
        className="grid gap-5"
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      >
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              className="border-primary/25 !bg-white"
              {...form.register("name")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              className="border-primary/25 !bg-white"
              {...form.register("phone")}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>{t("projectType")}</Label>
          <Controller
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border-primary/25 !bg-white sm:w-72">
                  <SelectValue>{pt(field.value)}</SelectValue>
                </SelectTrigger>
                <SelectContent className="glass-panel border-primary/20 !bg-white">
                  {projectTypeValues.map((value) => (
                    <SelectItem key={value} value={value}>
                      {pt(value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">{t("description")}</Label>
          <Textarea
            id="description"
            rows={5}
            className="border-primary/25 !bg-white"
            {...form.register("description")}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            className="accent-gradient w-full text-white shadow-lg shadow-primary/30 sm:w-auto"
          >
            <Send className="mr-2 size-4" />
            {t("submit")}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-emerald-300">{t("success")}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-rose-300">{t("error")}</p>
          ) : null}
        </div>
      </form>
    </motion.div>
  );
}
