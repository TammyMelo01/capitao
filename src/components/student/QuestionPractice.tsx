"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const questions = [
  { id: "q1", statement: "No conceito analítico de crime, fato típico, ilicitude e culpabilidade são elementos analisados de forma estruturada.", answer: "Certo", explanation: "A doutrina majoritária usa esses elementos para analisar o crime." },
  { id: "q2", statement: "A legítima defesa é causa de exclusão da culpabilidade.", answer: "Errado", explanation: "A legítima defesa exclui a ilicitude, não a culpabilidade." },
  { id: "q3", statement: "O nexo causal é analisado dentro do fato típico quando o crime exige resultado naturalístico.", answer: "Certo", explanation: "Nos crimes materiais, o nexo causal liga conduta e resultado." }
];

export function QuestionPractice() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const result = useMemo(() => {
    const answered = questions.filter((q) => answers[q.id]);
    const correct = answered.filter((q) => answers[q.id] === q.answer);
    return { answered: answered.length, correct: correct.length, percent: answered.length ? Math.round((correct.length / answered.length) * 100) : 0 };
  }, [answers]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div><p className="text-sm font-semibold text-blue-700">Questões geradas</p><h2 className="text-xl font-black">Treino estilo Cebraspe</h2><p className="mt-1 text-sm text-slate-500">Questões simuladas por IA.</p></div>
        <div className="rounded-2xl bg-slate-50 p-4 text-center"><strong className="block text-2xl">{result.percent}%</strong><span className="text-sm text-slate-500">{result.correct}/{result.answered} acertos</span></div>
      </div>
      <div className="space-y-4">
        {questions.map((question, index) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.answer;
          return (
            <article key={question.id} className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 flex items-start gap-3"><span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-blue-700 shadow-sm">{index + 1}</span><p className="leading-7 text-slate-800">{question.statement}</p></div>
              <div className="flex flex-wrap gap-2">
                {["Certo", "Errado"].map((option) => (
                  <button key={option} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))} className={`rounded-xl px-4 py-2 text-sm font-bold ${selected === option ? "bg-blue-700 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}>{option}</button>
                ))}
              </div>
              {selected && (
                <div className={`mt-4 rounded-2xl p-4 ${isCorrect ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>
                  <div className="mb-2 flex items-center gap-2 font-bold">{isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}{isCorrect ? "Resposta correta" : "Resposta incorreta"}</div>
                  <p className="text-sm leading-6">{question.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
