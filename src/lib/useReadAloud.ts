import { useCallback, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Read aloud, using the voice already on the device.

   This is the oral-first affordance: the same verified text, spoken,
   for readers who take information by listening rather than by
   reading, and for anyone reading one-handed. It uses the browser's
   own speech synthesis, so it costs no data and works offline.
   ═══════════════════════════════════════════════════════════════ */

export function useReadAloud() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supported]);

  const speak = useCallback(
    (id: string, text: string) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-NG';
      u.rate = 0.96;
      u.onend = () => setSpeakingId(null);
      u.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(u);
    },
    [supported, speakingId]
  );

  return { supported, speakingId, speak, stop };
}
