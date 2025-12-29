import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function logTodayActivity(uid: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const docId = `${uid}_${today}`;

  const ref = doc(db, "activity_logs", docId);

  await setDoc(ref, {
    uid,
    date: today,

    dsa: {
      practiced: true,
      topics: ["arrays"],
      durationMinutes: 30,
    },

    project: {
      touched: false,
      layersWorked: [],
      bugFix: false,
    },

    interview: {
      attempted: false,
      type: null,
    },

    createdAt: new Date(),
  });
}
