const cronograma = Array.from({ length: 30 }, (_, index) => {
  const temas = [
    ["Direito Penal", "Teoria do Crime"],
    ["Português", "Interpretação de Texto"],
    ["Processo Penal", "Inquérito Policial"],
    ["Informática", "Segurança da Informação"],
    ["Direito Constitucional", "Direitos e Garantias Fundamentais"],
    ["Direitos Humanos", "Tratados e Convenções"],
    ["Direito Administrativo", "Atos Administrativos"],
    ["Legislação Penal Especial", "Lei de Drogas"],
    ["Raciocínio Lógico", "Proposições e conectivos"],
    ["Atualidades", "Segurança pública e cidadania"]
  ];

  const [materia, assunto] = temas[index % temas.length];

  return {
    dia: index + 1,
    materia,
    assunto,
    status: index < 2 ? "concluido" : index === 2 ? "hoje" : "pendente"
  };
});

function getStatusLabel(status: string) {
  if (status === "concluido") return "Concluído";
  if (status === "hoje") return "Hoje";
  return "Pendente";
}

function getStatusClass(status: string) {
  if (status === "concluido") return "bg-green-50 text-green-700";
  if (status === "hoje") return "bg-blue-50 text-blue-700";
  return "bg-slate-100 text-slate-600";
}

export default function CronogramaPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">Programação mensal</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">
          Cronograma de estudos
        </h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Veja todos os assuntos planejados para os próximos 30 dias. Cada dia segue o ciclo:
          aula principal, revisão, questões, áudio e PDF.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cronograma.map((item) => (
          <article
            key={item.dia}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                Dia {item.dia}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                  item.status
                )}`}
              >
                {getStatusLabel(item.status)}
              </span>
            </div>

            <h2 className="mt-4 text-xl font-black">{item.materia}</h2>
            <p className="mt-1 text-slate-600">{item.assunto}</p>

            <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p>🎥 2h de aula principal</p>
              <p>🔁 1h de revisão com outro professor</p>
              <p>✅ 1h de questões comentadas</p>
              <p>🎧 1h de revisão auditiva</p>
              <p>📄 1h de PDF complementar</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
