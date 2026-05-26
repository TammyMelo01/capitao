import { FileText, PlayCircle } from "lucide-react";
import { getProfileBySlug } from "@/lib/profiles";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

export default async function BibliotecaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const profile = getProfileBySlug(params?.profile);

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">
          Biblioteca — {profile.name}
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {profile.title}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-300">
          {profile.description}. Conteúdos organizados por edital, matéria e tópico.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold">Videoaulas</h2>
          </div>

          <div className="space-y-3">
            {profile.videos.map((video) => (
              <article key={video.title} className="rounded-2xl bg-slate-50 p-4">
                <strong>{video.title}</strong>

                <p className="mt-1 text-sm text-slate-600">
                  {video.description}
                </p>

                <div className="mt-2 flex justify-between text-sm text-slate-600">
                  <span>{profile.name}</span>
                  <span>{video.duration}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-bold">PDFs</h2>
          </div>

          <div className="space-y-3">
            {profile.pdfs.map((pdf) => (
              <article key={pdf.title} className="rounded-2xl bg-slate-50 p-4">
                <strong>{pdf.title}</strong>

                <p className="mt-1 text-sm text-slate-600">
                  {pdf.description}
                </p>

                <div className="mt-2 flex justify-between text-sm text-slate-600">
                  <span>{pdf.pages}</span>
                  <span>Áudio disponível</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

