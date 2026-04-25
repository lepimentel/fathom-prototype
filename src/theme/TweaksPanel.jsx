import { useEffect, useRef, useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { BG_TONES, ACCENT_PRESETS } from './tones.js';

export default function TweaksPanel({ tweaks, setTweak, resetTweaks }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  // Keyboard shortcut: cmd/ctrl + . to toggle
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open theme tweaks"
        title="Theme tweaks (⌘.)"
        className="fixed bottom-4 right-4 z-40 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-panel/90 border border-white/10 backdrop-blur-md text-ink-secondary hover:text-ink-primary hover:bg-panel hover:border-white/20 transition shadow-lg"
      >
        <Settings2 aria-hidden="true" className="w-4 h-4" />
      </button>

      {open && (
        <div className="twk-panel fixed bottom-20 right-4 z-50 w-[300px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-white/10 bg-panel/85 backdrop-blur-2xl shadow-2xl text-ink-primary overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="font-display text-sm font-semibold tracking-tight">Theme tweaks</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close tweaks"
              className="w-7 h-7 rounded-md text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05] flex items-center justify-center transition"
            >
              <X aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-4 flex flex-col gap-4 overflow-y-auto">
            <Section label="Theme">
              <SelectRow
                label="Background tone"
                value={tweaks.bgTone}
                onChange={(v) => setTweak('bgTone', v)}
                options={Object.keys(BG_TONES).map((k) => ({
                  value: k,
                  label: BG_TONES[k].name + (BG_TONES[k].mode === 'light' ? ' (light)' : ''),
                }))}
              />
              <ColorRow
                label="Accent color"
                value={tweaks.accentColor}
                presets={ACCENT_PRESETS}
                onChange={(v) => setTweak('accentColor', v)}
              />
            </Section>

            <Section label="Atmosphere">
              <ToggleRow
                label="Grid overlay"
                value={tweaks.gridOverlay}
                onChange={(v) => setTweak('gridOverlay', v)}
              />
              <ToggleRow
                label="Ambient glow"
                value={tweaks.ambientGlow}
                onChange={(v) => setTweak('ambientGlow', v)}
              />
            </Section>

            <Section label="Typography">
              <SliderRow
                label="Font scale"
                value={tweaks.fontScale}
                min={0.85}
                max={1.15}
                step={0.025}
                onChange={(v) => setTweak('fontScale', Number(v))}
                format={(v) => `${Math.round(v * 100)}%`}
              />
            </Section>

            <button
              type="button"
              onClick={resetTweaks}
              className="mt-2 text-[11px] uppercase tracking-[1px] text-ink-secondary hover:text-ink-primary transition self-start"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ label, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-[10px] font-bold uppercase tracking-[1px] text-ink-secondary/70">
        {label}
      </div>
      {children}
    </div>
  );
}

function SelectRow({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-primary/80">{label}</span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-ink-primary focus-visible:outline-none focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/40 transition"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-bg text-ink-primary">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorRow({ label, value, presets, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-primary/80">{label}</span>
        <span className="font-mono text-ink-secondary text-[10px] uppercase">{value}</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Set accent to ${p}`}
            className={`w-6 h-6 rounded-md border transition ${
              value.toLowerCase() === p.toLowerCase()
                ? 'border-white/40 ring-2 ring-white/20 ring-offset-2 ring-offset-bg'
                : 'border-white/10 hover:border-white/30'
            }`}
            style={{ background: p }}
          />
        ))}
        <label className="relative w-6 h-6 rounded-md border border-white/10 hover:border-white/30 transition cursor-pointer overflow-hidden">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full"
            style={{ background: 'conic-gradient(from 0deg, #f43f5e, #facc15, #10b981, #38bdf8, #a855f7, #f43f5e)' }}
          />
        </label>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-ink-primary/80">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition ${
          value ? 'bg-accent' : 'bg-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, onChange, format }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-primary/80">{label}</span>
        <span className="font-mono text-ink-secondary tabular-nums text-[11px]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-accent"
      />
    </div>
  );
}
