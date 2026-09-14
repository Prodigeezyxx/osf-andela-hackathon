import { useEffect } from 'react';
import type { Source, TrustItem } from '../types';
import { CONFIDENCE_META, LAYERS } from '../types';
import { TIER_LABEL, tierForState } from '../data/flood-risk';
import type { Verdict } from '../lib/useConfirmations';

interface Props {
  item: TrustItem;
  sources: Map<string, Source>;
  onClose: () => void;
  myVerdict: Verdict | undefined;
  onVote: (id: string, v: Verdict) => void;
  speaking: boolean;
  onSpeak: (item: TrustItem) => void;
  canSpeak: boolean;
}

export default function ItemDetail({
  item,
  sources,
  onClose,
  myVerdict,
  onVote,
  speaking,
  onSpeak,
  canSpeak,
}: Props) {
  const conf = CONFIDENCE_META[item.confidence];
  const layer = LAYERS.find((l) => l.id === item.layer);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const confirmations = item.confirmations;
  const myConfirm = myVerdict === 'confirm' ? 1 : 0;
  const myDispute = myVerdict === 'dispute' ? 1 : 0;

  return (
    <>
      <button
        type="button"
        className="scrim"
        aria-label="Close details"
        onClick={onClose}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={item.plain}
      >
        <header className="drawer-head">
          <span className="chip" style={{ color: conf.color, borderColor: conf.color }}>
            <span className="dot" style={{ background: conf.color }} />
            {conf.label}
          </span>
          {layer && (
            <span className="chip" style={{ color: layer.color }}>
              {layer.label}
            </span>
          )}
          <span className="spacer" />
          {canSpeak && (
            <button
              type="button"
              className="btn btn-ghost"
              aria-pressed={speaking}
              onClick={() => onSpeak(item)}
            >
              {speaking ? 'Stop' : 'Listen'}
            </button>
          )}
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="drawer-body">
          <div>
            <p className="lede">{item.plain}</p>
            <p className="prose" style={{ marginTop: 10 }}>
              {item.body}
            </p>
          </div>

          <div className="stat-grid">
            <div className="stat">
              <div className="stat-v" style={{ fontSize: 'var(--fs-md)' }}>
                {conf.label}
              </div>
              <div className="stat-note">{conf.plain}</div>
            </div>
            <div className="stat">
              <div className="stat-v" style={{ fontSize: 'var(--fs-md)' }}>
                {item.observedAt}
              </div>
              <div className="stat-l">Observed</div>
              <div className="stat-note">when the event or figure dates from</div>
            </div>
            <div className="stat">
              <div className="stat-v" style={{ fontSize: 'var(--fs-md)' }}>
                {item.lastCheckedAt}
              </div>
              <div className="stat-l">Last checked</div>
              <div className="stat-note">when we last opened the sources</div>
            </div>
          </div>

          <section>
            <h3 className="section-title">
              Sources ({item.sources.length}) — open them yourself
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {item.sources.map((sid) => {
                const s = sources.get(sid);
                if (!s) {
                  return (
                    <div key={sid} className="src">
                      <span className="src-kind">missing</span>
                      <span className="src-title">
                        Source id “{sid}” is referenced but not registered in this
                        pack. That is a defect, and the interface is showing it
                        rather than hiding it.
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={sid} className="src">
                    <span className="src-kind">
                      {s.kind}
                      {s.license ? ` · ${s.license}` : ''}
                    </span>
                    <span className="src-pub">{s.publisher}</span>
                    <a className="src-title" href={s.url} target="_blank" rel="noreferrer noopener">
                      {s.title}
                    </a>
                    <span className="src-dates">
                      {s.publishedAt ? `published ${s.publishedAt} · ` : ''}
                      retrieved {s.retrievedAt}
                    </span>
                    {s.caveat && <span className="src-caveat">{s.caveat}</span>}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="section-title">What backs this</h3>
            <ul className="bullets">
              {item.evidence.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="section-title">What this does not tell you</h3>
            <ul className="bullets is-limits">
              {item.limitations.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="section-title">What to do next</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {item.nextSteps.map((s, i) => (
                <div key={s.label} className="step">
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="step-label">{s.label}</span>
                    {s.detail && <span className="step-detail">{s.detail}</span>}
                    {s.contact && (
                      <span className="step-detail mono">{s.contact}</span>
                    )}
                    {s.url && (
                      <a
                        className="step-detail"
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Open source
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {item.states && item.states.length > 0 && (
            <section>
              <h3 className="section-title">
                Where this applies ({item.states.length})
              </h3>
              <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
                {item.states.map((s) => `${s} (${TIER_LABEL[tierForState(s)]})`).join(' · ')}
              </p>
            </section>
          )}

          <section>
            <h3 className="section-title">Community check</h3>
            <div className="confirm">
              <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
                Your answer is stored in this browser only. There is no account, no
                server and nothing sent anywhere.
              </p>
              <div className="confirm-row">
                <button
                  type="button"
                  className={`btn${myVerdict === 'confirm' ? ' is-active' : ''}`}
                  aria-pressed={myVerdict === 'confirm'}
                  onClick={() => onVote(item.id, 'confirm')}
                >
                  I can confirm this
                </button>
                <button
                  type="button"
                  className={`btn${myVerdict === 'dispute' ? ' is-active' : ''}`}
                  aria-pressed={myVerdict === 'dispute'}
                  onClick={() => onVote(item.id, 'dispute')}
                >
                  Wrong or out of date
                </button>
              </div>
              <p className="tally">
                {confirmations.confirm + myConfirm} confirmed ·{' '}
                {confirmations.dispute + myDispute} reported out of date
                {myVerdict ? ' · yours is counted' : ''}
              </p>
            </div>
          </section>

          {item.tags && item.tags.length > 0 && (
            <section>
              <h3 className="section-title">Tags</h3>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {item.tags.map((tg) => (
                  <span key={tg} className="chip">
                    {tg}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>
    </>
  );
}
