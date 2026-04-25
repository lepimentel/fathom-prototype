export default function InsightCard({ insight }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-panel/60 p-4 hover:border-white/[0.15] transition">
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-[11px] font-bold ${insight.color}`}
        >
          {insight.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[11px] font-medium text-ink-primary">{insight.role}</span>
            <span
              className={`text-[9px] font-bold uppercase tracking-[1px] rounded px-1.5 py-0.5 ${
                insight.tag === 'workaround'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-red-300 bg-red-500/10 border border-red-500/30'
              }`}
            >
              {insight.tag}
            </span>
          </div>
          <p className="text-xs text-ink-secondary italic leading-relaxed">
            &ldquo;{insight.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
