import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function calculateDsaRegressionRisk(uid: string) {
  const q = query(collection(db, "activity_logs"), where("uid", "==", uid));

  const snapshot = await getDocs(q);

  const logs: {
    date: Date;
    practiced: boolean;
    topics: string[];
  }[] = [];

  snapshot.forEach((doc) => {
    const d = doc.data();
    logs.push({
      date: new Date(d.date),
      practiced: d.dsa.practiced,
      topics: d.dsa.topics || [],
    });
  });

  if (logs.length === 0) {
    return { risk: 0.8, confidence: "low" };
  }

  logs.sort((a, b) => a.date.getTime() - b.date.getTime());

  const today = new Date();

  const practicedLogs = logs.filter((l) => l.practiced);

  if (practicedLogs.length === 0) {
    return { risk: 0.8, confidence: "low" };
  }

  const lastPractice = practicedLogs[practicedLogs.length - 1].date;

  const daysSinceLast = Math.floor(
    (today.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24)
  );

  let risk = 0.2;
  if (daysSinceLast >= 7) risk = 0.8;
  else if (daysSinceLast >= 4) risk = 0.6;
  else if (daysSinceLast >= 2) risk = 0.4;

  // Frequency (last 14 days)
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(today.getDate() - 14);

  const recentPracticeDays = practicedLogs.filter(
    (l) => l.date >= fourteenDaysAgo
  ).length;

  if (recentPracticeDays <= 2) risk += 0.1;
  if (recentPracticeDays >= 6) risk -= 0.1;

  // Topic diversity
  const topicSet = new Set<string>();
  practicedLogs.forEach((l) => l.topics.forEach((t) => topicSet.add(t)));

  if (topicSet.size <= 1) risk += 0.1;

  // Clamp
  risk = Math.min(0.8, Math.max(0.2, risk));

  const confidence = practicedLogs.length >= 7 ? "high" : "medium";

  return {
    risk,
    confidence,
    daysSinceLast,
    recentPracticeDays,
    topicCount: topicSet.size,
  };
}
