import { PdfRealStudyPanel } from "@/components/student/PdfRealStudyPanel";
import { QuestionPractice } from "@/components/student/QuestionPractice";
import { StudyMemoryBanner } from "@/components/student/StudyMemoryBanner";
import { StudySessionHeader } from "@/components/student/StudySessionHeader";
import { VideoLessonPlayer } from "@/components/student/VideoLessonPlayer";

export default function EstudarPage() {
  return (
    <main className="space-y-6">
      <StudySessionHeader />
      <StudyMemoryBanner />

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <VideoLessonPlayer />
        <PdfRealStudyPanel />
      </section>

      <QuestionPractice />
    </main>
  );
}
