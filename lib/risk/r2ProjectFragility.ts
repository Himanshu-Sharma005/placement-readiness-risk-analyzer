import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function calculateProjectFragilityRisk(uid: string) {
  const q = query(collection(db, "activity_logs"), where("uid", "==", uid));

  const snapshot = await getDocs(q);

  const projectLogs = snapshot.docs
    .map((d) => d.data())
    .filter((d) => d.project?.touched);

  if (projectLogs.length === 0) {
    return {
      risk: 0.8,
      confidence: "low",
      projectDays: 0,
      layersTouched: [],
      bugFixEvidence: false,
    };
  }

  let risk = 0.3;

  // Distinct layers
  const layerSet = new Set<string>();
  projectLogs.forEach((d) =>
    (d.project.layersWorked || []).forEach((l: string) => layerSet.add(l))
  );

  if (layerSet.size === 1) risk += 0.2;
  else if (layerSet.size === 2) risk += 0.1;

  // Iteration depth
  if (projectLogs.length <= 2) risk += 0.1;

  // Bug fix signal
  const hasBugFix = projectLogs.some((d) => d.project.bugFix);
  if (!hasBugFix) risk += 0.1;

  risk = Math.min(0.8, Math.max(0.3, risk));

  const confidence = projectLogs.length >= 5 ? "high" : "medium";

  return {
    risk,
    confidence,
    projectDays: projectLogs.length,
    layersTouched: Array.from(layerSet),
    bugFixEvidence: hasBugFix,
  };
}
