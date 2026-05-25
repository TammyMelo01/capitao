import Link from "next/link";

const profiles = [
  {
    slug: "tammy",
    name: "Tammy",
    title: "Concursos Policiais",
    description: "Polícia Civil do Ceará e PRF"
  },
  {
    slug: "camila",
    name: "Camila",
    title: "Técnica de Enfermagem",
    description: "Estado do Ceará e Prefeitura de Fortaleza"
  }
];

export default function PerfisPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">Perfis</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          Escolher aluno
        </h1>

        <p className="mt-2 text-slate-300">
          Cada perfil tem concurso, cronograma, progresso e conteúdos próprios.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {profiles.map((profile) => (
          <Link
            key={profile.slug}
            href={`/aluno?profile=${profile.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            <strong className="text-xl">{profile.name}</strong>
            <p className="mt-2 font-semibold text-blue-700">{profile.title}</p>
            <p className="mt-1 text-sm text-slate-600">
              {profile.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
