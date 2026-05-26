import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { MonthlyPlanItem, StudentProfile } from "@/lib/profiles";

type Props = {
  profile: StudentProfile;
  topic: MonthlyPlanItem;
};

export function ContinueStudyingCard({ profile, topic }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Continue de onde parou
          </p>

          <h2 className="text-xl font-black">
            {topic.subject} — {topic.topic}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Perfil: {profile.name}
          </p>
        </div>

        <span className="rounded-2xl bg-blue-50 p-3 text-blue-700">
          <PlayCircle className="h-6 w-6" />
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-950 p-5 text-white">
        <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-800">
          <PlayCircle className="h-14 w-14 text-blue-300" />
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Progresso da aula</span>
            <strong>0%</strong>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-[0%] rounded-full bg-blue-400" />
          </div>
        </div>
      </div>

      <Link
        href={`/aluno/estudar?profile=${profile.slug}`}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-bold text-white transition hover:opacity-90"
      >
        Ir para aula
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
