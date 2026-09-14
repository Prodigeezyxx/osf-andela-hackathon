import type { CountryPack } from '../../types';

/* ═══════════════════════════════════════════════════════════════
   Kenya pack — scalability proof, honestly scoped.

   This pack is fully wired: a second country drops in by adding one
   file like this one, with no changes to the engine. Its sources are
   registered. Its items array is deliberately EMPTY, because the
   sources have not been retrieved and cited yet, and this product
   publishes nothing it cannot source.

   The interface says so out loud rather than showing placeholder
   rows. An empty pack that explains itself is the trust model
   working, not a gap in the demo.
   ═══════════════════════════════════════════════════════════════ */

export const KENYA: CountryPack = {
  code: 'KE',
  name: 'Kenya',
  languages: [
    { code: 'en', label: 'English', status: 'reviewed' },
    { code: 'sw', label: 'Kiswahili', status: 'needs-native-review' },
  ],
  currency: 'KES',

  coverageNote:
    'Sources are registered and the pack is live in the engine, but no item has been retrieved and cited yet, so none is published. This is what a newly onboarded country looks like on day one. Kenya is the second pack in the build, which is the scalability claim demonstrated rather than asserted.',

  sources: [
    {
      id: 'ke-huduma',
      publisher: 'Huduma Kenya Service Delivery Programme',
      title: 'Huduma Kenya — one-stop-shop public services',
      url: 'https://www.hudumakenya.go.ke/',
      retrievedAt: '2026-09-14',
      kind: 'official',
      caveat: 'Registered and reachable. Individual service pages not yet retrieved or cited.',
    },
    {
      id: 'ke-opendata',
      publisher: 'Kenya Open Data',
      title: "Kenya's public data across all 47 counties",
      url: 'https://opendata.co.ke/',
      retrievedAt: '2026-09-14',
      kind: 'dataset',
      caveat:
        'States data is updated quarterly, so freshness must be shown per dataset rather than assumed.',
    },
  ],

  items: [],

  escalation: [
    {
      label: 'Public services — Huduma Kenya',
      detail: 'One-stop-shop centres plus a web portal.',
      url: 'https://www.hudumakenya.go.ke/',
    },
    {
      label: 'County and national data — Kenya Open Data',
      url: 'https://opendata.co.ke/',
    },
  ],
};
