export type ConsistencyRiskResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  maxGapDays: number;
};

export async function calculateConsistencyRisk(
  uid: string
): Promise<ConsistencyRiskResult> {
  // Deterministic mock values (deployment-safe)
  const maxGapDays: number = 2;

  let risk: number;

  if (maxGapDays > 7) {
    risk = 0.7;
  } else if (maxGapDays > 3) {
    risk = 0.4;
  } else {
    risk = 0.1;
  }

  return {
    risk,
    confidence: maxGapDays <= 2 ? "high" : "medium",
    maxGapDays,
  };
}
