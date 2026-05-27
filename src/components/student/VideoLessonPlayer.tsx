"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  PlayCircle,
  Trophy
} from "lucide-react";
import type { MonthlyPlanItem, StudentProfile, StudyTopic } from "@/lib/profiles";
import {
  getLessonProgress,
  saveLessonCompleted
} from "@/lib/study-progress";

type Lesson = {
  youtubeId: string;
  title: string;
  channel?: string;
  duration?: string;
  url?: string;
};

type Props = {
  profile: StudentProfile;
  topic: StudyTopic;
  dayTopic: MonthlyPlanItem;
};

export function VideoLessonPlayer({ profile, topic, dayTopic }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const progress = getLessonProgress(profile, dayTopic);
    setCompleted(progress.completed);

    async function loadVideos() {
      setLoading(true);

      const response = await fetch("/api/videos/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(topic)
      });

      const data = await response.json();
      const videos = data.videos ?? [];

      setLessons(videos);
      setActiveLesson(videos[0] ?? null);
      setLoading(false);
    }

    loadVideos();
  }, [profile.slug, dayTopic.day, topic.subject, topic.topic, topic.concurso, topic.banca]);

  function markCompleted() {
    saveLessonCompleted(profile, dayTopic);
    setCompleted(true);
  }

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Buscando videoaulas para {topic.subject} — {topic.topic}...
        </div>
      </section>
    );
  }

  if (!activeLesson) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-bold text-red-700">Nenhum vídeo encontrado.</p>
        <p className="mt-2 text-sm text-slate-600">
          Verifique a variável YOUTUBE_API_KEY no Vercel.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Videoaula do dia {dayTopic.day}
          </p>

          <h2 className="text-xl font-black">{activeLesson.title}</h2>

          <p className="mt-1 text-sm text-slate-500">
            {activeLesson.channel ?? "YouTube"}
          </p>
        </div>

        {completed ? (
          <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
            <Trophy className="h-4 w-4" />
            Aula concluída
          </span>
        ) : (
          <button
            onClick={markCompleted}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            <CheckCircle2 className="h-4 w-4" />
            Marcar aula como concluída
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-950">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${activeLesson.youtubeId}`}
          title={activeLesson.title}
          allowFullScreen
        />
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="font-bold">
          Vídeos encontrados para {topic.subject}
        </h3>

        {lessons.map((lesson) => (
          <button
            key={lesson.youtubeId}
            onClick={() => setActiveLesson(lesson)}
            className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left ${
              activeLesson.youtubeId === lesson.youtubeId
                ? "bg-blue-50 ring-2 ring-blue-200"
                : "bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <span className="rounded-xl bg-white p-2 text-blue-700 shadow-sm">
              {activeLesson.youtubeId === lesson.youtubeId ? (
                <PlayCircle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
            </span>

            <span className="flex-1">
              <strong className="block">{lesson.title}</strong>
              <span className="text-sm text-slate-500">
                {lesson.channel ?? "YouTube"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

