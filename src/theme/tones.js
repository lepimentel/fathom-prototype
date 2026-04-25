// Background tone palettes — ported from Anthropic design handoff (2026-04-25)
// Stored as RGB triples (R G B with no commas) so Tailwind's `rgb(var(--color-*) / <alpha-value>)`
// pattern picks them up. Each tone declares a `mode` ('dark' | 'light') used to flip the
// `data-mode` attribute on <html>; light mode triggers the override block in index.css.
export const BG_TONES = {
  ink: {
    name: 'Ink',
    mode: 'dark',
    bg: '10 12 16',          // #0A0C10  (default)
    bgDeep: '12 14 20',      // #0C0E14
    panel: '18 21 28',       // #12151C
    inkPrimary: '241 245 249',
    inkSecondary: '148 163 184',
  },
  slate: {
    name: 'Slate',
    mode: 'dark',
    bg: '15 20 32',
    bgDeep: '13 17 28',
    panel: '21 29 46',
    inkPrimary: '241 245 249',
    inkSecondary: '148 163 184',
  },
  graphite: {
    name: 'Graphite',
    mode: 'dark',
    bg: '20 21 25',
    bgDeep: '18 19 23',
    panel: '26 28 35',
    inkPrimary: '241 245 249',
    inkSecondary: '148 163 184',
  },
  midnight: {
    name: 'Midnight',
    mode: 'dark',
    bg: '14 21 48',
    bgDeep: '11 16 36',
    panel: '22 30 58',
    inkPrimary: '241 245 249',
    inkSecondary: '148 163 184',
  },
  sandstone: {
    name: 'Sandstone',
    mode: 'dark',
    bg: '23 20 17',
    bgDeep: '20 17 14',
    panel: '31 25 20',
    inkPrimary: '241 245 249',
    inkSecondary: '170 158 144',
  },
  cream: {
    name: 'Cream',
    mode: 'light',
    bg: '250 247 242',       // #FAF7F2
    bgDeep: '245 240 231',
    panel: '255 253 249',
    inkPrimary: '61 52 43',  // #3D342B
    inkSecondary: '133 119 105',
  },
};

export const ACCENT_PRESETS = [
  '#38BDF8', // sky (default)
  '#FF9300', // orange
  '#A855F7', // violet
  '#10B981', // emerald
  '#F43F5E', // rose
  '#FACC15', // amber
];

export const DEFAULT_TWEAKS = {
  bgTone: 'ink',
  accentColor: '#38BDF8',
  accentHover: '#67E8F9',
  gridOverlay: false,
  ambientGlow: true,
  fontScale: 1,
};
