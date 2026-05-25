"use client";

import { useState } from "react";
import { CheckCircle2, PlayCircle } from "lucide-react";

const lessons = [
  { id: "1", title: "Teoria do Crime — aula completa", youtubeId: "dQw4w9WgXcQ", duration: "2h 14min" },
  { id: "2", title: "Teoria do Crime — revisão Cebraspe", youtubeId: "dQw4w9WgXcQ", duration: "58min" },
  { id: "3", title: "Questões comentadas", youtubeId: "dQw4w9WgXcQ", duration: "1h 06min" }
];

export function VideoLessonPlayer() {
  const [activeLesson, setActiveLesson] = useState(lessons[0]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-semibold text-blue-700">Videoaula</p>
        <h2 className="text-xl font-black">{activeLesson.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{activeLesson.duration}</p>
      </div>
      <div className="overflow-hidden rounded-2xl bg-slate-950">
        <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${activeLesson.youtubeId}`} title={activeLesson.title} allowFullScreen />
      </div>
      <div className="mt-5 space-y-3">
        <h3 className="font-bold">Playlist da sessão</h3>
        {lessons.map((lesson) => (
          <button key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left ${activeLesson.id === lesson.id ? "bg-blue-50 ring-2 ring-blue-200" : "bg-slate-50 hover:bg-slate-100"}`}>
            <span className="rounded-xl bg-white p-2 text-blue-700 shadow-sm">{activeLesson.id === lesson.id ? <PlayCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}</span>
            <span className="flex-1"><strong className="block">{lesson.title}</strong><span className="text-sm text-slate-500">{lesson.duration}</span></span>
          </button>
        ))}
      </div>
    </section>
  );
}
