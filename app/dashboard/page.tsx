"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { calculateConsistencyRisk } from "@/lib/risk/r3Consistency";
import { calculateDsaRegressionRisk } from "@/lib/risk/r1DsaRegression";
import { calculateProjectFragilityRisk } from "@/lib/risk/r2ProjectFragility";
import { calculateOverallRisk } from "@/lib/risk/riskEnvelope";

import OverallRiskCard from "../../components/OverallRiskCard";
import DominantRisks from "../../components/DominantRisks";
import RiskDetails from "../../components/RiskDetails";
import Disclaimer from "../../components/Disclaimer";

/**
 * 🔒 DEMO MODE
 * Auth is intentionally disabled in production builds.
 * Replace with real UID when running locally.
 */
const DEMO_UID = "demo_user";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [r1, setR1] = useState<any>(null);
  const [r2, setR2] = useState<any>(null);
  const [r3, setR3] = useState<any>(null);
  const [overall, setOverall] = useState<any>(null);

  useEffect(() => {
    async function runRiskModel() {
      try {
        const r1 = await calculateDsaRegressionRisk(DEMO_UID);
        const r2 = await calculateProjectFragilityRisk(DEMO_UID);
        const r3 = await calculateConsistencyRisk(DEMO_UID);

        setR1(r1);
        setR2(r2);
        setR3(r3);

        const overallRisk = calculateOverallRisk(r1, r2, r3);
        setOverall(overallRisk);
      } catch (err) {
        console.error("Risk calculation failed:", err);
      } finally {
        setLoading(false);
      }
    }

    runRiskModel();
  }, []);

  if (loading) {
    return <div className="p-8">Loading risk model…</div>;
  }

  if (!overall) {
    return <div className="p-8">Risk data unavailable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Placement Readiness Risk Analyzer
      </h1>

      <p className="text-sm text-gray-400">
        Diagnostic risk view based on recent preparation behavior
      </p>

      <OverallRiskCard overall={overall} />

      <DominantRisks r1={r1} r2={r2} r3={r3} />

      <RiskDetails r1={r1} r2={r2} r3={r3} />

      <Disclaimer />
    </div>
  );
}
