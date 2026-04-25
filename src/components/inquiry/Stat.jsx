export default function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon aria-hidden="true" className="w-3.5 h-3.5 text-ink-secondary" />
      <span className="text-xs">
        <span className="text-white font-semibold font-mono tabular-nums">{value}</span>{' '}
        <span className="text-ink-secondary">{label}</span>
      </span>
    </div>
  );
}
