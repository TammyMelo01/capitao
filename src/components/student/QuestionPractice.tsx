"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Lock, XCircle } from "lucide-react";
import type { QuestionItem, StudentProfile } from "@/lib/profiles";

type Props = {
  profile: StudentProfile;
};

export function QuestionPractice({ profile }: Props) {
  const questions = profile.questions;
  const [answers, setAnswers] = useState<Record<string, "Certo" | "Errado">>({});

  const result = useMemo(() => {
    const answered = questions.filter((question) => answers[question.id]);
    const correct = answered.filter(
      (question) => answers[question.id] === question.answer
    );

    return {
      answered: answered.length,
      total: questions.length,
      correct: correct.length,
      wrong: answered.length - correct.length,
      percent: answered.length
        ? Math.round((correct.length / answered.length) * 100)
        : 0
    };
  }, [answers, questions]);

  function answerQuestion(questionId: string, option: "Certo" | "Errado") {
    setAnswers((current) => {
      if (current[questionId]) return current;

      return {
        ...current,
        [questionId]: option
      };
    });
  }

  if (questions.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <p className="text-sm font-semibold text-blue-700">
            Questões geradas — {profile.name}
          </p>
          <h2 className="text-xl font-black">Treino</h2>
          <p className="mt-1 text-sm text-slate-500">
            Nenhuma questão disponível ainda.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Questões geradas — {profile.name}
          </p>

          <h2 className="text-xl font-black">
            Treino de {profile.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Responda e receba feedback imediato da IA para reforçar o aprendizado.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-4 text-center">
          <div>
            <strong className="block text-2xl">{result.percent}%</strong>
            <span className="text-xs text-slate-500">aproveitamento</span>
          </div>

          <div>
            <strong className="block text-2xl text-green-700">
              {result.correct}
            </strong>
            <span className="text-xs text-slate-500">acertos</span>
          </div>

          <div>
            <strong className="block text-2xl text-red-700">
              {result.wrong}
            </strong>
            <span className="text-xs text-slate-500">erros</span>
          </div>
        </div>
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-700 transition-all"
          style={{
            width: `${(result.answered / result.total) * 100}%`
          }}
        />
      </div>

      <div className="space-y-4">
        {questions.map((question: QuestionItem, index) => {
          const selected = answers[question.id];
          const isAnswered = Boolean(selected);
          const isCorrect = selected === question.answer;

          return (
            <article
              key={question.id}
              className="rounded-2xl bg-slate-50 p-4"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-blue-700 shadow-sm">
                  {index + 1}
                </span>

                <p className="leading-7 text-slate-800">
                  {question.statement}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(["Certo", "Errado"] as const).map((option) => {
                  const active = selected === option;

                  return (
                    <button
                      key={option}
                      disabled={isAnswered}
                      onClick={() => answerQuestion(question.id, option)}
                      className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                        active
                          ? isCorrect
                            ? "bg-green-700 text-white"
                            : "bg-red-700 text-white"
                          : isAnswered
                            ? "bg-white text-slate-400"
                            : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  className={`mt-4 rounded-2xl p-4 ${
                    isCorrect
                      ? "bg-green-50 text-green-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 font-bold">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}

                    {isCorrect ? "Você acertou" : "Você errou"}
                  </div>

                  <p className="text-sm leading-6">
                    {isCorrect
                      ? question.reinforcement.correct
                      : question.reinforcement.wrong}
                  </p>

                  <div className="mt-3 rounded-xl bg-white/70 p-3 text-sm leading-6">
                    <strong>Gabarito:</strong> {question.answer}
                    <br />
                    <strong>Comentário:</strong> {question.explanation}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold opacity-80">
                    <Lock className="h-4 w-4" />
                    Resposta registrada para acompanhar seu desempenho.
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
