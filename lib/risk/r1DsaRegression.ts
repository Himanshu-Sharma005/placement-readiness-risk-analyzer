type DsaRegressionResult = {
  risk: number;
  confidence: "low" | "medium" | "high";
  daysSinceLast: number;
  recentPracticeDays: number;
  topicCount: number;
};

export async function calculateDsaRegressionRisk(
  uid: string
): Promise<DsaRegressionResult> {
  const { db } = await import("@/lib/firebase");
  if (!db) throw new Error("Firestore not initialized");

  const { collection, query, where, getDocs, Timestamp } = await import(
    "firebase/firestore"
  );

  const since = Timestamp.fromDate(
    new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  );

  const q = query(
    collection(db, "activity_logs"),
    where("uid", "==", uid),
    where("date", ">=", since)
  );

  const snap = await getDocs(q);

  let lastPractice = 999;
  let days = new Set<string>();
  let topics = new Set<string>();

  snap.forEach((doc) => {
    const d = doc.data();
    if (d.dsa?.practiced) {
      days.add(d.date);
      d.dsa.topics?.forEach((t: string) => topics.add(t));
      lastPractice = 0;
    }
  });

  const recentPracticeDays = days.size;
  const topicCount = topics.size;

  const risk = lastPractice > 7 ? 0.7 : recentPracticeDays < 3 ? 0.4 : 0.1;

  return {
    risk,
    confidence: snap.size >= 5 ? "medium" : "low",
    daysSinceLast: lastPractice,
    recentPracticeDays,
    topicCount,
  };
}
