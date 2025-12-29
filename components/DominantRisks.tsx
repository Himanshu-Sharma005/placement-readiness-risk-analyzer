export default function DominantRisks({ r1, r2, r3 }: any) {
  const risks = [
    { name: "Consistency Collapse", risk: r3.risk },
    { name: "Project Fragility", risk: r2.risk },
    { name: "DSA Regression", risk: r1.risk },
  ];

  const top = risks.sort((a, b) => b.risk - a.risk).slice(0, 2);

  const label = (v: number) =>
    v >= 0.7 ? "High" : v >= 0.4 ? "Moderate" : "Low";

  return (
    <div className="border rounded-2xl p-6">
      <h3 className="text-lg font-medium mb-1">Dominant Risk Drivers</h3>
      <p className="text-sm text-gray-400 mb-4">
        Primary contributors to overall risk
      </p>

      <ul className="space-y-3">
        {top.map((r, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="font-medium">{r.name}</span>
            <span className="text-sm opacity-80">{label(r.risk)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
