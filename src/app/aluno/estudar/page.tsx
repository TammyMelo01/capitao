import { PdfRealStudyPanel } from "@/components/student/PdfRealStudyPanel";
import { QuestionPractice } from "@/components/student/QuestionPractice";
import { StudyMemoryBanner } from "@/components/student/StudyMemoryBanner";
import { StudySessionHeader } from "@/components/student/StudySessionHeader";
import { VideoLessonPlayer } from "@/components/student/VideoLessonPlayer";
import { getProfileBySlug } from "@/lib/profiles";
import { getTodayTopic } from "@/lib/study-progress";

type PageProps = {
  searchParams?: Promise<{
    profile?: string;
  }>;
};

export default async function EstudarPage({ searchParams }: PageProps) {
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
      <StudySessionHeader profile={profile} topic={topic} />
      <StudyMemoryBanner />

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <VideoLessonPlayer profile={profile} topic={topic} dayTopic={today} />
        <PdfRealStudyPanel />
      </section>

      <QuestionPractice
        profile={profile}
        topic={topic}
        day={today.day}
        quantity={20}
      />
    </main>
  );
}
