/* ═══════════════════════════════════════════════════════════════
   2026 flood risk geography — Nigeria
   Source: the 2026 Annual Flood Outlook (AFO), presented by NIHSA,
   as reported on 16 April 2026. Primary document not retrieved;
   these lists are as published in press reporting of the release
   and corroborated by NEMA's own summary.

   IMPORTANT, and shown to the user: the tiers OVERLAP. A single
   state can hold high-risk, moderate-risk and minimal-risk
   communities at the same time. The state fill on the map therefore
   shows the HIGHEST tier recorded for that state, not an average
   and not a prediction about any one community.
   ═══════════════════════════════════════════════════════════════ */

export type RiskTier = 'high' | 'moderate' | 'minimal';

/** 33 states plus the FCT, named in the AFO release. */
export const HIGH_RISK: string[] = [
  'Abia',
  'Adamawa',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'Abuja Federal Capital Territory',
];

/** States with moderate-risk communities but no high-risk communities named. */
export const MODERATE_ONLY: string[] = ['Akwa Ibom', 'Katsina'];

/** The one state the AFO excluded from the moderate-risk tier. */
export const EXCLUDED_FROM_MODERATE: string[] = ['Ekiti'];

export const COASTAL_EXPOSED: string[] = [
  'Bayelsa',
  'Cross River',
  'Delta',
  'Lagos',
  'Ogun',
  'Rivers',
  'Ondo',
];

export const URBAN_FLASH_CITIES: string[] = [
  'Abakaliki',
  'Abeokuta',
  'Abuja',
  'Asaba',
  'Benin City',
  'Birnin-Kebbi',
  'Calabar',
  'Ibadan',
  'Kaduna',
  'Kano',
  'Lagos',
  'Makurdi',
  'Nguru',
  'Onitsha',
  'Osogbo',
  'Port Harcourt',
  'Sokoto',
  'Warri',
  'Yola',
];

export const FLOOD_TIERS = {
  high: { communities: 14118, lgas: 266, states: 33, includesFct: true },
  moderate: { communities: 15597, lgas: 405, states: 35, note: 'only Ekiti excluded' },
  minimal: { communities: 923, lgas: 77, states: 24 },
} as const;

/** Highest tier recorded for a state. Never an average. */
export function tierForState(stateName: string): RiskTier {
  if (HIGH_RISK.includes(stateName)) return 'high';
  if (MODERATE_ONLY.includes(stateName)) return 'moderate';
  return 'minimal';
}

export const TIER_LABEL: Record<RiskTier, string> = {
  high: 'High risk recorded',
  moderate: 'Moderate risk, no high-risk communities named',
  minimal: 'Not named in the high or moderate tiers',
};

export const TIER_COLOR: Record<RiskTier, string> = {
  high: '#fca5a5',
  moderate: '#fcd34d',
  minimal: '#3f4652',
};

export const FLOOD_SOURCE_NOTE =
  'Lists as published in reporting of the 2026 Annual Flood Outlook release on 16 April 2026, corroborated by NEMA. The outlook document itself was not retrieved in this build.';
