import type { CountryPack } from '../../types';
import { HIGH_RISK } from '../flood-risk';

/* ═══════════════════════════════════════════════════════════════
   Nigeria pack — the first full slice.

   Rule for this file: an item exists only if at least one source in
   SOURCES backs it, the retrieval date is real, and the limitations
   field says what we could NOT confirm. Items we could not source
   are not in this file yet — that is the point, not an oversight.
   ═══════════════════════════════════════════════════════════════ */

const RETRIEVED = '2026-09-14';

export const NIGERIA: CountryPack = {
  code: 'NG',
  name: 'Nigeria',
  languages: [
    { code: 'en', label: 'English', status: 'reviewed' },
    { code: 'pcm', label: 'Nigerian Pidgin', status: 'needs-native-review' },
    { code: 'ha', label: 'Hausa', status: 'needs-native-review' },
    { code: 'ig', label: 'Igbo', status: 'needs-native-review' },
    { code: 'yo', label: 'Yoruba', status: 'needs-native-review' },
  ],
  currency: 'NGN',

  coverageNote:
    'This pack covers federal-level Nigerian public services, power supply failures and official seasonal alerts. It does not yet cover state or local government services, water, or health facilities. Items are added only when a source can be retrieved and cited; the corpus is deliberately small and grows daily.',

  sources: [
    {
      id: 'nihsa-afo-2026',
      publisher: 'Nigeria Hydrological Services Agency (NIHSA)',
      title: 'Annual Flood Outlook (AFO)',
      url: 'https://nihsa.gov.ng/products/3',
      publishedAt: '2026-04-01',
      retrievedAt: RETRIEVED,
      kind: 'official',
      caveat:
        'The outlook is listed on NIHSA publications with an April 2026 date. The report PDF itself was not downloaded and parsed in this build.',
    },
    {
      id: 'nema-flood-2026',
      publisher: 'National Emergency Management Agency (NEMA)',
      title: 'NEMA and 2026 Flood Alerts: Towards Disaster Mitigation',
      url: 'https://nema.gov.ng/nema-and-2026-flood-alerts-towards-disaster-mitigation/',
      retrievedAt: RETRIEVED,
      kind: 'official',
      caveat: 'An agency summary of the NIHSA outlook, not the outlook itself.',
    },
    {
      id: 'nation-nimet-2026',
      publisher: 'The Nation (reporting NiMet)',
      title: 'Nigeria and 2026 flood outlook',
      url: 'https://thenationonlineng.net/nigeria-and-2026-flood-outlook/',
      retrievedAt: RETRIEVED,
      kind: 'media',
      caveat: 'Press reporting. NiMet\u2019s own Seasonal Climate Prediction was not retrieved.',
    },
    {
      id: 'journal-afo-2026',
      publisher: 'The Journal Nigeria',
      title: 'FG Flood Alert Lists 33 States, FCT As High Risk Zones',
      url: 'https://thejournalnigeria.com/fg-flood-alert-lists-33-states-fct-as-high-risk-zones/',
      publishedAt: '2026-04-16',
      retrievedAt: RETRIEVED,
      kind: 'media',
      caveat:
        'The only source we hold that names the individual states. It reports an AFO presentation by NIHSA in Abuja, so it is one step removed from the outlook document.',
    },
    {
      id: 'nerc-redress',
      publisher: 'Nigerian Electricity Regulatory Commission (NERC)',
      title: 'Complaints and Redress Procedure',
      url: 'https://nerc.gov.ng/faq/complaints-and-redress-procedure/',
      retrievedAt: RETRIEVED,
      kind: 'official',
    },
    {
      id: 'legit-nerc-contacts',
      publisher: 'Legit.ng',
      title: 'Step-by-step guide: Filing a complaint against your DisCo with NERC',
      url: 'https://www.legit.ng/business-economy/energy/1720180-step-by-step-guide-filing-a-complaint-disco-nerc/',
      retrievedAt: RETRIEVED,
      kind: 'media',
      caveat:
        'The escalation path is confirmed on nerc.gov.ng. The specific phone numbers and email address come from this press guide, not from NERC directly.',
    },
    {
      id: 'ait-nerc-directive',
      publisher: 'AIT Live',
      title: 'NERC Orders Compensation for Band A Customers',
      url: 'https://ait.live/nerc-orders-compensation-for-band-a-customers/',
      publishedAt: '2026-06-04',
      retrievedAt: RETRIEVED,
      kind: 'media',
      caveat: 'Reports Directive No. NERC/2026/002. The directive itself was not retrieved.',
    },
    {
      id: 'economypost-nerc',
      publisher: 'Economy Post',
      title:
        'NERC orders DisCos to compensate Band A customers for power supply shortfalls',
      url: 'https://economypost.ng/business/energy-and-power/nerc-orders-discos-to-compensate-band-a-customers-for-power-supply-shortfalls/2026/06/04/',
      publishedAt: '2026-06-04',
      retrievedAt: RETRIEVED,
      kind: 'media',
    },
    {
      id: 'nimc-pre-enrol',
      publisher: 'Federal Government of Nigeria — services.gov.ng',
      title: 'NIMC (NIN Pre-Enrollment)',
      url: 'https://services.gov.ng/service-provider/national-identity-management-commission/nimc-nin-pre-enrollment',
      retrievedAt: RETRIEVED,
      kind: 'official',
    },
    {
      id: 'nimc-home',
      publisher: 'National Identity Management Commission (NIMC)',
      title: 'NIMC — manage your National Identification Number',
      url: 'https://nimc.gov.ng/',
      retrievedAt: RETRIEVED,
      kind: 'official',
      caveat:
        'Fee schedules for NIMC services change. The current schedule was not retrieved in this build.',
    },
    {
      id: 'budgetnigeria',
      publisher: 'BudgetNigeria (Federal Ministry of Finance / Budget Office linked)',
      title: 'Government Spending Open Data',
      url: 'https://budgetnigeria.ng/',
      retrievedAt: RETRIEVED,
      kind: 'dataset',
      caveat:
        'The portal states its API and explorer are open for input and still developing. Figures are as published by government, which is not the same as audited.',
    },
    {
      id: 'tracka-docs',
      publisher: 'Tracka (BudgIT Foundation)',
      title: 'Explore documents — projects nominated by your elected representatives',
      url: 'https://www.yourtracka.org/ng/documents',
      retrievedAt: RETRIEVED,
      kind: 'ngo',
      caveat:
        'Citizen-generated monitoring data. Valuable and independent, but not a government record.',
    },
    {
      id: 'budgit-tracka',
      publisher: 'BudgIT Foundation',
      title: 'Tracka — service delivery tracking',
      url: 'https://budgit.org/our_programs/tracka/',
      retrievedAt: RETRIEVED,
      kind: 'ngo',
    },
    {
      id: 'nbs-elibrary',
      publisher: 'National Bureau of Statistics (NBS)',
      title: 'NBS report eLibrary — CPI and inflation releases',
      url: 'https://nigerianstat.gov.ng/elibrary',
      retrievedAt: RETRIEVED,
      kind: 'official',
      caveat:
        'NBS revises methodology and rebases the CPI basket periodically, so month-on-month comparisons across base periods are not valid.',
    },
  ],

  items: [
    /* ── ALERTS ─────────────────────────────────────────────── */
    {
      id: 'ng-flood-outlook-2026',
      layer: 'alerts',
      plain:
        'This rainy season the government has flagged communities in 33 states and the FCT as at high risk of flooding.',
      body:
        'NIHSA publishes an Annual Flood Outlook before each rainy season. The 2026 edition identifies 14,118 communities in 266 local government areas across 33 states and the FCT at high risk, 15,597 communities in 405 LGAs in 35 states at moderate risk, and 923 communities in 77 LGAs in 24 states at minimal risk. Separately, flash and urban flooding is anticipated in named cities including Lagos, Kano, Ibadan, Port Harcourt, Onitsha, Makurdi, Yola and Abuja, and coastal flooding from sea-level rise and tidal surge is expected in Bayelsa, Cross River, Delta, Lagos, Ogun, Rivers and Ondo.',
      sources: ['nihsa-afo-2026', 'nema-flood-2026', 'journal-afo-2026'],
      observedAt: '2026-04-16',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'reported',
      evidence: [
        'NIHSA lists an Annual Flood Outlook for the 2026 rainy season on its publications page, dated April 2026.',
        'NEMA confirms the scale: 14,118 communities in 266 LGAs across 33 states and the FCT at high risk, 15,597 in 405 LGAs at moderate risk, and 923 in 77 LGAs at minimal risk.',
        'The named high-risk states as reported from the AFO presentation are Abia, Adamawa, Anambra, Bauchi, Bayelsa, Benue, Borno, Cross River, Delta, Ebonyi, Edo, Enugu, Gombe, Imo, Jigawa, Kaduna, Kano, Kebbi, Kogi, Kwara, Lagos, Nasarawa, Niger, Ogun, Ondo, Osun, Oyo, Plateau, Rivers, Sokoto, Taraba, Yobe, Zamfara and the FCT.',
        'Akwa Ibom, Ekiti and Katsina are the three states not named in the high-risk tier. The AFO excluded only Ekiti from the moderate tier.',
      ],
      limitations: [
        'The outlook document itself was not retrieved. The tier counts come from NEMA\u2019s own summary, and the state list comes from press reporting of the AFO presentation. Neither was checked against the published report.',
        'The tiers overlap within a state. A state named high risk also holds moderate and minimal risk communities, and a state not named in the high tier still holds moderate risk communities. The map shows the highest tier recorded per state, never an average.',
        'A seasonal outlook is a projection for an area, not a statement about your street. It cannot tell you whether your home will flood.',
        'Risk levels are revised through the season, and the high-risk list in this item is dated April 2026. If you are reading this later, treat the date as the boundary of what is known here.',
      ],
      states: HIGH_RISK,
      nextSteps: [
        {
          label: 'Check whether your LGA is on the list',
          detail: 'The outlook is published state by state.',
          url: 'https://nihsa.gov.ng/products/3',
        },
        {
          label: 'Contact your State Emergency Management Agency (SEMA)',
          detail:
            'Each state runs its own agency. NEMA\u2019s site lists state contacts and the national emergency number.',
          url: 'https://nema.gov.ng/',
        },
        {
          label: 'Act before the peak, not during it',
          detail:
            'Move documents and valuables above ground level, and agree now where your household goes if the road closes.',
        },
      ],
      tags: ['flood', 'seasonal', 'national'],
    },
    {
      id: 'ng-nimet-seasonal-prediction',
      layer: 'alerts',
      plain:
        'The flood warning is built on a separate weather forecast, and both are public before the rains start.',
      body:
        'NiMet released its 2026 Seasonal Climate Prediction ahead of the rains. It projected an early-to-normal onset of rainfall, with normal-to-above-normal rainfall amounts and season duration across many parts of the country. NEMA states that following the release it analysed the forecast and produced guidance for early flood preparedness, that the National Emergency Operations Centre was activated in August, and that the Vice President directed activation of a Fusion and Trigger Room for anticipatory action.',
      sources: ['nation-nimet-2026', 'nema-flood-2026'],
      observedAt: '2026-02-01',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'reported',
      evidence: [
        'NEMA states that NiMet\u2019s 2026 Seasonal Climate Prediction projected early-to-normal onset and normal-to-above-normal rainfall amounts and duration across many parts of the country.',
        'NEMA states the prediction was released in February, that its Director General directed analysis of the forecast, and that the National Emergency Operations Centre was activated in August 2026.',
        'Press reporting states that NIHSA and NiMet released the Annual Flood Outlook for 2026 in the first quarter of the year.',
      ],
      limitations: [
        'This rests on NEMA\u2019s own account and press reporting. NiMet\u2019s Seasonal Climate Prediction document was not retrieved, so the precise phrasing of the forecast is not checked against the original.',
        'This item is about the forecast, not about you. It does not rank your state or community.',
        'Agencies and centres named here exist as described by the agency itself. This product has not independently verified their current operating status.',
      ],
      nextSteps: [
        {
          label: 'Read the seasonal forecast yourself before planting or travelling',
          url: 'https://nihsa.gov.ng/publications/',
        },
      ],
      tags: ['weather', 'seasonal'],
    },

    /* ── OUTAGES ────────────────────────────────────────────── */
    {
      id: 'ng-band-a-compensation',
      layer: 'outages',
      plain:
        'If you are on Band A and lost power for long stretches earlier this year, your distribution company has been ordered to pay you back.',
      body:
        'NERC issued Directive No. NERC/2026/002 directing electricity distribution companies to compensate eligible Band A customers affected by supply shortfalls recorded between February and March 2026, following generation constraints across the sector. The directive is described as a special compensation arrangement.',
      sources: ['ait-nerc-directive', 'economypost-nerc'],
      observedAt: '2026-06-04',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'reported',
      evidence: [
        'AIT Live and Economy Post both report the directive, naming it Directive No. NERC/2026/002 and dating it to June 2026.',
        'Both report the compensation covers shortfalls recorded in February and March 2026.',
      ],
      limitations: [
        'The NERC directive itself was not retrieved. The title, reference number and eligibility terms are as reported by the press.',
        'The exact amount, the eligibility cut-off and the method of compensation are set by NERC and are not stated in the reporting we hold.',
        'A directive is not the same as a payment received. It does not tell you whether your DisCo has applied it to your account.',
      ],
      nextSteps: [
        {
          label: 'Ask your DisCo directly whether your account qualifies',
          detail:
            'Take your meter number and the months you were affected. Ask for the answer in writing.',
        },
        {
          label: 'If the DisCo will not act, escalate to NERC',
          detail:
            'NERC runs a formal escalation path. Start with your DisCo, then the NERC Forum, then NERC head office.',
        },
        {
          label: 'Find your DisCo and its customer care channel',
          detail:
            'Nigeria has several distribution companies by zone. Contact details are on each company\u2019s site.',
        },
      ],
      tags: ['electricity', 'refund', 'band-a'],
    },
    {
      id: 'ng-nerc-complaint-path',
      layer: 'outages',
      plain:
        'There is a formal route to make your power company answer you, and it ends at the regulator.',
      body:
        'NERC\u2019s published Complaints and Redress Procedure sets the order of escalation: raise the complaint with your distribution company first. If you are not satisfied with the outcome, take it to the NERC Forum. If you are still dissatisfied with the Forum\u2019s resolution, you can contact NERC head office, which will review the complaint and the process the DisCo and Forum followed.',
      sources: ['nerc-redress', 'legit-nerc-contacts'],
      observedAt: '2026-09-14',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'verified',
      evidence: [
        'NERC publishes the Complaints and Redress Procedure on its own site, describing the DisCo \u2192 Forum \u2192 head office escalation.',
      ],
      limitations: [
        'The escalation sequence is from nerc.gov.ng and is reliable. The specific phone numbers and the complaints email address are from a press guide, so confirm them on NERC\u2019s own contact page before relying on them.',
        'There are time limits and evidence requirements for Forum complaints. Those rules are in NERC\u2019s regulations, which were not retrieved.',
        'This is the electricity process only. It does not cover water or waste complaints.',
      ],
      nextSteps: [
        {
          label: 'Complain to your DisCo first, and keep the reference number',
          detail:
            'The Forum will ask what the DisCo did. Without a reference number you may be sent back to the start.',
        },
        {
          label: 'Escalate to the NERC Forum if the DisCo fails you',
        },
        {
          label: 'Then to NERC head office',
          detail:
            'Press guide lists 02013444331 and 09088999244, and complaints@nerc.gov.ng. Confirm these on nerc.gov.ng first.',
          url: 'https://nerc.gov.ng/faq/complaints-and-redress-procedure/',
        },
      ],
      tags: ['electricity', 'complaint', 'how-to'],
    },

    /* ── SERVICES ───────────────────────────────────────────── */
    {
      id: 'ng-nin-enrolment',
      layer: 'services',
      plain:
        'You start a National Identification Number online, then finish it in person with your fingerprints.',
      body:
        'The Federal Government\u2019s services portal sets out the NIN process: download and complete the pre-enrolment form online at nimc.gov.ng, then go to the nearest enrolment centre for biometric capture in order to obtain the NIN. NIMC\u2019s own site also lets you manage an existing NIN and use the NINAuth digital identity service.',
      sources: ['nimc-pre-enrol', 'nimc-home'],
      observedAt: '2026-09-14',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'verified',
      evidence: [
        'services.gov.ng, the Federal Government service portal, describes pre-enrolment online followed by biometric capture at an enrolment centre.',
      ],
      limitations: [
        'NIMC charges fees for some services and changes them. This item states no price, because we could not retrieve the current fee schedule.',
        'The portal does not guarantee that an enrolment centre near you is open, staffed or accepting walk-ins. Centre availability varies and is not published as a live feed.',
        'We cannot confirm current waiting times or whether appointments are required.',
      ],
      nextSteps: [
        {
          label: 'Complete the pre-enrolment form',
          url: 'https://nimc.gov.ng/',
        },
        {
          label: 'Find your nearest enrolment centre',
          detail: 'Take the printed form and your supporting documents.',
        },
        {
          label: 'Check the current fee schedule before you travel',
          detail:
            'If you are quoted a price that is not on NIMC\u2019s schedule, ask for the reference before paying.',
        },
      ],
      tags: ['identity', 'nin', 'how-to'],
    },
    {
      id: 'ng-tracka-constituency-projects',
      layer: 'services',
      plain:
        'You can look up the projects your elected representative nominated for your area, and report whether they were built.',
      body:
        'Tracka, run by the BudgIT Foundation, lets citizens find the projects nominated by their elected representatives and their corresponding allocations, and then give feedback on whether delivery happened. It is the same idea as this product: the information exists, and the gap is whether people can reach it and act on it.',
      sources: ['tracka-docs', 'budgit-tracka'],
      observedAt: '2026-09-14',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'verified',
      evidence: [
        'Tracka publishes constituency project documents for citizens to search by representative and community.',
        'BudgIT describes Tracka as enabling citizens to collaborate, track and give feedback on public projects in their community.',
      ],
      limitations: [
        'This is citizen monitoring, not a government record. A project marked unbuilt by a citizen has not been confirmed by the responsible agency.',
        'Coverage is not uniform. Some constituencies have many tracked projects and others few.',
        'Nominated is not the same as funded, and funded is not the same as built.',
      ],
      nextSteps: [
        {
          label: 'Search the projects nominated for your community',
          url: 'https://www.yourtracka.org/ng/documents',
        },
        {
          label: 'Submit a report on what you see on the ground',
          detail:
            'A dated photo with a location is what turns a claim into evidence.',
        },
      ],
      tags: ['budget', 'projects', 'accountability'],
    },
    {
      id: 'ng-budget-spending-open-data',
      layer: 'services',
      plain:
        'Federal spending is published as open data you can search yourself.',
      body:
        'BudgetNigeria publishes government spending as open data. It is the federal counterweight to the constituency project records: allocations and releases rather than a photo of a site. The portal states it is seeking input on its API, so the data is available but the access layer is still maturing.',
      sources: ['budgetnigeria'],
      observedAt: '2026-09-14',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'verified',
      evidence: [
        'The federal spending portal publishes budget and spending data and states it is seeking input on its API.',
      ],
      limitations: [
        'Published spending is what government reports, which is not the same as audited spending.',
        'The portal says its API is still developing, so programme access may change or break.',
        'Agency names and budget lines change between years, which makes straight comparisons misleading.',
      ],
      nextSteps: [
        {
          label: 'Look up one agency you actually deal with',
          detail:
            'Pick the one whose failure you feel, and follow its allocation through to a release.',
          url: 'https://budgetnigeria.ng/',
        },
      ],
      tags: ['budget', 'spending', 'open-data'],
    },
    {
      id: 'ng-nbs-cost-of-living',
      layer: 'services',
      plain:
        'The official inflation figure is published every month, and it is worth checking the release rather than a headline.',
      body:
        'The National Bureau of Statistics publishes Consumer Price Index and inflation releases in its eLibrary. If you are arguing about the cost of living, this is the document to argue from. NBS rebases the CPI basket from time to time, so comparisons across base periods are not valid.',
      sources: ['nbs-elibrary'],
      observedAt: '2026-09-14',
      lastCheckedAt: RETRIEVED,
      confirmations: { confirm: 0, dispute: 0 },
      confidence: 'verified',
      evidence: [
        'NBS maintains a public report eLibrary containing its CPI and inflation releases.',
      ],
      limitations: [
        'This item deliberately states no number. We did not retrieve the current release in this build, and repeating a headline figure would be exactly the failure this product exists to fix.',
        'The national average will not match the price you pay. Regional and state-level figures, where published, differ from the headline.',
      ],
      nextSteps: [
        {
          label: 'Read the current release before you quote a figure',
          url: 'https://nigerianstat.gov.ng/elibrary',
        },
      ],
      tags: ['statistics', 'inflation', 'cost-of-living'],
    },
  ],

  escalation: [
    {
      label: 'Electricity complaints — NERC',
      detail:
        'DisCo first, then the NERC Forum, then NERC head office. Confirm contact details on nerc.gov.ng.',
      url: 'https://nerc.gov.ng/faq/complaints-and-redress-procedure/',
    },
    {
      label: 'Flooding and emergencies — NEMA and your SEMA',
      url: 'https://nema.gov.ng/',
    },
    {
      label: 'Identity — NIMC',
      url: 'https://nimc.gov.ng/',
    },
    {
      label: 'Budget and project delivery — Tracka',
      url: 'https://www.yourtracka.org/ng/documents',
    },
  ],
};
