import { FileText, PlayCircle } from "lucide-react";

const videos = [
  ["Direito Penal — Teoria do Crime", "Aula completa", "2h 14min"],
  ["Processo Penal — Inquérito Policial", "Questões comentadas", "1h 02min"],
  ["Informática — Segurança da Informação", "Revisão completa", "58min"]
];

const pdfs = [
  ["Resumo de Direito Penal", "42 páginas", "Áudio disponível"],
  ["Legislação Penal Especial", "88 páginas", "Gerar áudio"],
  ["Português para Cebraspe", "61 páginas", "Resumo pronto"]
];

export default function BibliotecaPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-blue-700">Biblioteca</p>
        <h1 className="text-3xl font-black tracking-tight">Vídeos e PDFs</h1>
        <p className="mt-2 text-slate-600">Conteúdos gratuitos organizados por edital, matéria e tópico.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2"><PlayCircle className="h-5 w-5 text-blue-700" /><h2 className="text-lg font-bold">Videoaulas</h2></div>
          <div className="space-y-3">
            {videos.map(([title, type, duration]) => (
              <article key={title} className="rounded-2xl bg-slate-50 p-4">
                <strong>{title}</strong>
                <div className="mt-2 flex justify-between text-sm text-slate-600"><span>{type}</span><span>{duration}</span></div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-blue-700" /><h2 className="text-lg font-bold">PDFs</h2></div>
          <div className="space-y-3">
            {pdfs.map(([title, pages, status]) => (
              <article key={title} className="rounded-2xl bg-slate-50 p-4">
                <strong>{title}</strong>
                <div className="mt-2 flex justify-between text-sm text-slate-600"><span>{pages}</span><span>{status}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
