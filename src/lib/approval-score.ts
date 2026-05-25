export type ApprovalMetrics = {
  editalCompletion: number;
  accuracyRate: number;
  reviewsCompletion: number;
  consistency: number;
  simulatedExams: number;
};

export function calculateApprovalScore(metrics: ApprovalMetrics) {
  const score = Math.round(
    metrics.editalCompletion * 0.25 +
      metrics.accuracyRate * 0.35 +
      metrics.reviewsCompletion * 0.15 +
      metrics.consistency * 0.1 +
      metrics.simulatedExams * 0.15
  );

  return {
    score,
    level: getApprovalLevel(score)
  };
}

export function getApprovalLevel(score: number) {
  if (score >= 85) return "nível aprovação";
  if (score >= 75) return "competitivo";
  if (score >= 60) return "intermediário";
  if (score >= 40) return "em construção";
  return "iniciante";
}
