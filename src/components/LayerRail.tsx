import type { CountryPack, LayerId } from '../types';
import { LAYERS } from '../types';

interface Props {
  pack: CountryPack;
  active: LayerId | 'all';
  onChange: (layer: LayerId | 'all') => void;
}

export default function LayerRail({ pack, active, onChange }: Props) {
  const countFor = (id: LayerId) =>
    pack.items.filter((i) => i.layer === id).length;

  return (
    <nav className="panel" aria-label="Civic layers">
      <p className="eyebrow">Layers</p>
      <div className="layers">
        <button
          type="button"
          className={`layer${active === 'all' ? ' is-active' : ''}`}
          onClick={() => onChange('all')}
          aria-pressed={active === 'all'}
        >
          <span className="layer-dot" style={{ background: 'var(--ink-3)' }} />
          <span>
            <span className="layer-label">Everything</span>
            <span className="layer-plain">
              All published items in this country pack.
            </span>
          </span>
          <span className="layer-count">{pack.items.length}</span>
        </button>

        {LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`layer${active === l.id ? ' is-active' : ''}`}
            onClick={() => onChange(l.id)}
            aria-pressed={active === l.id}
          >
            <span className="layer-dot" style={{ background: l.color }} />
            <span>
              <span className="layer-label">{l.label}</span>
              <span className="layer-plain">{l.plain}</span>
            </span>
            <span className="layer-count">{countFor(l.id)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
