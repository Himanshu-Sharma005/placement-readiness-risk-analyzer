/**
 * Demo-mode activity logger.
 * Firebase-backed logging is intentionally disabled in production builds.
 */

export async function logTodayActivity(uid: string) {
  const today = new Date().toISOString().slice(0, 10);

  // Mock side-effect (for UI / testing only)
  console.log("[DEMO] Activity logged", {
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
  });

  return { success: true };
}
