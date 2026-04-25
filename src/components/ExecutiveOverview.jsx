import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  Mic,
  MonitorPlay,
  Users,
  Zap,
} from 'lucide-react';
import { getInquiries } from '../data/repository.js';
import { NoInquiries } from './EmptyStates.jsx';

export default function ExecutiveOverview({ onSelectInquiry }) {
  const inquiries = getInquiries();
  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-accent mb-2 flex items-center gap-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Q2 · April 2026
          </div>
          <h1 className="font-display text-4xl font-medium tracking-tight">
            Executive Overview
          </h1>
          <p className="text-ink-secondary text-sm mt-2 max-w-xl">
            Real-time operational truth across all bounded contexts. Agents are listening.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            title="Coming soon"
            aria-disabled="true"
            disabled
            className="text-xs px-3 py-2 rounded-lg border border-white/[0.08] text-ink-secondary hover:bg-white/5 hover:text-white transition cursor-not-allowed"
          >
            Last 30 days
          </button>
          <button
            type="button"
            title="Coming soon"
            aria-disabled="true"
            disabled
            className="text-xs px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition font-medium cursor-not-allowed"
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <MetricCard label="Active Agents" value="4" delta="+1 this week" icon={Users} />
        <MetricCard
          label="Total Interviews"
          value="1,248"
          delta="+82 this month"
          icon={Mic}
        />
        <MetricCard
          label="Screen Shares"
          value="462"
          delta="93% consent rate"
          icon={MonitorPlay}
        />
        <MetricCard
          label="Automations Found"
          value="34"
          delta="$1.7M est. yearly savings"
          icon={Zap}
          highlighted
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary mb-1">
            Priority Inquiries
          </div>
          <h2 className="font-display text-xl font-medium">Investigations in flight</h2>
        </div>
        <button
          type="button"
          title="Coming soon"
          aria-disabled="true"
          disabled
          className="text-xs text-ink-secondary hover:text-white inline-flex items-center gap-1 transition cursor-not-allowed"
        >
          View all <ChevronRight aria-hidden="true" className="w-3 h-3" />
        </button>
      </div>

      {inquiries.length === 0 ? (
        <NoInquiries />
      ) : (
        <div className="space-y-2">
          {inquiries.map((inq, i) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <InquiryRow inquiry={inq} onClick={() => onSelectInquiry(inq.id)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, delta, icon: Icon, highlighted }) {
  return (
    <div
      className={`relative rounded-xl border p-5 overflow-hidden transition ${
        highlighted
          ? 'border-accent/30 bg-gradient-to-br from-accent/[0.08] to-panel/80'
          : 'border-white/[0.08] bg-panel/60 hover:border-white/[0.12]'
      }`}
    >
      {highlighted && (
        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-accent blur-3xl opacity-20 pointer-events-none" />
      )}
      <div className="flex items-center justify-between mb-4 relative">
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center ${
            highlighted ? 'bg-accent/15 text-accent' : 'bg-white/5 text-ink-secondary'
          }`}
        >
          <Icon aria-hidden="true" className="w-4 h-4" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary">
          {label}
        </div>
      </div>
      <div className="font-mono text-4xl font-semibold tabular-nums mb-1 leading-none">
        {value}
      </div>
      <div className={`text-xs ${highlighted ? 'text-accent' : 'text-ink-secondary'}`}>
        {delta}
      </div>
    </div>
  );
}

function InquiryRow({ inquiry, onClick }) {
  const isCompleted = inquiry.status === 'completed';
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-white/[0.08] bg-panel/60 hover:bg-panel hover:border-white/[0.18] transition-all p-5 group flex items-start gap-5"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <StatusBadge status={inquiry.status} />
          {inquiry.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium uppercase tracking-[1px] text-ink-secondary border border-white/10 rounded px-1.5 py-0.5"
            >
              {t}
            </span>
          ))}
          {inquiry.severity === 'high' && !isCompleted && (
            <span className="text-[10px] font-semibold uppercase tracking-[1px] text-red-400 bg-red-500/10 border border-red-500/30 rounded px-1.5 py-0.5">
              High signal
            </span>
          )}
        </div>
        <div className="font-display font-medium text-base text-ink-primary group-hover:text-white mb-1">
          {inquiry.question}
        </div>
        <div className="text-xs text-ink-secondary">
          Owned by <span className="text-ink-primary/80">{inquiry.owner}</span> ·{' '}
          {inquiry.timeRange}
        </div>
      </div>

      <div className="w-56 hidden md:flex flex-col items-end gap-2 flex-shrink-0">
        <div className="text-xs text-ink-secondary font-mono tabular-nums">
          <span className="text-ink-primary font-semibold">{inquiry.interviewsDone}</span>
          {' / '}
          {inquiry.interviewsTarget} interviews
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className={`h-full ${
              isCompleted
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-accent to-cyan-300'
            }`}
            style={{ width: `${inquiry.progress}%` }}
          />
        </div>
      </div>

      <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-ink-secondary group-hover:text-accent mt-1 transition flex-shrink-0" />
    </button>
  );
}

function StatusBadge({ status }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">
        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-emerald-400" />
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1px] text-accent bg-accent/10 border border-accent/30 rounded-full px-2 py-0.5">
      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent animate-pulse" />
      Investigating
    </span>
  );
}
