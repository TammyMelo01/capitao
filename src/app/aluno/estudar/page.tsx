import { PdfStudyPanel } from "@/components/student/PdfStudyPanel";
import { QuestionPractice } from "@/components/student/QuestionPractice";
import { StudySessionHeader } from "@/components/student/StudySessionHeader";
import { VideoLessonPlayer } from "@/components/student/VideoLessonPlayer";

export default function EstudarPage() {
  return (
    <main className="space-y-6">
      <StudySessionHeader />
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <VideoLessonPlayer />
        <PdfStudyPanel />
      </section>
      <QuestionPractice />
    </main>
  );
}
