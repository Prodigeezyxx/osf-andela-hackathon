# Reference teardown — World Monitor (refit rules)

## What it is
World Monitor (github.com/koala73/worldmonitor · worldmonitor.app) — real-time global intelligence dashboard. 86k stars, TypeScript, AGPL-3.0, 7,698 files, created Jan 2026, shipping daily. Aggregates 30+ sources (ACLED, UCDP, GDELT, NASA FIRMS, outage feeds, weather, markets) into a map + panel situational-awareness UI.

Architecture worth knowing: config-driven **layer registry** (each layer declares render paths: svg fallback / deck WebGL / globe 3D) · **LayerExplanation schema** (source, freshness, confidence, limitations, evidence per layer) · **variant system** (one codebase → 6 audiences) · edge functions + Redis cache + service worker offline + in-browser ML (no API keys).

## The trap
"World Monitor for Africa" = derivative. Judges know this project (86k stars). A layered map clone loses Uniqueness instantly. We cannot out-build 7,698 files in 7 days, and AGPL code reuse drags obligations. Do NOT fork, do NOT clone the scope.

## The identity flip (this is the refit)
WM aggregates claims for global analysts. **Ours verifies information for citizens and local watchdogs.**
- WM = "what is happening" (situational awareness).
- Ours = "what can you TRUST, and what do you do next" (civic trust layer with a map view).
The trust engine is the product: every item carries source · last-updated · confidence · limitations · evidence · community confirmation — and a next step. WM displays attribution; we make verification visible and community-driven. That is the unique wedge, and it is exactly what the brief's constraints demand.

## TAKE (refit aspects that are required)
- **Layer registry pattern** → our civic layers: public services, service outages, water/energy, public budget projects, verified alerts, market prices for essentials.
- **Provenance schema per item** (their LayerExplanation pattern) → the trust core; answers "traceable, easy to verify, know when last updated".
- **Renderer fallback ladder (svg→deck→globe)** → our Low-Bandwidth Mode: text-first tier for basic devices, map tier for those who can carry it. The brief demands this; their ladder proves the pattern.
- **Variant architecture** → per-country/community config packs (Scalability criterion: demo 2–3 packs).
- **Choropleth score layer** → **SPSS SRI already exists for 31 African countries** (ours, pre-hackathon). Use it as the base layer of the monitor — this makes the product unmistakably ours.
- **Offline-first + local ML (no API keys)** → resilience story + zero-cost demo.
- **Docs culture** (plans/solutions/conventions) → our documentation system, already running.

## LEAVE
Global-military OSINT scope · 44-panel breadth · 3D globe as centerpiece (optional view only) · pro-tier monetization · Tauri desktop · their aesthetic (dark Palantir-style) — ours should feel civic, warm, legible.

## Deliverable map
- **Repo**: trust layer + layered civic map with lite view, 2–3 real layers end-to-end for one country. README: pattern credit to World Monitor, no code copied.
- **Video**: a claim appears → verified with provenance → clear next steps; show lite mode working.
- **Deck**: problem/users/solution/impact — fusion diagram: SPSS (method) × verification engine × map UX.
- **Summary**: cross-track; real citable sources; trust approach = provenance schema; AI-usage log.
- **Judging**: Uniqueness = verification engine + SPSS lineage · Scalability = country packs + renderer ladder · AI Coding = logged · Presentation = polished map demo.

## Compliance & credit
- Take PATTERNS, not code. If any code is ever borrowed: AGPL-3.0 obligations + attribution. Default: original implementation.
- README "References" section: World Monitor (inspiration), AGPL-3.0 noted.
- Idea provenance stays ours: SPSS + user direction; WM is a form/architecture reference only.

## MVP slice (7 days)
One country · 3 layers (e.g., services + outages + verified alerts) · provenance card on every item · one community-verification loop · lite text mode · deployed on Vercel. Everything else is stretch.


---
Sources: https://github.com/koala73/worldmonitor · https://www.worldmonitor.app/dashboard
