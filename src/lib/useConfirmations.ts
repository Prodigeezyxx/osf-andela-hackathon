import { useCallback, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Community confirmation, stored locally.

   There are no accounts, no server and no identifier of any kind.
   A reader's confirmation lives in this browser and nowhere else,
   which is why the counts start at the seeded baseline and the
   interface says plainly where they come from. Privacy by
   architecture rather than by promise.
   ═══════════════════════════════════════════════════════════════ */

const KEY = 'ukweli.confirm.v1';

export type Verdict = 'confirm' | 'dispute';

type Store = Record<string, Verdict>;

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as Store;
    return {};
  } catch {
    return {};
  }
}

function write(store: Store): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* Storage disabled or full. The vote is dropped rather than faked. */
  }
}

export function useConfirmations() {
  const [store, setStore] = useState<Store>({});

  useEffect(() => {
    setStore(read());
  }, []);

  const vote = useCallback((itemId: string, verdict: Verdict) => {
    setStore((prev) => {
      const next: Store = { ...prev };
      if (next[itemId] === verdict) {
        delete next[itemId];
      } else {
        next[itemId] = verdict;
      }
      write(next);
      return next;
    });
  }, []);

  const count = useCallback(() => Object.keys(store).length, [store]);

  return { store, vote, count };
}
