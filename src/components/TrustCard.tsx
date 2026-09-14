import type { Source, TrustItem } from '../types';
import { CONFIDENCE_META, LAYERS } from '../types';

interface Props {
  item: TrustItem;
  sources: Map<string, Source>;
  onOpen: (item: TrustItem) => void;
  speaking: boolean;
  onSpeak: (item: TrustItem) => void;
  canSpeak: boolean;
}

export default function TrustCard({
  item,
  sources,
  onOpen,
  speaking,
  onSpeak,
  canSpeak,
}: Props) {
  const conf = CONFIDENCE_META[item.confidence];
  const layer = LAYERS.find((l) => l.id === item.layer);
  const primary = sources.get(item.sources[0]);
  const updates = item.sources.length;

  return (
    <article className="card">
      <div className="card-top">
        <span className="chip" style={{ color: conf.color, borderColor: conf.color }}>
          <span className="dot" style={{ background: conf.color }} />
          {conf.label}
        </span>
        {layer && (
          <span className="chip" style={{ color: layer.color }}>
            <span className="dot" style={{ background: layer.color }} />
            {layer.label}
          </span>
        )}
        <span className="spacer" />
        {canSpeak && (
          <button
            type="button"
            className="btn btn-ghost"
            aria-pressed={speaking}
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(item);
            }}
          >
            {speaking ? 'Stop' : 'Listen'}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpen(item)}
        style={{
          background: 'none',
          border: 0,
          padding: 0,
          textAlign: 'left',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        <p className="plain">{item.plain}</p>
      </button>

      <div className="card-meta">
        <span>checked {item.lastCheckedAt}</span>
        <span>observed {item.observedAt}</span>
        <span>
          {updates} source{updates === 1 ? '' : 's'}
        </span>
        {item.confirmations.confirm > 0 && (
          <span>
            {item.confirmations.confirm} confirmed · {item.confirmations.dispute}{' '}
            reported stale
          </span>
        )}
      </div>

      {primary && (
        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)' }}>
          Primary source: {primary.publisher}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" className="btn" onClick={() => onOpen(item)}>
          Provenance, limits and next steps
        </button>
      </div>
    </article>
  );
}
