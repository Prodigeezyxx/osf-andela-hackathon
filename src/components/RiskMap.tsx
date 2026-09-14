import { useEffect, useState } from 'react';
import {
  COASTAL_EXPOSED,
  EXCLUDED_FROM_MODERATE,
  FLOOD_SOURCE_NOTE,
  FLOOD_TIERS,
  MODERATE_ONLY,
  TIER_COLOR,
  TIER_LABEL,
  tierForState,
  URBAN_FLASH_CITIES,
  type RiskTier,
} from '../data/flood-risk';

/* ═══════════════════════════════════════════════════════════════
   Risk map — the 2026 Annual Flood Outlook, drawn.

   Fill shows the highest risk tier recorded for each state. The
   legend and the caption state plainly that the tiers overlap, that
   this is an area projection rather than a statement about any one
   community, and where the list came from. A map that looks more
   certain than its source is the exact failure mode this product
   exists to correct.
   ═══════════════════════════════════════════════════════════════ */

interface Feature {
  type: 'Feature';
  properties: { shapeName: string; shapeISO?: string };
  geometry:
    | { type: 'Polygon'; coordinates: number[][][] }
    | { type: 'MultiPolygon'; coordinates: number[][][][] };
}

interface FC {
  type: 'FeatureCollection';
  features: Feature[];
}

interface Props {
  selectedState: string | null;
  onSelectState: (state: string | null) => void;
  /** Items applicable to the state the reader clicked. */
  itemCountForState: (state: string) => number;
}

const W = 760;

export default function RiskMap({
  selectedState,
  onSelectState,
  itemCountForState,
}: Props) {
  const [geo, setGeo] = useState<FC | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/data/ng-states.geojson')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<FC>;
      })
      .then((j) => {
        if (alive) setGeo(j);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (failed) {
    return (
      <div className="mapwrap">
        <p className="prose">
          The state boundaries could not be loaded. The list view carries the
          same information and does not depend on the geometry file.
        </p>
      </div>
    );
  }

  if (!geo) {
    return (
      <div className="mapwrap">
        <p className="prose">Loading state boundaries…</p>
      </div>
    );
  }

  // Bounds across every ring.
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  const eachRing = (fn: (ring: number[][]) => void) => {
    for (const f of geo.features) {
      const g = f.geometry;
      if (g.type === 'Polygon') {
        for (const ring of g.coordinates) fn(ring);
      } else {
        for (const poly of g.coordinates) for (const ring of poly) fn(ring);
      }
    }
  };

  eachRing((ring) => {
    for (const [lng, lat] of ring) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  });

  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const H = Math.round((W * latSpan) / lngSpan);

  const project = (lng: number, lat: number): string => {
    const x = ((lng - minLng) / lngSpan) * W;
    const y = ((maxLat - lat) / latSpan) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const ringPath = (ring: number[][]): string =>
    ring.map(([lng, lat], i) => (i === 0 ? 'M' : 'L') + project(lng, lat)).join('') + 'Z';

  const paths = geo.features.map((f) => {
    const g = f.geometry;
    const d =
      g.type === 'Polygon'
        ? g.coordinates.map(ringPath).join('')
        : g.coordinates.map((poly) => poly.map(ringPath).join('')).join('');
    return { name: f.properties.shapeName, d, tier: tierForState(f.properties.shapeName) };
  });

  const tally = (t: RiskTier) => paths.filter((p) => p.tier === t).length;

  return (
    <div className="mapwrap">
      <div>
        <p className="eyebrow" style={{ margin: 0 }}>
          2026 Annual Flood Outlook · highest tier recorded per state
        </p>
        <svg
          className="map-svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Map of Nigerian states shaded by the highest 2026 flood risk tier recorded"
        >
          {paths.map((p) => (
            <path
              key={p.name}
              d={p.d}
              className={`state${selectedState === p.name ? ' is-active' : ''}`}
              fill={TIER_COLOR[p.tier]}
              fillOpacity={selectedState && selectedState !== p.name ? 0.35 : 0.9}
              tabIndex={0}
              role="button"
              aria-label={`${p.name}: ${TIER_LABEL[p.tier]}`}
              onClick={() => onSelectState(selectedState === p.name ? null : p.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectState(selectedState === p.name ? null : p.name);
                }
              }}
            >
              <title>{`${p.name} — ${TIER_LABEL[p.tier]}`}</title>
            </path>
          ))}
        </svg>
      </div>

      <div className="legend">
        {(['high', 'moderate', 'minimal'] as RiskTier[]).map((t) => (
          <span key={t} className="legend-item">
            <span className="swatch" style={{ background: TIER_COLOR[t] }} />
            {TIER_LABEL[t]} ({tally(t)})
          </span>
        ))}
      </div>

      {selectedState ? (
        <div className="panel panel-tight" style={{ background: 'var(--elev-2)' }}>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            {selectedState}
          </p>
          <p className="prose" style={{ marginBottom: 8 }}>
            {TIER_LABEL[tierForState(selectedState)]}.{' '}
            {itemCountForState(selectedState)} published item
            {itemCountForState(selectedState) === 1 ? '' : 's'} apply here.
          </p>
          <ul className="bullets" style={{ fontSize: 'var(--fs-sm)' }}>
            <li>
              This shade is the highest tier the outlook recorded for the state.
              It is not an average, and it is not a forecast for your community.
            </li>
            {COASTAL_EXPOSED.includes(selectedState) && (
              <li>Also named for coastal flooding from sea-level rise and tidal surge.</li>
            )}
            {MODERATE_ONLY.includes(selectedState) && (
              <li>
                Not named in the high-risk tier, but holds moderate-risk
                communities.
              </li>
            )}
            {EXCLUDED_FROM_MODERATE.includes(selectedState) && (
              <li>
                The only state the outlook excluded from its moderate-risk tier.
                That is absence of a listing, not a finding of safety.
              </li>
            )}
            {URBAN_FLASH_CITIES.includes(selectedState) && (
              <li>Also named for flash and urban flooding.</li>
            )}
          </ul>
        </div>
      ) : null}

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-v" style={{ color: TIER_COLOR.high }}>
            {FLOOD_TIERS.high.communities.toLocaleString()}
          </div>
          <div className="stat-l">Communities at high risk</div>
          <div className="stat-note">
            {FLOOD_TIERS.high.lgas} LGAs · {FLOOD_TIERS.high.states} states plus the FCT
          </div>
        </div>
        <div className="stat">
          <div className="stat-v" style={{ color: TIER_COLOR.moderate }}>
            {FLOOD_TIERS.moderate.communities.toLocaleString()}
          </div>
          <div className="stat-l">Communities at moderate risk</div>
          <div className="stat-note">
            {FLOOD_TIERS.moderate.lgas} LGAs · {FLOOD_TIERS.moderate.states} states,{' '}
            {FLOOD_TIERS.moderate.note}
          </div>
        </div>
        <div className="stat">
          <div className="stat-v" style={{ color: 'var(--ink-2)' }}>
            {FLOOD_TIERS.minimal.communities.toLocaleString()}
          </div>
          <div className="stat-l">Communities at minimal risk</div>
          <div className="stat-note">
            {FLOOD_TIERS.minimal.lgas} LGAs · {FLOOD_TIERS.minimal.states} states
          </div>
        </div>
      </div>

      <p className="prose" style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)' }}>
        {FLOOD_SOURCE_NOTE} Tiers overlap within a state, so a high-risk state also
        holds moderate and minimal risk communities. Cities named for flash and
        urban flooding: {URBAN_FLASH_CITIES.join(', ')}. States named for coastal
        flooding: {COASTAL_EXPOSED.join(', ')}.
      </p>
    </div>
  );
}
