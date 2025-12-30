export type ConfidenceLevel = "low" | "medium" | "high";

export type RiskInput = {
  risk: number;
  confidence: ConfidenceLevel;
};

export type OverallRiskResult = {
  overallRisk: number;
  label: "Low Risk" | "Moderate Risk" | "High Risk";
  confidence: ConfidenceLevel;
};

export function calculateOverallRisk(
  r1: RiskInput,
  r2: RiskInput,
  r3: RiskInput
): OverallRiskResult {
  // Weighted technical risk
  const combinedTechnical = 0.6 * r1.risk + 0.4 * r2.risk;

  // Envelope logic — weakest dimension dominates
  const overallRisk = Math.max(r3.risk, combinedTechnical, r2.risk);

  // Confidence aggregation (minimum confidence wins)
  const confidenceOrder: ConfidenceLevel[] = ["low", "medium", "high"];

  const overallConfidence =
    confidenceOrder[
      Math.min(
        confidenceOrder.indexOf(r1.confidence),
        confidenceOrder.indexOf(r2.confidence),
        confidenceOrder.indexOf(r3.confidence)
      )
    ];

  let label: OverallRiskResult["label"] = "Low Risk";
  if (overallRisk >= 0.7) label = "High Risk";
  else if (overallRisk >= 0.4) label = "Moderate Risk";

  return {
    overallRisk,
    label,
    confidence: overallConfidence,
  };
}
