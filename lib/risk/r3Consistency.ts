type ConsistencyRiskResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  maxGapDays: number;
};

export async function calculateConsistencyRisk(
  uid: string
): Promise<ConsistencyRiskResult> {
  const { db } = await import("@/lib/firebase");
  if (!db) throw new Error("Firestore not initialized");

  const { collection, query, where, orderBy, getDocs } = await import(
    "firebase/firestore"
  );

  const q = query(
    collection(db, "activity_logs"),
    where("uid", "==", uid),
    orderBy("date", "asc")
  );

  const snap = await getDocs(q);

  let last: Date | null = null;
  let maxGap = 0;

  snap.forEach((doc) => {
    const d = new Date(doc.data().date);
    if (last) {
      const gap = Math.floor(
        (d.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      maxGap = Math.max(maxGap, gap);
    }
    last = d;
  });

  const risk = maxGap > 7 ? 0.7 : maxGap > 3 ? 0.4 : 0.1;

  return {
    risk,
    confidence: snap.size >= 7 ? "high" : "low",
    maxGapDays: maxGap,
  };
}
