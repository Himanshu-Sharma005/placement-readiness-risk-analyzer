export type ProjectFragilityResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  projectDays: number;
  layersTouched: string[];
  bugFixEvidence: boolean;
};

export async function calculateProjectFragilityRisk(
  uid: string
): Promise<ProjectFragilityResult> {
  let projectDays: number = 3;

  const layersTouched = ["frontend", "backend"];
  const bugFixEvidence = false;

  let risk: number;

  if (projectDays === 0) {
    risk = 0.9;
  } else if (layersTouched.length <= 1) {
    risk = 0.7;
  } else if (!bugFixEvidence) {
    risk = 0.5;
  } else {
    risk = 0.2;
  }

  return {
    risk,
    confidence: projectDays >= 5 ? "medium" : "low",
    projectDays,
    layersTouched,
    bugFixEvidence,
  };
}
