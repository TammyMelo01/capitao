"use client";

import { BookOpen, Brain, Clock, Target, Trophy } from "lucide-react";
import { ApprovalLineChart } from "./charts/ApprovalLineChart";
import { SubjectDonutChart } from "./charts/SubjectDonutChart";
import { RadarMasteryChart } from "./charts/RadarMasteryChart";
import { ProgressCard } from "./ProgressCard";
import { calculateApprovalScore } from "@/lib/approval-score";

const metrics = {
  editalCompletion: 72,
  accuracyRate: 81,
  reviewsCompletion: 68,
  consistency: 86,
  simulatedExams: 64,
  totalHours: 187,
  streakDays: 24
};

const score = calculateApprovalScore(metrics);

export function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <section className="mb-8 flex flex-col gap-2">
        <p className="text-sm font-semibold text-police">Capitão</p>
        <h1 className="text-3xl font-bold tracking-tight">
          Painel de aprovação
        </h1>
        <p className="text-slate-600">
          Acompanhe seu progresso, pontos fracos, aulas assistidas e chance de competitividade.
        </p>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <ProgressCard
          title="Score"
          value={`${score.score}%`}
          description={score.level}
          icon={<Trophy className="h-5 w-5" />}
        />
        <ProgressCard
          title="Edital"
          value={`${metrics.editalCompletion}%`}
          description="concluído"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <ProgressCard
          title="Acertos"
          value={`${metrics.accuracyRate}%`}
          description="média recente"
          icon={<Target className="h-5 w-5" />}
        />
        <ProgressCard
          title="Horas"
          value={`${metrics.totalHours}h`}
          description="estudadas"
          icon={<Clock className="h-5 w-5" />}
        />
        <ProgressCard
          title="Consistência"
          value={`${metrics.streakDays} dias`}
          description="sequência ativa"
          icon={<Brain className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Evolução semanal</h2>
          <ApprovalLineChart />
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-bold">Domínio por matéria</h2>
          <SubjectDonutChart />
        </div>

        <div className="card lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold">Radar de equilíbrio</h2>
          <RadarMasteryChart />
        </div>
      </section>
    </main>
  );
}
