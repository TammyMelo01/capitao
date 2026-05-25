import { CheckCircle2, Clock, PlayCircle, Target } from "lucide-react";
import { ContinueStudyingCard } from "@/components/student/ContinueStudyingCard";
import { StudentStatCard } from "@/components/student/StudentStatCard";
import { StudyProgressPanel } from "@/components/student/StudyProgressPanel";
import { TodayStudyPlan } from "@/components/student/TodayStudyPlan";

export default function AlunoHomePage() {
  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold text-blue-300">Capitão</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Painel do aluno</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Assista às aulas, leia PDFs, resolva questões e acompanhe seu caminho até a aprovação.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StudentStatCard title="Aulas assistidas" value="37" description="12 nesta semana" icon={<PlayCircle className="h-5 w-5" />} />
        <StudentStatCard title="Questões feitas" value="842" description="81% de acerto" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StudentStatCard title="Horas estudadas" value="187h" description="24 dias seguidos" icon={<Clock className="h-5 w-5" />} />
        <StudentStatCard title="Score aprovação" value="74%" description="nível competitivo" icon={<Target className="h-5 w-5" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ContinueStudyingCard />
        <TodayStudyPlan />
      </section>

      <StudyProgressPanel />
    </main>
  );
}
