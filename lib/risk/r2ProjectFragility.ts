type ProjectFragilityResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  projectDays: number;
  layersTouched: string[];
  bugFixEvidence: boolean;
};

export async function calculateProjectFragilityRisk(
  uid: string
): Promise<ProjectFragilityResult> {
  // 🔒 Lazy Firebase import (SSR-safe)
  const { db } = await import("@/lib/firebase");
  if (!db) throw new Error("Firestore not initialized");

  const { collection, query, where, getDocs } = await import(
    "firebase/firestore"
  );

  const q = query(collection(db, "activity_logs"), where("uid", "==", uid));

  const snap = await getDocs(q);

  let projectDays = 0;
  const layers = new Set<string>();
  let bugFixEvidence = false;

  snap.forEach((doc) => {
    const d = doc.data();

    if (d.project?.touched) {
      projectDays++;

      if (Array.isArray(d.project.layersWorked)) {
        d.project.layersWorked.forEach((l: string) => layers.add(l));
      }

      if (d.project.bugFix === true) {
        bugFixEvidence = true;
      }
    }
  });

  // ---- Risk logic (deterministic, explainable) ----
  let risk: number;

  if (projectDays === 0) {
    risk = 0.9; // no real project work
  } else if (layers.size <= 1) {
    risk = 0.7; // shallow projects
  } else if (!bugFixEvidence) {
    risk = 0.5; // no maintenance / debugging
  } else {
    risk = 0.2; // healthy project depth
  }

  return {
    risk,
    confidence: projectDays >= 5 ? "medium" : "low",
    projectDays,
    layersTouched: Array.from(layers),
    bugFixEvidence,
  };
}
