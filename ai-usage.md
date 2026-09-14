# AI usage log

How AI software development tools are used on this project — the hackathon judges this area directly, so it is documented as we go.

| Date | Tool | What | Outcome |
| --- | --- | --- | --- |
| 11 Sep | Hermes Agent | Recon sweep: 17 browser tabs inspected over CDP; hackathon brief + rules decoded; reference teardown (World Monitor) | Research Log + teardown doc |
| 11 Sep | Hermes Agent | Notion API automation: Mission Control hub + 7 planning docs created | Planning system live |
| 11 Sep | Hermes Agent | GitHub CLI + git: repo scaffold, docs mirror, commit trail | This repo |
| 14 Sep | Hermes Agent | Skill-guided scaffold: Vite + React + TS + plain CSS + PWA. Design tokens, lite mode renderer ladder | Working app shell |
| 14 Sep | Hermes Agent | Source verification sweep: NIHSA/NEMA flood outlook, NiMet SCP, NERC redress and Directive 2026/002, NIMC, BudgetNigeria, Tracka, NBS. Each source read and recorded with publisher, URL, date and its own caveat | 13 registered sources, 8 items |
| 14 Sep | Hermes Agent | Grounded data capture: full high-risk state list and tier totals from the AFO release; geoBoundaries/GRID3 geometry wired to a real choropleth | Flood layer + risk map |
| 14 Sep | Hermes Agent | Ported the author's own SPSS/SRI framework (31 countries) from the pre-hackathon repo into the app as the base layer | Framework view |
| 14 Sep | Hermes Agent | Trust model authoring: typed provenance schema enforcing sources, dates, confidence and limitations | `src/types.ts` |
| 14 Sep | Hermes Agent | Verification pass: `tsc --noEmit`, production build, served-bundle content assertions, geometry and service-worker checks. Caught 3 real defects | Build verified, defects fixed |
| 14 Sep | Hermes Agent | Spec, README, licence and this log | `docs/spec.md` |

### How the tools were directed

The AI was deliberately **not** used to choose the idea — the brief forbids it and
the provenance is the author's own framework. AI was used for: research and source
retrieval, translation of retrieved facts into a typed provenance schema, code
authoring, and verification. Every factual claim in the corpus was traced back to a
retrieved URL before it was written into a pack, and claims that could not be
traced were either marked `reported` with the gap stated, or omitted entirely.

