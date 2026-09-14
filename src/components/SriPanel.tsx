import { useState } from 'react';
import {
  COUNTRIES,
  FAILURE_ARCHIVE,
  FRAMEWORK_META,
  LAYER_METRICS,
  rankCountries,
  type LayerMetric,
} from '../data/sri';

/* ═══════════════════════════════════════════════════════════════
   The SPSS base layer, shown as itself — including the parts that
   are estimates. The confidence labels come from the framework's
   own notes, so a reader can see which sub-indicators rest on
   measured data and which are modelled.
   ═══════════════════════════════════════════════════════════════ */

export default function SriPanel() {
  const [showAll, setShowAll] = useState(false);
  const ranked = rankCountries();
  const rows = showAll ? ranked : ranked.slice(0, 12);
  const ng = ranked.find((r) => r.code === 'NG');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <section className="panel">
        <p className="eyebrow">The framework this product is built on</p>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: 'var(--fs-lg)',
            letterSpacing: '-0.015em',
          }}
        >
          {FRAMEWORK_META.index}
        </h2>
        <p className="prose" style={{ marginBottom: 14 }}>
          {FRAMEWORK_META.name} — {FRAMEWORK_META.full}. Originated by{' '}
          {FRAMEWORK_META.author} and published before this hackathon, licensed{' '}
          {FRAMEWORK_META.license}. It is the design lens and the base layer here;
          the tool itself is a new build.
        </p>
        <p className="mono" style={{ color: 'var(--teal)', margin: '0 0 12px' }}>
          {FRAMEWORK_META.formula}
        </p>
        <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
          {FRAMEWORK_META.whyGeometricMean}
        </p>
      </section>

      {ng && (
        <section className="stat-grid">
          <div className="stat">
            <div className="stat-v" style={{ color: 'var(--teal)' }}>
              {ng.sri}
            </div>
            <div className="stat-l">Nigeria SRI</div>
            <div className="stat-note">of a possible 100</div>
          </div>
          <div className="stat">
            <div className="stat-v">{ng.physical}</div>
            <div className="stat-l">Physical</div>
            <div className="stat-note">energy, connectivity, devices</div>
          </div>
          <div className="stat">
            <div className="stat-v">{ng.social}</div>
            <div className="stat-l">Social</div>
            <div className="stat-note">language, youth, community capacity</div>
          </div>
          <div className="stat">
            <div className="stat-v">{ng.spatial}</div>
            <div className="stat-l">Spatial</div>
            <div className="stat-note">compute, hubs, AI talent</div>
          </div>
          <div className="stat">
            <div className="stat-v">{ng.balance}</div>
            <div className="stat-l">Balance</div>
            <div className="stat-note">penalty for lopsided development</div>
          </div>
          <div className="stat">
            <div className="stat-v" style={{ color: 'var(--rose)' }}>
              {ng.weakest}
            </div>
            <div className="stat-l">Weakest layer</div>
            <div className="stat-note">the one dragging the mean down</div>
          </div>
        </section>
      )}

      <section className="panel">
        <p className="eyebrow">Sub-indicators, with their own provenance</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(
            Object.entries(LAYER_METRICS) as [string, LayerMetric][]
          ).map(([key, m]) => (
            <div key={key}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span
                  className="swatch"
                  style={{ background: m.color }}
                  aria-hidden="true"
                />
                <strong style={{ fontSize: 'var(--fs-base)' }}>{m.label}</strong>
                <span style={{ color: 'var(--ink-3)', fontSize: 'var(--fs-sm)' }}>
                  {m.desc}
                </span>
              </div>
              <table className="rank-table">
                <tbody>
                  {m.sub.map((s) => (
                    <tr key={s.key}>
                      <td>{s.label}</td>
                      <td className="num">{Math.round(s.weight * 100)}%</td>
                      <td>{s.src}</td>
                      <td
                        className="num"
                        style={{
                          color:
                            s.confidence === 'estimated'
                              ? 'var(--violet)'
                              : 'var(--ink-2)',
                        }}
                      >
                        {s.confidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p
          className="prose"
          style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)', marginTop: 12 }}
        >
          Three of the nine sub-indicators are estimates rather than measurements,
          and they are labelled as such above. That is the framework's own
          annotation, carried through rather than tidied away.
        </p>
      </section>

      <section className="panel">
        <p className="eyebrow">
          {FRAMEWORK_META.index} across {FRAMEWORK_META.countries} African countries
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="rank-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Physical</th>
                <th>Social</th>
                <th>Spatial</th>
                <th>Balance</th>
                <th>SRI</th>
                <th>Weakest</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code}>
                  <td className="num">{i + 1}</td>
                  <td style={{ color: 'var(--ink)' }}>{r.name}</td>
                  <td className="num">{r.physical}</td>
                  <td className="num">{r.social}</td>
                  <td className="num">{r.spatial}</td>
                  <td className="num">{r.balance}</td>
                  <td className="num">
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span className="bar" style={{ width: 46 }}>
                        <i style={{ width: `${r.sri}%` }} />
                      </span>
                      <strong style={{ color: 'var(--teal)' }}>{r.sri}</strong>
                    </span>
                  </td>
                  <td style={{ color: 'var(--rose)' }}>{r.weakest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn"
          style={{ marginTop: 14 }}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? 'Show top 12' : `Show all ${COUNTRIES.length}`}
        </button>
      </section>

      <section className="panel">
        <p className="eyebrow">Why this lens: deployments that failed</p>
        <p className="prose" style={{ marginBottom: 12, fontSize: 'var(--fs-sm)' }}>
          The framework carries its own counter-examples. Each one failed on a
          layer that was assumed rather than designed.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAILURE_ARCHIVE.map((f) => (
            <div key={f.project} className="src">
              <span className="src-kind">
                {f.region} · failed on the {f.layer} layer
              </span>
              <span className="src-pub">{f.project}</span>
              <span className="src-title">{f.root}</span>
              <span className="src-caveat">{f.lesson}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
