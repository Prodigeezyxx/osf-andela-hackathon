# Ukweli — information you can check, and act on

**Ukweli** is a civic trust layer. It publishes verified information about public
services, service failures and official alerts, and every single item carries
four things a reader is entitled to: **where it came from**, **when it was last
checked**, **what it cannot tell you**, and **what to do next**.

Built for the **OSF × Andela hackathon** — *"Information you can trust"*, September 2026.

> **The ten-second test.** Most civic entries are a chatbot over government PDFs.
> This is not. Ukweli's engine is a provenance schema, not a language model: an
> item cannot be published without a retrievable source, a last-checked date, an
> explicit statement of its own limits, and at least one action. Where we have
> nothing verified, the interface says so instead of filling the space.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

Production:

```bash
npm run typecheck
npm run build
npm run preview
```

No environment variables, no API keys, no accounts, no backend. The app shell,
the country packs and the state geometry all ship in the build, and a service
worker caches them on first load — so it keeps working when the connection drops.

---

## What is in the box

| View | What it does |
| --- | --- |
| **Items** | The verified corpus. Filter by civic layer, search it, open any item for its full provenance. |
| **Map** | The 2026 Annual Flood Outlook drawn as state geometry, click a state for what applies there. |
| **Framework** | The SPSS Readiness Index across 31 African countries, including which sub-indicators are estimates. |
| **Lite mode** | Strips the decoration, drops the map, single column, larger type — for basic devices and expensive data. |

**Three civic layers in this slice:** public services · service failures · verified alerts.

**Two country packs.** Nigeria is built out. Kenya is wired into the engine with
its sources registered and **zero published items** — because nothing has been
retrieved and cited for it yet, and we would rather show an empty pack that
explains itself than placeholder rows. That is the trust model working, not a gap.

**Read aloud** is on every item, using the speech already on the device. The same
verified text, spoken, for readers who take information by listening.

---

## How an item is built

```ts
interface TrustItem {
  plain: string;              // one line, no jargon, readable aloud
  body: string;               // a short paragraph
  sources: string[];          // MUST be non-empty. Ids into the registered sources
  observedAt: string;         // when the event or figure dates from
  lastCheckedAt: string;      // when a human or agent last opened the sources
  confidence: 'verified' | 'reported' | 'estimated' | 'disputed';
  evidence: string[];         // what backs the claim
  limitations: string[];      // what this does NOT tell you. Required, not optional
  nextSteps: NextStep[];      // what to do, with a URL or a contact
  confirmations: {...};       // community check, stored locally only
}
```

The four confidence tiers are shown to the reader in plain words:

- **Verified** — a primary or official document states this, and we checked it on the date shown.
- **Reported** — credible reporting says this, but we have not retrieved the original document.
- **Estimated** — a modelled or estimated figure, not a measurement.
- **Disputed** — sources disagree, and both are shown.

A source carries its own `caveat` field, rendered in the interface. So the NERC
escalation path is marked **Verified** (it is on `nerc.gov.ng`) while the phone
numbers for that same item are flagged as coming from a press guide and needing
confirmation. That distinction is the product.

---

## Data sources

Real, dated, publicly checkable. Full detail in [`docs/spec.md`](docs/spec.md).

| Source | Publisher | Used for |
| --- | --- | --- |
| Annual Flood Outlook 2026 | NIHSA (via NEMA and press reporting) | Flood risk tiers and state lists |
| Seasonal Climate Prediction 2026 | NiMet (via NEMA) | Seasonal rainfall outlook |
| Complaints and Redress Procedure | NERC | Electricity complaint escalation path |
| Directive No. NERC/2026/002 | NERC (via press reporting) | Band A compensation |
| NIN pre-enrolment | services.gov.ng / NIMC | Identity service |
| Government spending open data | BudgetNigeria | Federal budget and spending |
| Tracka project documents | BudgIT Foundation | Constituency project tracking |
| CPI and inflation releases | National Bureau of Statistics | Cost of living |

**Not carried, deliberately:** nine of the seeded items rest partly on press
reporting of primary documents we did not retrieve, and each one says so in its
own `limitations` list. The NBS cost-of-living item carries **no figure at all**,
because we did not retrieve the current release and quoting a headline number
would be the exact failure this product exists to correct.

---

## The base layer is ours

The **SPSS Readiness Index (SRI)** — *Spatial, Physical, Social Systems* — is
Iyobosa Rehoboth's own framework, originated and published **before** this
hackathon (CC BY 4.0). It scores 31 African countries across three layers:

```
SRI = GM(P, S, Sp) × (1 + B) / 2 × 100
```

Geometric mean, so if any layer is zero the index is zero. A balance factor, so
lopsided development is penalised. The framework brings its own counter-examples
(One Laptop Per Child, iFarm, Ushahidi's triage overload) and each one failed on
a layer that was assumed rather than designed.

Nine sub-indicators feed the index; **three of them are estimates rather than
measurements**, and the interface labels them as such rather than tidying them
away. The framework is the design lens and the base layer. The tool is a new build.

---

## How this meets the six operating constraints

| Constraint | What is actually implemented |
| --- | --- |
| **Trust & verification** | Provenance schema enforced in the type system: every item carries sources, observed and last-checked dates, a confidence tier, and limitations. A running counter in the sidebar reports how many published items lack a source. |
| **Low bandwidth** | ~64 KB gzipped JS, ~3 KB CSS, plain CSS with no framework. Service worker caches the shell, packs and geometry. Lite mode drops the map and all decoration. No external fonts, so it renders with no network at all. |
| **Accessibility & inclusion** | Read-aloud on every item via on-device speech. Plain-language summaries above every claim. Semantic landmarks, real buttons, keyboard-navigable map with `Enter`/`Space`, visible focus rings, `prefers-reduced-motion` respected, and a print stylesheet. |
| **Privacy & security** | No accounts, no analytics, no tracking, no server to leak. Community confirmations live in `localStorage` and nowhere else, and the interface says so at the point of voting. |
| **Multilingual** | The i18n layer is wired. A language is only shown as translated when a native speaker has reviewed it; the rest are labelled **needs native review** in the pack and in the interface, rather than machine-translated and passed off as localisation. |
| **Local relevance** | Country packs. Onboarding a country = adding one data file and one pack file, with zero engine changes. |
| **Clear next steps** | Required by the type. Every item has numbered next steps with a URL or a contact; where a contact is unverified it is labelled as unverified. |

---

## Structure

```
src/
  types.ts                  the trust model — confidence tiers, sources, limitations
  data/
    sri.ts                  SPSS Readiness Index, 31 countries, documented formula
    flood-risk.ts           2026 flood outlook geography, with the tier rules
    packs/
      nigeria.ts            the built-out pack: 8 items, 13 registered sources
      kenya.ts              second pack: wired, sources registered, 0 items published
      index.ts              pack registry
  components/               TrustCard · ItemDetail · LayerRail · RiskMap · SriPanel
  lib/                      i18n · useConfirmations · useReadAloud
docs/                       brief · plan · strategy · spec · World Monitor teardown
build-log.md                daily progress
ai-usage.md                 how AI tools were used (a judged area)
```

---

## References and credit

- **SPSS / SRI** — Iyobosa Rehoboth's own pre-hackathon framework, CC BY 4.0.
- **State boundaries** — geoBoundaries / GRID3, CC BY 4.0, simplified.
- **Architecture inspiration** — [World Monitor](https://github.com/koala73/worldmonitor)
  (AGPL-3.0). Patterns were studied, **no code was copied**: the layer registry,
  per-item provenance schema and renderer fallback ladder are reimplemented here
  from scratch, in TypeScript, for a different purpose. World Monitor answers
  *what is happening* for analysts; Ukweli answers *what can you trust, and what
  do you do next* for citizens. See [`docs/refit-worldmonitor.md`](docs/refit-worldmonitor.md).

## Licence

Application code: see `LICENSE`. The SPSS framework text and index remain the
author's, CC BY 4.0. Third-party data retains its own licence, noted per source.
