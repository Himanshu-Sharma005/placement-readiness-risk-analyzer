"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { demoRiskData } from "@/lib/mock/demodata";
import { calculateOverallRisk } from "@/lib/risk/riskEnvelope";

import OverallRiskCard from "../../components/OverallRiskCard";
import DominantRisks from "../../components/DominantRisks";
import RiskDetails from "../../components/RiskDetails";
import Disclaimer from "../../components/Disclaimer";

export default function DashboardPage() {
  const [overall, setOverall] = useState<any>(null);

  useEffect(() => {
    const overallRisk = calculateOverallRisk(
      demoRiskData.r1,
      demoRiskData.r2,
      demoRiskData.r3
    );
    setOverall(overallRisk);
  }, []);

  if (!overall) return <div className="p-8">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-semibold">
        Placement Readiness Risk Analyzer
      </h1>

      <OverallRiskCard overall={overall} />
      <DominantRisks {...demoRiskData} />
      <RiskDetails {...demoRiskData} />
      <Disclaimer />
    </div>
  );
}
