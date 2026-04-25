import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProcessNode({ node, isLast, index }) {
  const isBottleneck = node.status === 'bottleneck';
  return (
    <div className="relative pb-6 last:pb-0">
      {!isLast && (
        <div
          className={`absolute left-3 top-7 w-px h-[calc(100%-1rem)] ${
            isBottleneck ? 'bg-red-400/30' : 'bg-white/10'
          }`}
        />
      )}
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 relative z-10 ${
            isBottleneck
              ? 'border-red-400 bg-red-500/10 shadow-[0_0_18px_-2px_rgba(248,113,113,0.5)]'
              : 'border-emerald-500 bg-emerald-500/10'
          }`}
        >
          <span className="text-[9px] font-bold font-mono tabular-nums">{index}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div
              className={`font-display font-medium text-sm ${
                isBottleneck ? 'text-red-300' : 'text-ink-primary'
              }`}
            >
              {node.label}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-[1px] text-ink-secondary font-mono tabular-nums">
                {node.duration}
              </span>
              {isBottleneck ? (
                <span className="text-[10px] font-bold uppercase tracking-[1px] text-red-400 bg-red-500/10 border border-red-500/30 rounded px-1.5 py-0.5">
                  Bottleneck
                </span>
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              )}
            </div>
          </div>
          <div className="text-xs text-ink-secondary">{node.description}</div>

          {isBottleneck && node.alert && (
            <div className="mt-3 rounded-lg border border-red-400/30 bg-red-500/[0.06] p-3.5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle aria-hidden="true" className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[1px] text-red-400 mb-1">
                    Fathom Alert
                  </div>
                  <div className="text-xs text-ink-primary leading-relaxed italic">
                    {node.alert}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
