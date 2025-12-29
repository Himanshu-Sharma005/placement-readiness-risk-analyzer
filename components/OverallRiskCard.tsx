export default function OverallRiskCard({ overall }: any) {
  const color =
    overall.label === "High Risk"
      ? "bg-red-950/40 border-red-700 text-red-200"
      : overall.label === "Moderate Risk"
      ? "bg-amber-950/40 border-amber-700 text-amber-200"
      : "bg-green-950/40 border-green-700 text-green-200";

  return (
    <div className={`border rounded-2xl p-8 ${color}`}>
      <p className="text-sm uppercase tracking-wide opacity-80">Overall Risk</p>

      <h2 className="text-4xl font-bold mt-2">{overall.label}</h2>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          Risk score:{" "}
          <span className="font-medium">{overall.overallRisk.toFixed(2)}</span>
        </p>
        <p>
          Confidence:{" "}
          <span className="font-medium capitalize">{overall.confidence}</span>
        </p>
      </div>
    </div>
  );
}
