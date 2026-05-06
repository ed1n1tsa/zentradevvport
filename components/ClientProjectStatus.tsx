"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Circle,
  CreditCard,
  FileText,
  MessageSquare,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ClientProjectOverview } from "@/lib/data";

import ru from "@/messages/ru.json";

const copy = ru.Client;

interface ClientProjectStatusProps {
  data: ClientProjectOverview;
}

export function ClientProjectStatus({ data }: ClientProjectStatusProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel lg:col-span-2 rounded-3xl p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/50">
              {copy.project}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              {data.projectName}
            </h2>
            <p className="mt-2 text-sm text-white/65">
              {copy.stage}:{" "}
              <span className="text-white">{data.stage}</span>
            </p>
          </div>
          <div className="glass-panel flex items-center gap-2 rounded-2xl px-4 py-3">
            <CalendarClock className="size-5 text-violet-300" />
            <div>
              <div className="text-xs text-white/55">{copy.deadline}</div>
              <div className="text-sm font-medium text-white">{data.deadline}</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-white/70">{copy.progress}</span>
            <span className="font-medium text-white">{data.progress}%</span>
          </div>
          <Progress value={data.progress} className="h-2 bg-white/10" />
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="size-4 text-violet-300" />
              {copy.tasks}
            </h3>
            <ul className="space-y-3">
              {data.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 text-sm text-white/75"
                >
                  {task.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-white/35" />
                  )}
                  <span className={task.done ? "text-white/60 line-through" : ""}>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="size-4 text-violet-300" />
              {copy.files}
            </h3>
            <ul className="space-y-2">
              {data.files.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
                >
                  <span className="truncate">{f.name}</span>
                  <span className="text-xs text-white/45">{f.size}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-panel flex flex-1 flex-col rounded-3xl p-5"
        >
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <MessageSquare className="size-4 text-violet-300" />
            {copy.chat}
          </h3>
          <ScrollArea className="h-[220px] pr-3">
            <div className="space-y-3">
              {data.messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.author === "team"
                      ? "ml-0 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 p-3 text-sm text-white/80"
                      : "ml-6 rounded-2xl rounded-tr-sm border border-violet-500/25 bg-violet-500/10 p-3 text-sm text-white/85"
                  }
                >
                  <div className="text-[11px] text-white/45">{m.time}</div>
                  <div className="mt-1">{m.text}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder={copy.messagePlaceholder}
              className="min-h-[80px] border-white/15 bg-white/5"
            />
            <Button className="w-full accent-gradient text-white">
              {copy.send}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-3xl p-5"
        >
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <CreditCard className="size-4 text-violet-300" />
            {copy.payments}
          </h3>
          <ul className="space-y-3">
            {data.payments.map((p) => (
              <li
                key={p.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div>
                  <div className="text-sm text-white">{p.title}</div>
                  <div className="text-xs text-white/45">{p.due}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{p.amount}</div>
                  <div
                    className={
                      p.status === "paid"
                        ? "text-xs text-emerald-400"
                        : "text-xs text-amber-300"
                    }
                  >
                    {p.status === "paid" ? "Оплачено" : "Ожидается"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
