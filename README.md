# Placement Readiness Risk Analyzer (PRRA)

PRRA is a **deterministic diagnostic system** that estimates how risky a student’s current preparation trajectory is for placement interviews.

This project **does not predict placement outcomes**.  
It quantifies **risk** based on observable preparation behavior.

---

## Why this project exists

Most “placement trackers” are glorified to-do lists.

PRRA is different. It is designed to demonstrate the ability to:

- Model an abstract, real-world problem
- Define clear system boundaries
- Make defensible assumptions
- Quantify uncertainty without machine learning
- Explain *why* a result was produced, not just *what*

This project was intentionally built **without AI or ML** to keep the logic auditable and explainable.

---

## Core Concept

PRRA estimates:

> **“Given recent preparation behavior, how risky is this student’s trajectory?”**

It evaluates *risk drivers*, not outcomes.

---

## Risk Dimensions Modeled

The current version models three independent, deterministic risk factors:

### R1 — DSA Regression Risk
Evaluates consistency and recency of DSA practice:
- Days since last practice
- Number of active practice days
- Topic diversity

### R2 — Project Fragility Risk
Evaluates depth of hands-on project work:
- Number of project-active days
- Breadth of layers touched (e.g., frontend, backend, debugging)
- Evidence of maintenance or bug-fixing

### R3 — Consistency Collapse Risk
Evaluates preparation continuity:
- Longest inactivity gap
- Pattern of engagement over time

---

## Overall Risk Envelope

Individual risks are combined using a deterministic envelope:

- Technical risk is weighted (DSA + Projects)
- Behavioral collapse risk acts as an upper bound
- Final output includes:
  - Risk score (0–1)
  - Risk label (Low / Moderate / High)
  - Confidence level based on data sufficiency

---

## What PRRA Is *Not*

- ❌ Not a placement predictor  
- ❌ Not company-specific  
- ❌ Not resume parsing  
- ❌ Not ML-based  
- ❌ Not a recommendation engine  

These were intentionally excluded to keep the model interpretable.

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS (minimal, dashboard-first)
- **Data Source**: Mocked behavioral data (demo-safe)
- **Logic**: Pure deterministic scoring functions

> Firebase integration was explored during development but is intentionally **disabled in the demo build** to ensure stability and reproducibility.

---

## Project Structure (Simplified)

app/
├─ dashboard/ # Main risk dashboard
├─ login/ # Authentication UI (demo)
components/
├─ OverallRiskCard
├─ DominantRisks
├─ RiskDetails
└─ Disclaimer
lib/
├─ risk/ # Deterministic risk models (R1, R2, R3)
├─ mock/ # Demo data



---

## Running Locally

```bash
npm install
npm run dev

Open http://localhost:3000/dashboard

