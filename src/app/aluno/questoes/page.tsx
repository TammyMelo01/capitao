import { QuestionPractice } from "@/components/student/QuestionPractice";
import { getProfileBySlug } from "@/lib/profiles";
import { getTodayTopic } from "@/lib/study-progress";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

export default async function QuestoesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const profile = getProfileBySlug(params?.profile);
  const today = getTodayTopic(profile);

  const topic = {
    subject: today.subject,
    topic: today.topic,
    concurso: profile.defaultTopic.concurso,
    banca: profile.defaultTopic.banca
  };

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-blue-300">
          Questões do dia {today.day} — {profile.name}
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {topic.subject} — {topic.topic}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-300">
          Todo dia o Capitão gera 100 questões diferentes com base no conteúdo
          do cronograma.
        </p>
      </section>

      <QuestionPractice profile={profile} topic={topic} day={today.day} quantity={20} />
    </main>
  );
}
