"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Lock,
  RefreshCcw,
  XCircle
} from "lucide-react";
import type { StudentProfile, StudyTopic } from "@/lib/profiles";

type Question = {
  id: string;
  statement: string;
  answer: "Certo" | "Errado";
  explanation: string;
  reinforcement: {
    correct: string;
    wrong: string;
  };
};

type Props = {
  profile: StudentProfile;
  topic: StudyTopic;
  day: number;
  quantity?: number;
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getStorageKey(profile: StudentProfile, topic: StudyTopic, day: number) {
  const cleanTopic = `${topic.subject}-${topic.topic}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

  return `capitao:questions:${profile.slug}:${getTodayKey()}:day-${day}:${cleanTopic}`;
}

export function QuestionPractice({ profile, topic, day, quantity = 100 }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, "Certo" | "Errado">>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storageKey = useMemo(
    () => getStorageKey(profile, topic, day),
    [profile, topic, day]
  );

  useEffect(() => {
    const cached = localStorage.getItem(storageKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setQuestions(parsed.questions ?? []);
        setAnswers(parsed.answers ?? {});
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    generateQuestions(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  async function generateQuestions(force: boolean) {
    setLoading(true);
    setError("");

    if (force) {
      localStorage.removeItem(storageKey);
      setAnswers({});
    }

    try {
      const response = await fetch("/api/questions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profileName: profile.name,
          profileTitle: profile.title,
          subject: topic.subject,
          topic: topic.topic,
          banca: topic.banca,
          quantity
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao gerar questões.");
      }

      const generatedQuestions = data.questions ?? [];

      setQuestions(generatedQuestions);

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          questions: generatedQuestions,
          answers: {},
          generatedAt: new Date().toISOString()
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar questões.");
    } finally {
      setLoading(false);
    }
  }

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

      const next = {
        ...current,
        [questionId]: option
      };

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          questions,
          answers: next,
          updatedAt: new Date().toISOString()
        })
      );

      return next;
    });
  }

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Gerando 100 questões do dia {day} para {profile.name}: {topic.subject} —{" "}
          {topic.topic}...
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Questões do dia {day} — {profile.name}
          </p>

          <h2 className="text-xl font-black">
            {topic.subject} — {topic.topic}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            100 questões diferentes geradas pela IA com base no cronograma de
            hoje.
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

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-700 transition-all"
            style={{
              width: result.total
                ? `${(result.answered / result.total) * 100}%`
                : "0%"
            }}
          />
        </div>

        <button
          onClick={() => generateQuestions(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
        >
          <RefreshCcw className="h-4 w-4" />
          Regenerar questões
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {questions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-lg font-bold text-slate-700">
            Nenhuma questão carregada
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Verifique a variável GROQ_API_KEY no Vercel e tente novamente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => {
            const selected = answers[question.id];
            const isAnswered = Boolean(selected);
            const isCorrect = selected === question.answer;

            return (
              <article
                key={`${question.id}-${index}`}
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
      )}
    </section>
  );
}

