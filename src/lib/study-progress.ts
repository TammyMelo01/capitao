import type { MonthlyPlanItem, StudentProfile } from "@/lib/profiles";

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getDayIndexForToday(planLength: number) {
  const start = new Date("2026-01-01T00:00:00");

  const today = new Date();

  const diff = Math.floor(
    (today.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return Math.abs(diff) % planLength;
}

export function getTodayTopic(profile: StudentProfile) {
  const index = getDayIndexForToday(
    profile.monthlyPlan.length
  );

  return profile.monthlyPlan[index];
}

export function getLessonProgressKey(
  profile: StudentProfile,
  topic: MonthlyPlanItem
) {
  return `capitao:lesson:${profile.slug}:${getTodayKey()}:day-${topic.day}`;
}

export function getLessonProgress(
  profile: StudentProfile,
  topic: MonthlyPlanItem
) {
  if (typeof window === "undefined") {
    return {
      completed: false,
      progress: 0
    };
  }

  const raw = localStorage.getItem(
    getLessonProgressKey(profile, topic)
  );

  if (!raw) {
    return {
      completed: false,
      progress: 0
    };
  }

  try {
    return JSON.parse(raw) as {
      completed: boolean;
      progress: number;
      completedAt?: string;
    };
  } catch {
    return {
      completed: false,
      progress: 0
    };
  }
}

export function saveLessonCompleted(
  profile: StudentProfile,
  topic: MonthlyPlanItem
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    getLessonProgressKey(profile, topic),
    JSON.stringify({
      completed: true,
      progress: 100,
      completedAt: new Date().toISOString()
    })
  );
}
