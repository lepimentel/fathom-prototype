import { motion } from 'framer-motion';
import { Download, Sparkles } from 'lucide-react';

export default function RecommendationCard({ recommendation, archived }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative rounded-xl border border-accent/30 bg-gradient-to-b from-accent/[0.08] to-panel p-5 overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-accent blur-3xl opacity-20 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-accent">
            {archived ? 'Outcome Summary' : 'Murmuro Recommendation'}
          </div>
        </div>
        <h3 className="font-display text-lg font-medium mb-2 leading-snug">
          {recommendation.title}
        </h3>
        <p className="text-sm text-ink-secondary leading-relaxed mb-4">{recommendation.body}</p>
        <div className="space-y-2 mb-4 pt-3 border-t border-white/[0.06]">
          {recommendation.stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-xs">
              <span className="text-ink-secondary">{s.label}</span>
              <span className="font-semibold font-mono tabular-nums">{s.value}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          title="Coming soon"
          aria-disabled="true"
          disabled
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-cyan-300 transition shadow-accent-glow-sm cursor-not-allowed"
        >
          <Download aria-hidden="true" className="w-4 h-4" />
          {archived ? 'Download Final Report' : 'Download Map Context (MCP-Compatible)'}
        </button>
      </div>
    </motion.div>
  );
}
