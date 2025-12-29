export function calculateOverallRisk(
  r1: { risk: number; confidence: string },
  r2: { risk: number; confidence: string },
  r3: { risk: number; confidence: string }
) {
  const combinedTechnical = 0.6 * r1.risk + 0.4 * r2.risk;

  const overallRisk = Math.max(r3.risk, combinedTechnical, r2.risk);

  const confidenceLevels = ["low", "medium", "high"];
  const overallConfidence =
    confidenceLevels[
      Math.min(
        confidenceLevels.indexOf(r1.confidence),
        confidenceLevels.indexOf(r2.confidence),
        confidenceLevels.indexOf(r3.confidence)
      )
    ];

  let label = "Low Risk";
  if (overallRisk >= 0.7) label = "High Risk";
  else if (overallRisk >= 0.4) label = "Moderate Risk";

  return {
    overallRisk,
    label,
    confidence: overallConfidence,
  };
}
