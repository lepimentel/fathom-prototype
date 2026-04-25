import { useEffect, useState, useCallback } from 'react';
import { BG_TONES, DEFAULT_TWEAKS } from './tones.js';

const STORAGE_KEY = 'fathom-tweaks-v1';

function hexToRgbTriple(hex) {
  const m = hex.replace('#', '').match(/.{1,2}/g);
  if (!m || m.length !== 3) return null;
  return m.map((c) => parseInt(c, 16)).join(' ');
}

export function useTweaks() {
  const [tweaks, setTweaks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_TWEAKS, ...JSON.parse(stored) };
    } catch {
      // ignore
    }
    return DEFAULT_TWEAKS;
  });

  const setTweak = useCallback((key, value) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetTweaks = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setTweaks(DEFAULT_TWEAKS);
  }, []);

  // Apply CSS vars + data-mode to <html>; tones drive bg/panel/ink, accent driven separately.
  useEffect(() => {
    const tone = BG_TONES[tweaks.bgTone] ?? BG_TONES.ink;
    const root = document.documentElement;

    root.style.setProperty('--color-bg', tone.bg);
    root.style.setProperty('--color-bg-deep', tone.bgDeep);
    root.style.setProperty('--color-panel', tone.panel);
    root.style.setProperty('--color-ink-primary', tone.inkPrimary);
    root.style.setProperty('--color-ink-secondary', tone.inkSecondary);

    const accentTriple = hexToRgbTriple(tweaks.accentColor);
    if (accentTriple) root.style.setProperty('--color-accent', accentTriple);
    const accentHoverTriple = hexToRgbTriple(tweaks.accentHover);
    if (accentHoverTriple) root.style.setProperty('--color-accent-hover', accentHoverTriple);

    root.setAttribute('data-mode', tone.mode);
    root.style.fontSize = `${tweaks.fontScale * 16}px`;
  }, [tweaks]);

  return { tweaks, setTweak, resetTweaks };
}
