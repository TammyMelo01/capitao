"use client";

import { useEffect, useState } from "react";

export function StudyMemoryBanner() {
  const [lastPdf, setLastPdf] = useState<string | null>(null);
  const [pages, setPages] = useState<string | null>(null);
  const [chunk, setChunk] = useState<string | null>(null);

  useEffect(() => {
    setLastPdf(localStorage.getItem("capitao:lastPdfTitle"));
    setPages(localStorage.getItem("capitao:lastPdfPages"));
    setChunk(localStorage.getItem("capitao:lastAudioChunk"));
  }, []);

  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-950">
      <strong className="block">Memória de estudo</strong>

      <p className="mt-1 text-sm">
        {lastPdf
          ? `Último PDF estudado: ${lastPdf}${pages ? ` (${pages} páginas)` : ""}. ${
              chunk ? `Áudio parado próximo ao bloco ${Number(chunk) + 1}.` : ""
            }`
          : "Você ainda não iniciou nenhum PDF. Quando estudar, o sistema mostrará onde parou."}
      </p>
    </section>
  );
}
