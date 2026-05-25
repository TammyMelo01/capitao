"use client";

import { useMemo, useState } from "react";
import { FileText, Pause, Play, Square } from "lucide-react";

<p className="mt-1 text-sm text-slate-500">
  Texto demonstrativo • áudio parcial
</p>;

export function PdfStudyPanel() {
  const [rate, setRate] = useState(1.1);
  const chunks = useMemo(() => splitText(pdfText, 700), []);

  function speak() {
    if (!("speechSynthesis" in window)) return alert("Este navegador não suporta leitura de voz.");
    window.speechSynthesis.cancel();
    chunks.forEach((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = "pt-BR";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div><p className="text-sm font-semibold text-blue-700">PDF complementar</p><h2 className="text-xl font-black">Resumo — Teoria do Crime</h2><p className="mt-1 text-sm text-slate-500">42 páginas • áudio disponível</p></div>
        <span className="rounded-xl bg-blue-50 p-2 text-blue-700"><FileText className="h-5 w-5" /></span>
      </div>
      <div className="max-h-72 overflow-y-auto rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{pdfText}</div>
      <div className="mt-4 rounded-2xl bg-blue-50 p-4">
        <strong className="mb-3 block text-blue-950">Ouvir PDF</strong>
        <select className="mb-3 w-full rounded-xl border border-blue-100 bg-white px-3 py-2" value={rate} onChange={(event) => setRate(Number(event.target.value))}>
          <option value={0.8}>0.8x</option><option value={1}>1x</option><option value={1.1}>1.1x</option><option value={1.25}>1.25x</option><option value={1.5}>1.5x</option><option value={2}>2x</option>
        </select>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={speak} className="rounded-xl bg-blue-700 px-3 py-2 text-white"><Play className="mx-auto h-4 w-4" /></button>
          <button onClick={() => window.speechSynthesis.pause()} className="rounded-xl bg-white px-3 py-2 text-blue-900"><Pause className="mx-auto h-4 w-4" /></button>
          <button onClick={() => window.speechSynthesis.cancel()} className="rounded-xl bg-white px-3 py-2 text-red-700"><Square className="mx-auto h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

function splitText(text: string, maxLength: number) {
  const sentences = text.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxLength) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
