"use client";

import {
  BookOpen,
  CheckCircle2,
  FileText,
  Headphones,
  ListChecks,
  PlayCircle
} from "lucide-react";
import type { MonthlyPlanItem, StudentProfile } from "@/lib/profiles";
import { getLessonProgress } from "@/lib/study-progress";
import { useEffect, useState } from "react";

type Props = {
  profile: StudentProfile;
  topic: MonthlyPlanItem;
};

export function TodayStudyPlan({ profile, topic }: Props) {
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    const progress = getLessonProgress(profile, topic);
    setLessonCompleted(progress.completed);
  }, [profile.slug, topic.day]);

  const plan = [
    {
      title: "Teoria principal",
      detail: `2h — ${topic.subject}`,
      icon: PlayCircle,
      done: lessonCompleted
    },
    {
      title: "Revisão com outro professor",
      detail: `1h — ${topic.topic}`,
      icon: BookOpen,
      done: false
    },
    {
      title: "Questões comentadas",
      detail: `100 questões do dia`,
      icon: ListChecks,
      done: false
    },
    {
      title: "Revisão auditiva",
      detail: `1h — ${topic.topic}`,
      icon: Headphones,
      done: false
    },
    {
      title: "PDF complementar",
      detail: `1h — ${topic.subject}`,
      icon: FileText,
      done: false
    }
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold text-blue-700">
          Plano de hoje — {profile.name}
        </p>

        <h2 className="text-xl font-black">Dia {topic.day}</h2>
      </div>

      <div className="space-y-3">
        {plan.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
            >
              <span className="rounded-xl bg-white p-2 text-blue-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>

              <div className="flex-1">
                <strong className="block">{item.title}</strong>
                <span className="text-sm text-slate-500">
                  {item.detail}
                </span>
              </div>

              {item.done && <CheckCircle2 className="h-5 w-5 text-green-600" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
