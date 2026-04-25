import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import InsightCard from './inquiry/InsightCard.jsx';
import MetadataBar from './inquiry/MetadataBar.jsx';
import ProcessNode from './inquiry/ProcessNode.jsx';
import RecommendationCard from './inquiry/RecommendationCard.jsx';

export default function InquiryDetail({ inquiry, onBack }) {
  const isCompleted = inquiry.status === 'completed';

  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="text-xs text-ink-secondary hover:text-white inline-flex items-center gap-1.5 mb-5 transition"
      >
        <ArrowLeft aria-hidden="true" className="w-3 h-3" />
        Back to overview
      </button>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <div
            className={`text-[11px] font-bold uppercase tracking-[1px] mb-2 flex items-center gap-2 ${
              isCompleted ? 'text-emerald-400' : 'text-accent'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? 'bg-emerald-400' : 'bg-accent animate-pulse'
              }`}
            />
            {isCompleted ? 'Archived' : 'Inquiry'} ·{' '}
            <span className="font-mono">
              #{(inquiry?.id ?? 0).toString().padStart(4, '0')}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight max-w-3xl leading-tight">
            {inquiry.question}
          </h1>
          <div className="text-sm text-ink-secondary mt-2">
            Owned by <span className="text-ink-primary">{inquiry.owner}</span> ·{' '}
            {inquiry.timeRange}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {isCompleted ? (
            <button
              type="button"
              title="Coming soon"
              aria-disabled="true"
              disabled
              className="text-xs px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition font-medium cursor-not-allowed"
            >
              Re-open Inquiry
            </button>
          ) : (
            <>
              <button
                type="button"
                title="Coming soon"
                aria-disabled="true"
                disabled
                className="text-xs px-3 py-2 rounded-lg border border-white/[0.08] text-ink-secondary hover:bg-white/5 hover:text-white transition cursor-not-allowed"
              >
                Share
              </button>
              <button
                type="button"
                title="Coming soon"
                aria-disabled="true"
                disabled
                className="text-xs px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition font-medium cursor-not-allowed"
              >
                Pause Inquiry
              </button>
            </>
          )}
        </div>
      </div>

      <MetadataBar inquiry={inquiry} />

      {isCompleted ? <ArchivedView inquiry={inquiry} /> : <ActiveView inquiry={inquiry} />}
    </div>
  );
}

function ActiveView({ inquiry }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary mb-1">
              Operational Map
            </div>
            <h2 className="font-display text-lg font-medium">{inquiry.workflowTitle}</h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-ink-secondary">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Smooth
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-red-400" /> Bottleneck
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-panel/60 p-6">
          {inquiry.processNodes && inquiry.processNodes.length > 0 ? (
            inquiry.processNodes.map((node, idx) => (
              <ProcessNode
                key={node.id}
                node={node}
                isLast={idx === inquiry.processNodes.length - 1}
                index={idx + 1}
              />
            ))
          ) : (
            <div className="text-center py-8 text-sm text-ink-secondary">
              Operational map is being assembled — interviews still in progress.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <RecommendationCard recommendation={inquiry.recommendation} />
        <div>
          <div className="mb-3">
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary mb-1">
              Voice signal
            </div>
            <h2 className="font-display text-lg font-medium">Recent interviews</h2>
          </div>
          <div className="space-y-3">
            {inquiry.insights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
              >
                <InsightCard insight={insight} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchivedView({ inquiry }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.06] to-panel p-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-emerald-400">
              Inquiry Archived
            </div>
          </div>
          <h2 className="font-display text-xl font-medium mb-2">{inquiry.workflowTitle}</h2>
          <p className="text-sm text-ink-secondary leading-relaxed">{inquiry.summary}</p>
        </div>

        <div>
          <div className="mb-3">
            <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary mb-1">
              Voice signal
            </div>
            <h2 className="font-display text-lg font-medium">Key interviews</h2>
          </div>
          <div className="space-y-3">
            {inquiry.insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <RecommendationCard recommendation={inquiry.recommendation} archived />
      </div>
    </div>
  );
}
