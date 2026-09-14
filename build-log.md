# Build log

Daily entries: what happened, what's next.

## 11 Sep 2026 — Day 0
**Done**
- Target confirmed: OSF × Andela hackathon, "Information you can trust" — closes 21 Sep 2026 23:59 UTC · $6,000 pool · 5 winners · Kenya event, Oct 2026.
- Mission Control live in Notion: hub + 7 docs (First Thoughts · Brief decoded · Plan · Winning Strategy · Research Log · Documentation System · World Monitor teardown).
- This repo live: docs mirrored, AI-usage log started.
- Rules decoded: no AI-generated capstone idea (SPSS lineage = provenance receipt) · cross-track = ONE submission · submissions updatable → v1 early · 5 winners → target top-5 consistency.
- Track decision: **cross-track** — Stability & Social Cohesion + Transparency & Accountability.
- Reference teardown: World Monitor (86k-star OSINT dashboard) → refit rules written. Take: layer registry + provenance schema + renderer fallback ladder + country-pack variants. Leave: OSINT scope, 3D globe centerpiece, breadth. Identity flip: "what can you trust, and what do you do next."

**Decisions**
- One submission, cross-track. Two entries: rejected.
- Refit patterns, never fork code (AGPL-3.0). Credit in README.

**Open at next session (12 Sep = D1 on the Plan)**
- Lock the idea + scenario country (Kenya / Nigeria / DRC) — working direction: civic trust layer with a map view (World Monitor-refit chassis + SPSS base).
- Pick the 3 first layers; define the MVP slice.
- Then spec: user journey, architecture, trust model, wireframes.

## 14 Sep 2026 — Day 3 (build started)

Reality check at the start of this session: the plan had idea lock and spec
falling on 12–13 Sep, and the repo stopped at D0 with zero code. Two days behind
with four build days left before the v1 upload on 18 Sep. So D1, D2 and the first
day of D3 were compressed into one session.

**Decisions locked** (recorded in `docs/spec.md` §1)
- Anchor country: **Nigeria** — velocity, since the state geometry was already
  held locally and it is the author's own context. Kenya and DRC stay as named
  pack candidates.
- Library: the plan's own default slice — public services, service failures,
  verified alerts.
- Working name: **Ukweli** (Kiswahili: truth), chosen to travel beyond one
  country because country packs are the scalability claim. Held in one place.
- Identity held firm: a civic trust layer where provenance *is* the product, not
  "World Monitor for Africa". The teardown's *leave* list was respected: no 3D
  globe, no 44-panel breadth, no OSINT scope.

**Built** — the MVP, working and verified
- Trust model in `src/types.ts`: an item cannot exist without a source, and cannot
  exist without stating what it does not tell you. Four confidence tiers explained
  to the reader in plain words.
- Nigeria pack: 8 items across 3 layers, 13 registered sources, every source with
  its own caveat and retrieval date.
- Kenya pack: wired into the engine, sources registered, **0 items published** —
  the scalability claim demonstrated rather than asserted, and the honesty claim
  demonstrated by showing an empty pack that explains itself.
- 2026 flood outlook as real state geometry: 33 states + FCT high risk, moderate
  spans 35 states with only Ekiti excluded, plus named coastal and urban
  flash-flood exposure. 19 cities named for flash flooding.
- SPSS Readiness Index for 31 countries as the base layer, with the framework's
  own "Estimated" annotations carried through instead of tidied away.
- Lite mode, read-aloud via on-device speech, keyboard-navigable map, print
  stylesheet, offline PWA.
- Verified: `tsc --noEmit` clean, production build clean, served bundle confirmed
  to contain the real claims, geometry and service worker confirmed reachable.

**Defects caught and fixed in-session**
- `confirmations` missing from all eight items — caught by `tsc`, not by review.
- `as const` on the metric table narrowed a confidence union to one literal,
  making the `estimated` branch a dead comparison — caught by `tsc`.
- Backslash-escaped quotes and a no-op ternary left in the footer — caught on
  read-through.

**Judgement calls worth recording**
- The NBS cost-of-living item carries **no figure**, because the current release
  was not retrieved and quoting a headline number would be the exact failure this
  product exists to correct. An item that says nothing is better than one that
  says something unverified.
- Nine items rest partly on press reporting of primary documents not retrieved.
  Rather than hiding that, each is marked `reported` and says so in its own
  `limitations`. The NERC escalation path is `verified` (it is on nerc.gov.ng)
  while the phone numbers in the same item are flagged as press-sourced.
- The map states the tier-overlap rule wherever it is read. A map that looks more
  certain than its source is the failure mode.

**Next session (15 Sep)** — retrieve the AFO and NERC/2026/002 documents and
upgrade items 1 and 3 from `reported` to `verified`. Grow the corpus to ~14
items. Verification is the bottleneck, not coding.

