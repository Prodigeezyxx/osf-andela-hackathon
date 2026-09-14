import { useEffect, useMemo, useState } from 'react';
import LayerRail from './components/LayerRail';
import TrustCard from './components/TrustCard';
import ItemDetail from './components/ItemDetail';
import RiskMap from './components/RiskMap';
import SriPanel from './components/SriPanel';
import { DEFAULT_PACK_CODE, getPack, PACKS } from './data/packs';
import { t } from './lib/i18n';
import { useConfirmations } from './lib/useConfirmations';
import { useReadAloud } from './lib/useReadAloud';
import type { LayerId, Source, TrustItem } from './types';
import { LAYERS } from './types';

type View = 'items' | 'map' | 'framework';

/** A national item (no states list) applies everywhere. */
function appliesToState(item: TrustItem, state: string): boolean {
  return !item.states || item.states.length === 0 || item.states.includes(state);
}

export default function App() {
  const [packCode, setPackCode] = useState(DEFAULT_PACK_CODE);
  const [layer, setLayer] = useState<LayerId | 'all'>('all');
  const [q, setQ] = useState('');
  const [lite, setLite] = useState(false);
  const [view, setView] = useState<View>('items');
  const [open, setOpen] = useState<TrustItem | null>(null);
  const [mapState, setMapState] = useState<string | null>(null);

  const { store, vote } = useConfirmations();
  const { supported, speakingId, speak } = useReadAloud();
  const s = t('en');

  const pack = useMemo(() => getPack(packCode), [packCode]);

  const sources = useMemo(() => {
    const m = new Map<string, Source>();
    for (const src of pack.sources) m.set(src.id, src);
    return m;
  }, [pack]);

  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite);
    document.body.classList.toggle('lite', lite);
  }, [lite]);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return pack.items.filter((i) => {
      if (layer !== 'all' && i.layer !== layer) return false;
      if (!needle) return true;
      const hay = [i.plain, i.body, i.confidence, ...(i.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [pack, layer, q]);

  const itemCountForState = (state: string) =>
    pack.items.filter((i) => appliesToState(i, state)).length;

  const stateItems = mapState
    ? pack.items.filter((i) => appliesToState(i, mapState))
    : [];

  const speakItem = (item: TrustItem) => {
    const text = [
      item.plain,
      item.body,
      `Confidence: ${item.confidence}. Last checked ${item.lastCheckedAt}.`,
      'What this does not tell you.',
      ...item.limitations,
      'What to do next.',
      ...item.nextSteps.map((n) => n.label),
    ].join('. ');
    speak(item.id, text);
  };

  const unsourced = pack.items.filter((i) => i.sources.length === 0).length;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#0e1013" />
            <path
              d="M20 33.5l8.5 8.5L45 23"
              fill="none"
              stroke="#5eead4"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="brand-name">Ukweli</span>
        </div>
        <span className="brand-tag">{s.tagline}</span>

        <span className="spacer" />

        <div className="seg" role="tablist" aria-label="View">
          <button
            type="button"
            role="tab"
            className={`btn${view === 'items' ? ' is-active' : ''}`}
            aria-selected={view === 'items'}
            onClick={() => setView('items')}
          >
            Items
          </button>
          <button
            type="button"
            role="tab"
            className={`btn${view === 'map' ? ' is-active' : ''}`}
            aria-selected={view === 'map'}
            onClick={() => setView('map')}
            disabled={lite}
            title={lite ? 'Disabled in lite mode' : undefined}
          >
            Map
          </button>
          <button
            type="button"
            role="tab"
            className={`btn${view === 'framework' ? ' is-active' : ''}`}
            aria-selected={view === 'framework'}
            onClick={() => setView('framework')}
          >
            Framework
          </button>
        </div>

        <select
          className="select"
          value={packCode}
          onChange={(e) => {
            setPackCode(e.target.value);
            setMapState(null);
          }}
          aria-label="Country pack"
        >
          {PACKS.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn"
          aria-pressed={lite}
          onClick={() => {
            setLite((v) => {
              const next = !v;
              if (next) setView('items');
              return next;
            });
          }}
        >
          {lite ? 'Lite: on' : 'Lite mode'}
        </button>
      </header>

      <div className="wrap">
        <aside className="rail">
          <LayerRail pack={pack} active={layer} onChange={setLayer} />

          <div className="panel panel-tight">
            <label className="eyebrow" htmlFor="search">
              {s.search}
            </label>
            <input
              id="search"
              className="search"
              type="search"
              value={q}
              placeholder={s.searchPlaceholder}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="panel panel-tight">
            <p className="eyebrow">What this pack covers</p>
            <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
              {pack.coverageNote}
            </p>
            <p
              className="tally"
              style={{ marginTop: 10, display: 'block' }}
            >
              {pack.items.length} published · {pack.sources.length} sources
              registered · {unsourced} published without a source
            </p>
          </div>

          <div className="panel panel-tight">
            <p className="eyebrow">Where to escalate</p>
            <ul className="bullets" style={{ fontSize: 'var(--fs-sm)' }}>
              {pack.escalation.map((e) => (
                <li key={e.label}>
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noreferrer noopener">
                      {e.label}
                    </a>
                  ) : (
                    e.label
                  )}
                  {e.detail && (
                    <span style={{ color: 'var(--ink-3)' }}> — {e.detail}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel panel-tight">
            <p className="eyebrow">Languages</p>
            <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
              {pack.languages
                .map((l) =>
                  l.status === 'reviewed' ? l.label : `${l.label} (needs native review)`
                )
                .join(' · ')}
            </p>
            <p
              className="prose"
              style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)', marginTop: 8 }}
            >
              Only reviewed strings are shown as translations. A wrong translation
              on a trust product is worse than an honest English fallback, so the
              others are labelled rather than guessed.
            </p>
          </div>
        </aside>

        <main>
          {view === 'framework' && <SriPanel />}

          {view === 'map' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {pack.code === 'NG' ? (
                <RiskMap
                  selectedState={mapState}
                  onSelectState={setMapState}
                  itemCountForState={itemCountForState}
                />
              ) : (
                <div className="empty">
                  <h3>No risk geometry for {pack.name}</h3>
                  <p className="prose">
                    The Nigeria pack carries the 2026 flood outlook as state
                    geometry. A new country gets its own layer by adding one data
                    file and one pack file, which is the scalability claim in this
                    build. Until that file exists, this view says so instead of
                    drawing something plausible.
                  </p>
                </div>
              )}

              {mapState && (
                <section>
                  <p className="eyebrow">
                    Published items applying to {mapState} ({stateItems.length})
                  </p>
                  <div className="list">
                    {stateItems.map((i) => (
                      <TrustCard
                        key={i.id}
                        item={i}
                        sources={sources}
                        onOpen={setOpen}
                        speaking={speakingId === i.id}
                        onSpeak={speakItem}
                        canSpeak={supported}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {view === 'items' && (
            <>
              {items.length === 0 ? (
                <div className="empty">
                  <h3>
                    {pack.items.length === 0 ? s.noItems : 'Nothing matches that'}
                  </h3>
                  <p className="prose">
                    {pack.items.length === 0
                      ? s.noItemsBody
                      : 'Try a different layer or clear the search.'}
                  </p>
                </div>
              ) : (
                <>
                  <p className="eyebrow">
                    {items.length} item{items.length === 1 ? '' : 's'}
                    {layer !== 'all'
                      ? ` in ${LAYERS.find((l) => l.id === layer)?.label}`
                      : ` in ${pack.name}`}
                    {lite ? ' · lite mode, no map' : ''}
                  </p>
                  <div className="list">
                    {items.map((i) => (
                      <TrustCard
                        key={i.id}
                        item={i}
                        sources={sources}
                        onOpen={setOpen}
                        speaking={speakingId === i.id}
                        onSpeak={speakItem}
                        canSpeak={supported}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>

      <footer className="foot">
        <div className="foot-in">
          <p style={{ margin: 0 }}>
            Ukweli is a working proof of concept built for the OSF × Andela
            hackathon, &ldquo;Information you can trust&rdquo;. Every item shows
            its source, the date it was last checked, what it cannot tell you, and
            what to do next. Nothing is published without a retrievable source.
          </p>
          <p style={{ margin: 0 }}>
            Base layer: the SPSS Readiness Index, from the Spatial, Physical,
            Social Systems framework by Iyobosa Rehoboth (CC BY 4.0), published
            before this sprint. State boundaries: geoBoundaries / GRID3, CC BY 4.0.
            No runtime API keys, no tracking, no accounts.
          </p>
        </div>
      </footer>

      {open && (
        <ItemDetail
          item={open}
          sources={sources}
          onClose={() => setOpen(null)}
          myVerdict={store[open.id]}
          onVote={vote}
          speaking={speakingId === open.id}
          onSpeak={speakItem}
          canSpeak={supported}
        />
      )}
    </div>
  );
}
