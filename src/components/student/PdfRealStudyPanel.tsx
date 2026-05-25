"use client";

import { useMemo, useState } from "react";
import { FileText, Loader2, Pause, Play, Square, Upload } from "lucide-react";

type ExtractedPdf = {
  title: string;
  pages: number;
  text: string;
};

export function PdfRealStudyPanel() {
  const [pdf, setPdf] = useState<ExtractedPdf | null>(null);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(1);
  const [error, setError] = useState("");

  const chunks = useMemo(() => splitText(pdf?.text ?? "", 900), [pdf?.text]);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/pdfs/extract", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Erro ao extrair PDF.");
      return;
    }

    setPdf(data);
    localStorage.setItem("capitao:lastPdfTitle", data.title);
    localStorage.setItem("capitao:lastPdfPages", String(data.pages));
  }

  function speak() {
    if (!pdf?.text) return;

    if (!("speechSynthesis" in window)) {
      alert("Este navegador não suporta leitura de voz.");
      return;
    }

    window.speechSynthesis.cancel();

    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = "pt-BR";
      utterance.rate = rate;

      utterance.onstart = () => {
        localStorage.setItem("capitao:lastAudioChunk", String(index));
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">PDF real</p>

          <h2 className="text-xl font-black">
            {pdf?.title ?? "Enviar material em PDF"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {pdf
              ? `${pdf.pages} páginas extraídas`
              : "Faça upload para ler e ouvir o conteúdo completo"}
          </p>
        </div>

        <span className="rounded-xl bg-blue-50 p-2 text-blue-700">
          <FileText className="h-5 w-5" />
        </span>
      </div>

      <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-5 text-sm font-bold text-blue-700">
        <Upload className="h-5 w-5" />
        Selecionar PDF
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {loading && (
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Extraindo texto do PDF...
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {pdf && (
        <>
          <div className="max-h-72 overflow-y-auto rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {pdf.text.slice(0, 6000)}
            {pdf.text.length > 6000 ? "..." : ""}
          </div>

          <div className="mt-4 rounded-2xl bg-blue-50 p-4">
            <strong className="mb-3 block text-blue-950">
              Ouvir PDF completo
            </strong>

            <select
              className="mb-3 w-full rounded-xl border border-blue-100 bg-white px-3 py-2"
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
            >
              <option value={0.8}>0.8x</option>
              <option value={1}>1x</option>
              <option value={1.1}>1.1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={speak}
                className="rounded-xl bg-blue-700 px-3 py-2 text-white"
              >
                <Play className="mx-auto h-4 w-4" />
              </button>

              <button
                onClick={() => window.speechSynthesis.pause()}
                className="rounded-xl bg-white px-3 py-2 text-blue-900"
              >
                <Pause className="mx-auto h-4 w-4" />
              </button>

              <button
                onClick={() => window.speechSynthesis.cancel()}
                className="rounded-xl bg-white px-3 py-2 text-red-700"
              >
                <Square className="mx-auto h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
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
