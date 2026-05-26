import { getProfileBySlug } from "@/lib/profiles";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

function getStatusLabel(day: number) {
  if (day === 1) return "Hoje";
  return "Pendente";
}

function getStatusClass(day: number) {
  if (day === 1) return "bg-blue-50 text-blue-700";
  return "bg-slate-100 text-slate-600";
}

export default async function CronogramaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const profile = getProfileBySlug(params?.profile);

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">
          Programação mensal — {profile.name}
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {profile.title}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-300">
          {profile.description}. Veja todos os assuntos planejados para os próximos 30 dias.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profile.monthlyPlan.map((item) => (
          <article
            key={item.day}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                Dia {item.day}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                  item.day
                )}`}
              >
                {getStatusLabel(item.day)}
              </span>
            </div>

            <h2 className="mt-4 text-xl font-black">{item.subject}</h2>
            <p className="mt-1 text-slate-600">{item.topic}</p>

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
