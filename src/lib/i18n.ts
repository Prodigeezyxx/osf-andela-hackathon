/* ═══════════════════════════════════════════════════════════════
   Interface strings.

   Only strings marked "reviewed" are shown as translated. Anything
   awaiting a native speaker is present in the pack metadata and
   labelled as such, rather than being machine-translated and passed
   off as a localisation. A wrong translation on a trust product is
   worse than an honest English fallback.
   ═══════════════════════════════════════════════════════════════ */

export interface UIStrings {
  tagline: string;
  search: string;
  searchPlaceholder: string;
  layers: string;
  allLayers: string;
  liteMode: string;
  liteModeOn: string;
  mapView: string;
  listView: string;
  lastChecked: string;
  observed: string;
  confidence: string;
  sources: string;
  evidence: string;
  limitations: string;
  nextSteps: string;
  confirm: string;
  dispute: string;
  saysThisIsRight: string;
  saysThisIsWrong: string;
  verified: string;
  noItems: string;
  noItemsBody: string;
  readAloud: string;
  stopReading: string;
  framework: string;
}

const EN: UIStrings = {
  tagline: 'Check what you can trust, then act.',
  search: 'Search',
  searchPlaceholder: 'Try: flood, Band A, NIN, budget',
  layers: 'Layers',
  allLayers: 'Everything',
  liteMode: 'Lite mode',
  liteModeOn: 'Lite mode on',
  mapView: 'Map',
  listView: 'List',
  lastChecked: 'Last checked',
  observed: 'Observed',
  confidence: 'Confidence',
  sources: 'Sources',
  evidence: 'What backs this',
  limitations: 'What this does not tell you',
  nextSteps: 'What to do next',
  confirm: 'I can confirm this',
  dispute: 'This is wrong or out of date',
  saysThisIsRight: 'people confirmed this',
  saysThisIsWrong: 'people reported it out of date',
  verified: 'Verified',
  noItems: 'Nothing published for this country yet',
  noItemsBody:
    'The sources are registered, but no item has been retrieved and cited, so none is published. Every item in this product has a source you can open and a date it was last checked. This is a statement about our limits, not about the country.',
  readAloud: 'Read aloud',
  stopReading: 'Stop',
  framework: 'Base layer: SPSS Readiness Index',
};

export const STRINGS: Record<string, UIStrings> = {
  en: EN,
};

export function t(lang: string): UIStrings {
  return STRINGS[lang] ?? EN;
}
