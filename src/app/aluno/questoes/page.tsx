import { QuestionPractice } from "@/components/student/QuestionPractice";

export default function QuestoesPage() {
  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-blue-700">Treino Cebraspe</p>
        <h1 className="text-3xl font-black tracking-tight">Questões do dia</h1>
        <p className="mt-2 text-slate-600">Resolva questões de certo/errado e acompanhe seu percentual.</p>
      </section>
      <QuestionPractice />
    </main>
  );
}
