"use client";

import { useState } from "react";

export default function RiskDetails({ r1, r2, r3 }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 border rounded-xl">
      <button onClick={() => setOpen(!open)} className="text-sm text-blue-600">
        {open ? "Hide" : "Show"} technical details
      </button>

      {open && (
        <div className="mt-4 space-y-2 text-sm text-gray-300">
          <p>DSA Regression Risk: {r1.risk}</p>
          <p>Project Fragility Risk: {r2.risk}</p>
          <p>Consistency Collapse Risk: {r3.risk}</p>
        </div>
      )}
    </div>
  );
}
