import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function calculateConsistencyRisk(uid: string) {
  const q = query(collection(db, "activity_logs"), where("uid", "==", uid));

  const snapshot = await getDocs(q);

  const dates: Date[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    dates.push(new Date(data.date));
  });

  // No data = maximum risk
  if (dates.length === 0) {
    return {
      risk: 0.8,
      confidence: "low",
      maxGapDays: null,
    };
  }

  // Sort dates ascending
  dates.sort((a, b) => a.getTime() - b.getTime());

  let maxGap = 0;

  for (let i = 1; i < dates.length; i++) {
    const gapMs = dates[i].getTime() - dates[i - 1].getTime();
    const gapDays = Math.floor(gapMs / (1000 * 60 * 60 * 24));
    maxGap = Math.max(maxGap, gapDays);
  }

  let risk = 0.2;
  if (maxGap >= 7) risk = 0.8;
  else if (maxGap >= 4) risk = 0.5;

  const confidence = dates.length >= 10 ? "high" : "medium";

  return {
    risk,
    confidence,
    maxGapDays: maxGap,
  };
}
