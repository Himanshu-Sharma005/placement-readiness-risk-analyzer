import type { RiskInput } from "@/lib/risk/riskEnvelope";

export const demoRiskData: {
  r1: RiskInput;
  r2: RiskInput;
  r3: RiskInput;
} = {
  r1: {
    risk: 0.4,
    confidence: "medium",
  },
  r2: {
    risk: 0.6,
    confidence: "medium",
  },
  r3: {
    risk: 0.2,
    confidence: "high",
  },
};
