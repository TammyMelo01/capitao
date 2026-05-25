"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  text: string;
};

export function PdfSpeechReader({ text }: Props) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState(1.1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chunks = useMemo(() => splitText(text, 900), [text]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speak() {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador não suporta leitura de voz.");
      return;
    }

    window.speechSynthesis.cancel();

    const voice =
      voices.find((v) => v.lang.toLowerCase().includes("pt-br")) ?? voices[0];

    chunks.forEach((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = "pt-BR";
      utterance.rate = rate;
      utterance.pitch = 1;
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    });

    setIsSpeaking(true);
  }

  function pause() {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  }

  function resume() {
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="card space-y-4">
      <div>
        <h2 className="text-lg font-bold">Leitor de PDF em voz</h2>
        <p className="text-sm text-slate-500">
          Leitura gratuita pelo navegador usando Web Speech API.
        </p>
      </div>

      <label className="block text-sm font-semibold">
        Velocidade
        <select
          className="input mt-1"
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
      </label>

      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" onClick={speak}>Ouvir</button>
        <button className="btn bg-slate-200" onClick={pause}>Pausar</button>
        <button className="btn bg-slate-200" onClick={resume}>Continuar</button>
        <button className="btn bg-red-100 text-red-700" onClick={stop}>Parar</button>
      </div>

      <p className="text-xs text-slate-500">
        Status: {isSpeaking ? "reproduzindo" : "parado/pausado"}
      </p>
    </div>
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
