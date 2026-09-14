# Ukweli — specification

Phase 2 deliverable (D2 on the plan), written 14 Sep 2026. Everything here is
either implemented in the working build in `src/`, or listed under *deliberately
not built*. Nothing is aspirational without being labelled.

---

## 1. Decision record — 14 Sep

The plan had idea lock and spec falling on 12–13 Sep. Both slipped two days. On
14 Sep the following were locked so that build could start the same session.

| Decision | Value | Where it came from |
| --- | --- | --- |
| Track | Cross-track: Stability & Social Cohesion + Transparency & Accountability | Already decided 11 Sep (`docs/strategy.md`). One submission, not two. |
| Identity | Not "World Monitor for Africa". A **civic trust layer** where provenance is the product | `docs/refit-worldmonitor.md`, written 11 Sep |
| Anchor country | **Nigeria** | The working direction named Kenya / Nigeria / DRC. Nigeria won on velocity: the state geometry was already held locally (pulled 11 Sep) and the domain knowledge is the author's own. |
| First three layers | Public services · service failures · verified alerts | The refit doc's default MVP slice |
| Base layer | SPSS Readiness Index, 31 African countries | Author's own pre-hackathon framework, CC BY 4.0 |
| Working name | **Ukweli** (Kiswahili: truth) | A working name, chosen to travel beyond one country because country packs are the scalability claim. Held in one place in the UI; swapping it is a trivial edit. |
| Scope cut-line | One country, three layers, 8 verified items, provenance on every item, a community check loop, a lite mode, deployed | Refit doc MVP slice, enforced |

**Deliberately not AI-generated:** the capstone idea. The brief forbids using AI
to generate it and the trail is visible — SPSS was originated and published
before the sprint; the refit and track decisions are in commits from 11 Sep; the
first thoughts log is dated. AI tools built this, they did not conceive it.

---

## 2. The user

**Primary.** A Nigerian adult who is affected by a public service and does not
know what is true or who to tell. Concretely: a Band A electricity customer in
Lagos or Kano who has had power well below the 20 hours a day their band promises,
who has heard they are owed compensation, and who has no idea whether that is
true or who to ask. Or a resident of one of the 266 LGAs in the 2026 high
flood-risk tier who wants to know what the warning actually says.

**Their constraints, treated as design requirements.** Mobile-first, often on a
2G/3G drop. Data is a real cost. Reading a long English document is not always
the fastest way to take in information. They may be doing this one-handed, or
listening rather than reading. They may be handed a link by someone else.

**Secondary.** A local watchdog, a journalist, or a ward-level official who needs
to show someone else where a claim comes from.

**Explicitly not the user.** A global analyst. That is World Monitor's user, and
chasing them is how this becomes a derivative map clone.

---

## 3. User journey

1. **Arrive.** The list. No login, no cookie banner, no onboarding. The first
   thing read is a real claim in plain language with a confidence badge.
2. **Filter.** By civic layer, or search. Flood, Band A, NIN, budget.
3. **Read one line.** Every item leads with a plain-language sentence written to
   be understood by listening: *"If you are on Band A and lost power for long
   stretches earlier this year, your distribution company has been ordered to pay
   you back."*
4. **Open it.** The drawer shows observed date, last-checked date, every source
   with its own caveat and a live link, what backs the claim, and — the part
   nobody else ships — **a heading that says what this does not tell you**.
5. **Act.** Numbered next steps, each with a URL or a contact. For Band A that
   means asking the DisCo in writing, then escalating to the NERC Forum, then to
   NERC head office, with the numbers flagged as press-sourced and needing
   confirmation on NERC's own page.
6. **Check us.** Confirm the item or report it out of date. Stored in the browser
   only.
7. **Or listen.** Read aloud, using the device's own voice, offline, for free.

---

## 4. Architecture

```
        index.html  →  main.tsx  →  App.tsx
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
   data/packs/                   components/                    lib/
   nigeria.ts (full)             TrustCard    ItemDetail        i18n.ts
   kenya.ts   (wired, empty)     LayerRail    RiskMap           useConfirmations
   index.ts   (registry)         SriPanel                        useReadAloud
        │                             │
   data/sri.ts                   public/data/ng-states.geojson
   data/flood-risk.ts            (geoBoundaries/GRID3, CC BY 4.0)
```

- **Vite + React + TypeScript + plain CSS.** No UI framework, no CSS-in-JS,
  no Tailwind. Design tokens are CSS custom properties.
- **No backend, no API keys, no accounts.** The packs are TypeScript modules
  compiled into the bundle. The geometry is one static file. This is why the
  demo cannot fail on a network call, and why there is no personal data to leak.
- **Renderer ladder.** Map view is a progressive enhancement over the list. Lite
  mode turns it off entirely. A reader on a basic device gets the same
  information, not a degraded subset of it.
- **Offline-first.** `vite-plugin-pwa` precaches 9 entries (~290 KB). Installable.

### Why React

Shared reactive state across four interacting surfaces: active layer, search,
lite mode, view, selected item, selected state, and the confirmation store. The
alternative — vanilla TS like the `intel` precedent — was considered and would
have been defensible, but the state tree here is real, and the bundle is 64 KB
gzipped either way.

---

## 5. Trust model

The core of the product is `src/types.ts`. The enforced rule is that an item
cannot exist without a source, and the required honesty is that it cannot exist
without stating its limits.

| Field | Why it exists | Constraint it answers |
| --- | --- | --- |
| `plain` | One line, no jargon, written to be read aloud | Accessibility, oral-first |
| `sources[]` | Ids into registered sources; each has publisher, URL, kind, retrieved date, and its own caveat | Trust & verification |
| `observedAt` | When the event or figure dates from | Trust |
| `lastCheckedAt` | When the sources were last opened | "show when info was last updated" |
| `confidence` | verified / reported / estimated / disputed, explained in plain words to the reader | Trust |
| `evidence[]` | What specifically backs the claim | Trust |
| `limitations[]` | What the claim does **not** tell you. Required | Honesty. The differentiator |
| `nextSteps[]` | What to do, with URL or contact | "Clear next steps" |
| `states[]` | Where it applies, matched to the geometry | Local relevance |
| `confirmations` | Community confirm / dispute, local-only | Community verification |

**How the four tiers are actually used in this corpus.** The NERC escalation path
is `verified` because it is on `nerc.gov.ng`. The NERC compensation directive is
`reported` because two outlets describe Directive No. NERC/2026/002 but we did
not retrieve the directive. The flood outlook is `reported` because the tier
counts come from NEMA's summary and the state list from press reporting of the
AFO presentation, not from the report. The SPSS sub-indicators that the framework
itself marks as estimates are shown as `estimated` in the framework view.

**Verification path for a judge.** Open any item, click the source, read the
same sentence in the source. Every item is checkable in under a minute. That is
the claim.

---

## 6. Data sources and the claim audit

Eight published items. Thirteen registered sources in the Nigeria pack. Two
registered sources with no published item in Kenya.

| # | Item | Layer | Confidence | Backing | Not retrieved |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 flood outlook, three tiers and the named states | alerts | reported | NIHSA AFO listing; NEMA summary; press reporting of the AFO release | The AFO document |
| 2 | NiMet Seasonal Climate Prediction 2026 and NEMA's anticipatory action | alerts | reported | NEMA's own account; press reporting | The SCP document |
| 3 | Band A compensation under Directive No. NERC/2026/002 | outages | reported | AIT Live; Economy Post | The directive |
| 4 | NERC complaints and redress escalation path | outages | **verified** | nerc.gov.ng (path) + press guide (contacts, flagged) | — |
| 5 | NIN pre-enrolment then biometrics at a centre | services | **verified** | services.gov.ng; nimc.gov.ng | The fee schedule |
| 6 | Tracka constituency project lookup | services | **verified** | yourtracka.org; budgit.org | — |
| 7 | Federal spending as open data | services | **verified** | budgetnigeria.ng | API stability |
| 8 | NBS CPI releases — **no figure stated on purpose** | services | **verified** | nigerianstat.gov.ng eLibrary | The current release |

Tier totals from the outlook: high — 14,118 communities, 266 LGAs, 33 states plus
the FCT; moderate — 15,597 communities, 405 LGAs, 35 states, only Ekiti excluded;
minimal — 923 communities, 77 LGAs, 24 states. High-risk states as reported:
Abia, Adamawa, Anambra, Bauchi, Bayelsa, Benue, Borno, Cross River, Delta,
Ebonyi, Edo, Enugu, Gombe, Imo, Jigawa, Kaduna, Kano, Kebbi, Kogi, Kwara, Lagos,
Nasarawa, Niger, Ogun, Ondo, Osun, Oyo, Plateau, Rivers, Sokoto, Taraba, Yobe,
Zamfara and the FCT.

**The tier-overlap rule.** Tiers overlap inside a single state: a high-risk state
also holds moderate and minimal risk communities. The map therefore shades each
state by the **highest** tier recorded, states this in the legend, and says in the
click panel that this is not an average and not a forecast for any one community.
A map that looks more certain than its source is the failure mode this product
exists to correct, so the rule is stated wherever the map is read.

---

## 7. Scalability

Adding a country or community is: **one data file + one pack file. Zero engine
changes.** Kenya is wired in to prove it rather than assert it, with its sources
registered and no items published.

The honest position, stated in the interface: an empty pack that explains why it
is empty is the trust model working. Showing placeholder rows for a country we
have not verified would be the exact thing we criticise.

What scales cheaply: the pack schema, the provenance model, the renderer ladder,
the i18n mechanism, the PWA cache.

What does not scale for free, and must be said in the pitch: **verification is
human labour.** Someone has to retrieve each source, read it, and decide the
confidence tier. The engine makes that labour cheap and visible; it does not
remove it. That is the true cost of scaling this, and claiming otherwise would be
dishonest.

---

## 8. Deliberately not built

Named here so nothing reads as an oversight.

- **No live feeds.** Outage and alert data is not openly available from Nigerian
  utilities as a machine-readable stream. We ship a verified, dated corpus plus
  the source register, and say so. We do not draw a fake live ticker.
- **No state or local government layer.** Federal only, so far.
- **No water, health or waste layers.** Electricity, flood and services first.
- **No accounts, no server-side confirmations.** Privacy by architecture. A real
  deployment would need a tamper-resistant verification store, which is a
  governance decision, not a first-week build.
- **No SMS or USSD channel.** The honest gap for the oral-first, feature-phone
  user the design targets. The lite text tier is built for that channel; the
  channel itself is stretch.
- **No 3D globe.** Explicit *leave* decision from the World Monitor teardown.
- **No machine translation.** The mechanism ships; unreviewed strings are
  labelled, not guessed.

---

## 9. Build plan to the deadline

| Date | Plan |
| --- | --- |
| **Mon 14 Sep** (done) | Spec + trust model + Nigeria pack + working app + verified build. This session. |
| **Tue 15 Sep** | Grow the corpus to ~14 items. Retrieve the AFO and NERC/2026/002 documents and upgrade them from `reported` to `verified`. Add a state-scoped item set. |
| **Wed 16 Sep** | Kenya pack to first items. Community confirmation loop reviewed. Lite mode tested on a throttled connection. |
| **Thu 17 Sep** | Deploy. Cold review against the rubric. Fix the gaps it finds. |
| **Fri 18 Sep** | **Submission v1 up** — all four deliverables, drafts allowed. Script and record the demo video. |
| **Sat 19 Sep** | Deck to PDF. Written summary final. |
| **Sun 20 Sep** | Buffer. Honest read-through for AI-slop. |
| **Mon 21 Sep** | Final check, submit by 15:00 UTC, well ahead of 23:59. |

**Risks.** Verification is the bottleneck, not coding — D4 is the long pole and
document retrieval is what closes it. Video and deck must not slip past D7, since
v1 goes up that day.
