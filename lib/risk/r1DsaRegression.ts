export type DsaRegressionResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  daysSinceLast: number;
  recentPracticeDays: number;
  topicCount: number;
};

export async function calculateDsaRegressionRisk(
  uid: string
): Promise<DsaRegressionResult> {
  // mock / deterministic logic
  return {
    risk: 0.4,
    confidence: "medium",
    daysSinceLast: 3,
    recentPracticeDays: 4,
    topicCount: 6,
  };
}
