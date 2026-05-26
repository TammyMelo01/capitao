import { QuestionPractice } from "@/components/student/QuestionPractice";
import { getProfileBySlug } from "@/lib/profiles";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

export default async function QuestoesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const profile = getProfileBySlug(params?.profile);

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">
          Questões — {profile.name}
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {profile.title}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-300">
          {profile.description}. Resolva questões e receba feedback imediato.
        </p>
      </section>

      <QuestionPractice profile={profile} />
    </main>
  );
}
