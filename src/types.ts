/* ═══════════════════════════════════════════════════════════════
   Ukweli — trust model
   The whole product is this file made visible: an item is only
   publishable if it carries a source, a date, an honest statement
   of what it does NOT tell you, and a next step.
   ═══════════════════════════════════════════════════════════════ */

/** How much weight a reader should put on an item, in plain terms. */
export type Confidence = 'verified' | 'reported' | 'estimated' | 'disputed';

/** The three civic layers in the first slice. */
export type LayerId = 'services' | 'outages' | 'alerts';

export type SourceKind = 'primary' | 'official' | 'ngo' | 'media' | 'dataset';

/** A source is registered once and referenced by id from many items. */
export interface Source {
  id: string;
  publisher: string;
  title: string;
  url: string;
  /** ISO date the source was published, if the source states one. */
  publishedAt?: string;
  /** ISO date we last retrieved it. */
  retrievedAt: string;
  kind: SourceKind;
  license?: string;
  /** What a reader should know about this source before leaning on it. */
  caveat?: string;
}

/** The action a reader can take. No item ships without at least one. */
export interface NextStep {
  label: string;
  detail?: string;
  url?: string;
  contact?: string;
}

export interface TrustItem {
  id: string;
  layer: LayerId;
  /** One line, plain language, no jargon — readable aloud. */
  plain: string;
  /** A short paragraph expanding the claim. */
  body: string;
  /** Source ids. Must be non-empty; enforced by tests. */
  sources: string[];
  /** When the underlying event or figure was observed. */
  observedAt: string;
  /** When a human or agent last checked the source still says this. */
  lastCheckedAt: string;
  confidence: Confidence;
  /** What backs the claim. */
  evidence: string[];
  /** What this claim does NOT tell you. Required honesty, not optional. */
  limitations: string[];
  nextSteps: NextStep[];
  /** Optional state scoping, matching the shapeName in the state geometry. */
  states?: string[];
  /** Community confirmations. Local-only in this build; no accounts. */
  confirmations: { confirm: number; dispute: number };
  tags?: string[];
}

export interface CountryPack {
  code: string;
  /** Name as used in the interface. */
  name: string;
  /** What the pack is called inside itself, when localising. */
  localName?: string;
  languages: { code: string; label: string; status: 'reviewed' | 'needs-native-review' }[];
  currency: string;
  /** Registered sources — including ones with no published item yet. */
  sources: Source[];
  items: TrustItem[];
  /** Plain statement of what this pack covers and where its edges are. */
  coverageNote: string;
  /** Registry of public bodies a reader can escalate to. */
  escalation: NextStep[];
}

export const LAYERS: {
  id: LayerId;
  label: string;
  plain: string;
  color: string;
}[] = [
  {
    id: 'services',
    label: 'Public services',
    plain: 'How to get a government service, and what it should cost you.',
    color: '#5eead4',
  },
  {
    id: 'outages',
    label: 'Service failures',
    plain: 'Power and utility failures, and how to get them fixed or refunded.',
    color: '#fca5a5',
  },
  {
    id: 'alerts',
    label: 'Verified alerts',
    plain: 'Official warnings that affect where you live.',
    color: '#fcd34d',
  },
];

export const CONFIDENCE_META: Record<
  Confidence,
  { label: string; plain: string; color: string }
> = {
  verified: {
    label: 'Verified',
    plain: 'A primary or official document states this, and we checked it on the date shown.',
    color: '#5eead4',
  },
  reported: {
    label: 'Reported',
    plain: 'Credible reporting says this, but we have not yet retrieved the original document.',
    color: '#fcd34d',
  },
  estimated: {
    label: 'Estimated',
    plain: 'This is a modelled or estimated figure, not a measurement.',
    color: '#c4b5fd',
  },
  disputed: {
    label: 'Disputed',
    plain: 'Sources disagree. Both sides are shown.',
    color: '#fca5a5',
  },
};
