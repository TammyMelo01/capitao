import { CheckCircle2, Clock, PlayCircle, Target } from "lucide-react";
import { ContinueStudyingCard } from "@/components/student/ContinueStudyingCard";
import { ProfileSwitcher } from "@/components/student/ProfileSwitcher";
import { StudentStatCard } from "@/components/student/StudentStatCard";
import { StudyProgressPanel } from "@/components/student/StudyProgressPanel";
import { TodayStudyPlan } from "@/components/student/TodayStudyPlan";
import { getProfileBySlug } from "@/lib/profiles";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

export default async function AlunoHomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const profile = getProfileBySlug(params?.profile);
  const today = profile.monthlyPlan[0];

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <div className="mb-4">
          <ProfileSwitcher />
        </div>

        <p className="text-sm font-semibold text-blue-300">
          Perfil: {profile.name}
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {profile.title}
        </h1>

        <p className="mt-2 max-w-2xl text-slate-300">
          {profile.description}
        </p>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-slate-300">Tema inicial do ciclo</p>
          <strong className="block text-lg">
            {today.subject} — {today.topic}
          </strong>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StudentStatCard title="Aulas assistidas" value="0" description="Nenhuma aula concluída" icon={<PlayCircle className="h-5 w-5" />} />
        <StudentStatCard title="Questões feitas" value="0" description="Nenhuma questão respondida" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StudentStatCard title="Horas estudadas" value="0h" description="Comece seu ciclo de estudos" icon={<Clock className="h-5 w-5" />} />
        <StudentStatCard title="Score aprovação" value="0%" description="Dados insuficientes" icon={<Target className="h-5 w-5" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ContinueStudyingCard />
        <TodayStudyPlan />
      </section>

      <StudyProgressPanel />
    </main>
  );
}

