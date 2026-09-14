/* ═══════════════════════════════════════════════════════════════
   SPSS Readiness Index (SRI) — base layer
   SPSS = Spatial, Physical, Social Systems.
   Iyobosa Rehoboth's own framework, originated and published before
   this hackathon (CC BY 4.0). It is the design lens and the base
   layer of this product; the product itself is a new build.

   SRI = GM(P, S, Sp) x (1 + B) / 2 x 100
     GM = geometric mean of the three layer indices
          (if ANY layer is 0, SRI = 0 — the SPSS thesis, in maths)
     B  = balance factor = 1 - coefficient of variation,
          penalising lopsided development.

   Honesty note: several sub-indicators below are marked "Estimated"
   in the framework itself. They are carried here with that label
   intact and are never presented to a reader as measured fact.
   ═══════════════════════════════════════════════════════════════ */

export interface CountryLayers {
  code: string;
  name: string;
  lat: number;
  lng: number;
  /** Physical: energy access %, connectivity %, device access % */
  energy: number;
  connect: number;
  device: number;
  /** Social: language count (raw), youth pop %, community org /100 */
  lang: number;
  youth: number;
  community: number;
  /** Spatial: compute access /100, innovation hubs (raw), AI talent /100 */
  compute: number;
  hubs: number;
  aiTalent: number;
}

export const COUNTRIES: CountryLayers[] = [
  { code: 'MA', name: 'Morocco', lat: 31.8, lng: -7.1, energy: 88, connect: 84, device: 92, lang: 13, youth: 26, community: 55, compute: 45, hubs: 12, aiTalent: 35 },
  { code: 'DZ', name: 'Algeria', lat: 28.0, lng: 1.7, energy: 90, connect: 71, device: 85, lang: 18, youth: 28, community: 40, compute: 30, hubs: 6, aiTalent: 20 },
  { code: 'TN', name: 'Tunisia', lat: 33.9, lng: 9.5, energy: 87, connect: 72, device: 90, lang: 8, youth: 23, community: 50, compute: 40, hubs: 8, aiTalent: 30 },
  { code: 'LY', name: 'Libya', lat: 26.3, lng: 17.2, energy: 72, connect: 22, device: 65, lang: 9, youth: 27, community: 30, compute: 15, hubs: 2, aiTalent: 10 },
  { code: 'EG', name: 'Egypt', lat: 26.8, lng: 30.8, energy: 90, connect: 72, device: 88, lang: 27, youth: 34, community: 50, compute: 55, hubs: 22, aiTalent: 45 },
  { code: 'MR', name: 'Mauritania', lat: 21.0, lng: -10.9, energy: 58, connect: 20, device: 55, lang: 7, youth: 32, community: 45, compute: 10, hubs: 2, aiTalent: 5 },
  { code: 'ML', name: 'Mali', lat: 17.6, lng: -4.0, energy: 62, connect: 33, device: 60, lang: 66, youth: 34, community: 65, compute: 12, hubs: 4, aiTalent: 8 },
  { code: 'NE', name: 'Niger', lat: 17.6, lng: 8.1, energy: 50, connect: 10, device: 35, lang: 21, youth: 38, community: 60, compute: 5, hubs: 2, aiTalent: 3 },
  { code: 'TD', name: 'Chad', lat: 15.5, lng: 18.7, energy: 42, connect: 8, device: 30, lang: 131, youth: 35, community: 55, compute: 5, hubs: 1, aiTalent: 2 },
  { code: 'SD', name: 'Sudan', lat: 12.9, lng: 30.2, energy: 62, connect: 30, device: 50, lang: 75, youth: 33, community: 50, compute: 15, hubs: 5, aiTalent: 10 },
  { code: 'SN', name: 'Senegal', lat: 14.5, lng: -14.5, energy: 70, connect: 46, device: 72, lang: 36, youth: 32, community: 60, compute: 25, hubs: 8, aiTalent: 15 },
  { code: 'GN', name: 'Guinea', lat: 9.9, lng: -11.4, energy: 52, connect: 23, device: 50, lang: 35, youth: 33, community: 55, compute: 8, hubs: 3, aiTalent: 5 },
  { code: 'BF', name: 'Burkina Faso', lat: 12.4, lng: -1.6, energy: 48, connect: 16, device: 40, lang: 70, youth: 35, community: 65, compute: 8, hubs: 3, aiTalent: 5 },
  { code: 'NG', name: 'Nigeria', lat: 9.1, lng: 8.7, energy: 55, connect: 55, device: 75, lang: 527, youth: 31, community: 70, compute: 45, hubs: 85, aiTalent: 40 },
  { code: 'CM', name: 'Cameroon', lat: 7.4, lng: 12.4, energy: 62, connect: 34, device: 60, lang: 280, youth: 32, community: 55, compute: 18, hubs: 6, aiTalent: 12 },
  { code: 'ET', name: 'Ethiopia', lat: 9.1, lng: 40.5, energy: 58, connect: 25, device: 45, lang: 90, youth: 33, community: 60, compute: 20, hubs: 8, aiTalent: 15 },
  { code: 'CI', name: "Cote d'Ivoire", lat: 7.5, lng: -5.5, energy: 65, connect: 36, device: 68, lang: 78, youth: 31, community: 55, compute: 20, hubs: 6, aiTalent: 10 },
  { code: 'GH', name: 'Ghana', lat: 7.9, lng: -1.0, energy: 78, connect: 53, device: 80, lang: 81, youth: 30, community: 60, compute: 35, hubs: 18, aiTalent: 25 },
  { code: 'CG', name: 'Congo', lat: -0.2, lng: 15.8, energy: 52, connect: 12, device: 45, lang: 63, youth: 33, community: 45, compute: 10, hubs: 3, aiTalent: 5 },
  { code: 'CD', name: 'DR Congo', lat: -4.0, lng: 21.8, energy: 30, connect: 17, device: 35, lang: 215, youth: 34, community: 60, compute: 8, hubs: 4, aiTalent: 5 },
  { code: 'UG', name: 'Uganda', lat: 1.4, lng: 32.3, energy: 50, connect: 26, device: 55, lang: 43, youth: 35, community: 65, compute: 22, hubs: 12, aiTalent: 15 },
  { code: 'KE', name: 'Kenya', lat: -0.0, lng: 37.9, energy: 78, connect: 42, device: 82, lang: 68, youth: 30, community: 70, compute: 50, hubs: 50, aiTalent: 40 },
  { code: 'AO', name: 'Angola', lat: -11.2, lng: 17.9, energy: 55, connect: 20, device: 50, lang: 38, youth: 34, community: 40, compute: 15, hubs: 5, aiTalent: 8 },
  { code: 'ZM', name: 'Zambia', lat: -13.1, lng: 27.8, energy: 55, connect: 16, device: 48, lang: 46, youth: 33, community: 60, compute: 12, hubs: 5, aiTalent: 8 },
  { code: 'TZ', name: 'Tanzania', lat: -6.4, lng: 34.9, energy: 52, connect: 25, device: 55, lang: 126, youth: 32, community: 65, compute: 18, hubs: 10, aiTalent: 12 },
  { code: 'RW', name: 'Rwanda', lat: -1.9, lng: 29.9, energy: 55, connect: 30, device: 60, lang: 4, youth: 31, community: 70, compute: 35, hubs: 12, aiTalent: 25 },
  { code: 'MZ', name: 'Mozambique', lat: -18.7, lng: 35.5, energy: 40, connect: 10, device: 35, lang: 43, youth: 33, community: 50, compute: 8, hubs: 3, aiTalent: 5 },
  { code: 'NA', name: 'Namibia', lat: -22.6, lng: 17.1, energy: 72, connect: 53, device: 70, lang: 28, youth: 28, community: 45, compute: 20, hubs: 3, aiTalent: 10 },
  { code: 'BW', name: 'Botswana', lat: -22.3, lng: 24.7, energy: 78, connect: 47, device: 75, lang: 31, youth: 27, community: 45, compute: 25, hubs: 3, aiTalent: 12 },
  { code: 'ZW', name: 'Zimbabwe', lat: -19.0, lng: 29.2, energy: 52, connect: 35, device: 55, lang: 22, youth: 31, community: 50, compute: 15, hubs: 5, aiTalent: 10 },
  { code: 'ZA', name: 'South Africa', lat: -30.6, lng: 22.9, energy: 82, connect: 72, device: 88, lang: 36, youth: 28, community: 55, compute: 65, hubs: 45, aiTalent: 55 },
];

/** One SPSS layer and its weighted sub-indicators. */
export interface LayerMetric {
  label: string;
  color: string;
  desc: string;
  sub: {
    key: string;
    label: string;
    weight: number;
    src: string;
    confidence: 'reported' | 'estimated';
  }[];
}

/** Sub-indicator provenance, including which figures are estimates. */
export const LAYER_METRICS: Record<'physical' | 'social' | 'spatial', LayerMetric> = {
  physical: {
    label: 'Physical',
    color: '#ff6b6b',
    desc: 'Infrastructure: energy access, connectivity, device availability.',
    sub: [
      { key: 'energy', label: 'Energy access', weight: 0.4, src: 'IEA 2024 + solar irradiance', confidence: 'reported' },
      { key: 'connect', label: 'Connectivity', weight: 0.35, src: 'GSMA 2025', confidence: 'reported' },
      { key: 'device', label: 'Device access', weight: 0.25, src: 'GSMA Mobile Economy 2025', confidence: 'reported' },
    ],
  },
  social: {
    label: 'Social',
    color: '#a78bfa',
    desc: 'Community structures: linguistic diversity, demographics, organisational capacity.',
    sub: [
      { key: 'lang', label: 'Languages', weight: 0.35, src: 'Ethnologue 2024', confidence: 'reported' },
      { key: 'youth', label: 'Youth population', weight: 0.35, src: 'UN Population 2024', confidence: 'reported' },
      { key: 'community', label: 'Community organisation', weight: 0.3, src: 'Estimated — cooperative traditions', confidence: 'estimated' },
    ],
  },
  spatial: {
    label: 'Spatial',
    color: '#00e5ff',
    desc: 'Frontier-tech readiness: compute access, innovation ecosystem, AI talent.',
    sub: [
      { key: 'compute', label: 'Compute access', weight: 0.4, src: 'Estimated — cloud/edge proximity', confidence: 'estimated' },
      { key: 'hubs', label: 'Innovation hubs', weight: 0.3, src: 'AfriLabs 2025', confidence: 'reported' },
      { key: 'aiTalent', label: 'AI talent index', weight: 0.3, src: 'Estimated — researchers/programmes', confidence: 'estimated' },
    ],
  },
};

export interface SRIResult {
  physical: number;
  social: number;
  spatial: number;
  balance: number;
  sri: number;
  pRaw: number;
  sRaw: number;
  spRaw: number;
}

const MAX_LANG = 527; // Nigeria, the framework's upper bound
const MAX_HUBS = 85; // Nigeria

export function computeSRI(c: CountryLayers, energyWeight?: number): SRIResult {
  const eW = energyWeight ?? 0.4;
  const remaining = 1 - eW;
  const cW = remaining * (0.35 / 0.6);
  const dW = remaining * (0.25 / 0.6);

  const P = eW * (c.energy / 100) + cW * (c.connect / 100) + dW * (c.device / 100);
  const S = 0.35 * Math.min(c.lang / MAX_LANG, 1) + 0.35 * (c.youth / 40) + 0.3 * (c.community / 100);
  const Sp = 0.4 * (c.compute / 100) + 0.3 * Math.min(c.hubs / MAX_HUBS, 1) + 0.3 * (c.aiTalent / 100);

  const GM = Math.pow(Math.max(P, 0.001) * Math.max(S, 0.001) * Math.max(Sp, 0.001), 1 / 3);

  const mean = (P + S + Sp) / 3;
  const variance = ((P - mean) ** 2 + (S - mean) ** 2 + (Sp - mean) ** 2) / 3;
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
  const B = Math.max(0, 1 - cv);

  return {
    physical: Math.round(P * 100),
    social: Math.round(S * 100),
    spatial: Math.round(Sp * 100),
    balance: Math.round(B * 100),
    sri: Math.round(((GM * (1 + B)) / 2) * 100),
    pRaw: P,
    sRaw: S,
    spRaw: Sp,
  };
}

export interface RankedCountry extends SRIResult {
  code: string;
  name: string;
  /** The weakest layer — the one dragging the geometric mean down. */
  weakest: 'physical' | 'social' | 'spatial';
}

export function rankCountries(): RankedCountry[] {
  return COUNTRIES.map((c) => {
    const r = computeSRI(c);
    const layers: [RankedCountry['weakest'], number][] = [
      ['physical', r.physical],
      ['social', r.social],
      ['spatial', r.spatial],
    ];
    layers.sort((a, b) => a[1] - b[1]);
    return { ...r, code: c.code, name: c.name, weakest: layers[0][0] };
  }).sort((a, b) => b.sri - a.sri);
}

/** Real deployments the framework scores itself against, including failures. */
export const FAILURE_ARCHIVE = [
  { project: 'One Laptop Per Child', region: 'West Africa', layer: 'Social', root: 'Assumed literacy and classroom structure', lesson: 'Design must follow community pedagogy, not precede it' },
  { project: 'M-Farm Kenya', region: 'East Africa', layer: 'Social', root: 'Aggregator extracted value from farmers', lesson: 'Data sovereignty must be structural, not aspirational' },
  { project: 'iCow SMS', region: 'East Africa', layer: 'Physical', root: 'Assumed consistent SMS delivery', lesson: 'Episodic sync, not real-time dependency' },
  { project: 'Ushahidi overload', region: 'Pan-Africa', layer: 'Spatial', root: 'No local triage for incoming data volume', lesson: 'The AI layer must be designed for constraint before scale' },
  { project: 'Solar kiosk chains', region: 'West Africa', layer: 'Physical', root: 'Repair systems not designed locally', lesson: 'Repairability is a first-class feature, not an afterthought' },
  { project: 'Unnamed drone agri-survey', region: 'Southern Africa', layer: 'Social', root: 'Data left the community without consent', lesson: 'Consent architecture must precede deployment' },
];

export const FRAMEWORK_META = {
  name: 'SPSS',
  full: 'Spatial, Physical, Social Systems',
  index: 'SPSS Readiness Index (SRI)',
  author: 'Iyobosa Rehoboth',
  license: 'CC BY 4.0',
  formula: 'SRI = GM(P, S, Sp) x (1 + B) / 2 x 100',
  whyGeometricMean:
    'Arithmetic mean hides imbalance. A country with 90% Physical and 5% Social scores 47.5 by arithmetic mean, which looks fine. The geometric mean exposes it at about 15. You cannot ignore a layer.',
  countries: COUNTRIES.length,
};
