export type Topic = {
  id: string;
  subject: string;
  name: string;
  priority: number;
  estimatedHours: number;
};

export type StudyBlock = {
  day: number;
  type: "video" | "review_video" | "questions" | "audio_review" | "pdf";
  subject: string;
  topic: string;
  durationMinutes: number;
};

export function generateThirtyDayPlan(topics: Topic[]): StudyBlock[] {
  const ordered = [...topics].sort((a, b) => b.priority - a.priority);
  const blocks: StudyBlock[] = [];

  for (let day = 1; day <= 30; day++) {
    const topic = ordered[(day - 1) % ordered.length];

    blocks.push(
      { day, type: "video", subject: topic.subject, topic: topic.name, durationMinutes: 120 },
      { day, type: "review_video", subject: topic.subject, topic: topic.name, durationMinutes: 60 },
      { day, type: "questions", subject: topic.subject, topic: topic.name, durationMinutes: 60 },
      { day, type: "audio_review", subject: topic.subject, topic: topic.name, durationMinutes: 60 },
      { day, type: "pdf", subject: topic.subject, topic: topic.name, durationMinutes: 60 }
    );
  }

  return blocks;
}
