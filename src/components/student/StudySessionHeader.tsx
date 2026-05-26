import type { StudentProfile, StudyTopic } from "@/lib/profiles";

type Props = {
  profile: StudentProfile;
  topic: StudyTopic;
};

export function StudySessionHeader({ profile, topic }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-blue-700">
        Sessão atual — {profile.name}
      </p>

      <h1 className="text-3xl font-black tracking-tight">
        {topic.subject} — {topic.topic}
      </h1>

      <p className="mt-2 text-slate-600">
        {profile.description}. Assista à aula, leia o PDF complementar e resolva as questões.
      </p>
    </section>
  );
}
