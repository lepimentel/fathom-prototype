import { motion } from 'framer-motion';
import { ArrowRight, Cog, MessageSquareQuote, Mic2, Network } from 'lucide-react';

const presets = {
  map: {
    icon: Network,
    eyebrow: 'Operational Map · Beta',
    title: 'A live map of how your company actually works',
    body:
      'Cross-inquiry process graph. Watch dependencies, ownership, and bottlenecks emerge across every team Murmuro has interviewed.',
    cta: 'Get notified when it ships',
    bullets: [
      'Federated graph across all active and completed inquiries',
      'Hover any node to see who, why, and how long',
      'Export as MCP-compatible context for Claude / Cursor / Linear agents',
    ],
  },
  voices: {
    icon: MessageSquareQuote,
    eyebrow: 'Employee Voices · Beta',
    title: 'Searchable index of every interview transcript',
    body:
      'Find the exact moment someone described a workaround, named a friction, or revealed tribal knowledge. Filter by team, role, sentiment, or topic.',
    cta: 'Get notified when it ships',
    bullets: [
      'Semantic search across 1,248 voice interviews',
      'Auto-tagged for workaround / friction / aha-moment',
      'Redacted quote attribution with consent metadata',
    ],
  },
  agents: {
    icon: Mic2,
    eyebrow: 'Interview Agents · Beta',
    title: 'Manage your fleet of voice interviewers',
    body:
      'Configure interview personas, scripts, and call windows. Track agent capacity, completion rate, and average transcript quality across every inquiry.',
    cta: 'Get notified when it ships',
    bullets: [
      'Per-inquiry agent assignment with timezone-aware scheduling',
      'Custom interview scripts with branching follow-ups',
      'Real-time call quality and consent capture metrics',
    ],
  },
  settings: {
    icon: Cog,
    eyebrow: 'Workspace Settings',
    title: 'Workspace, integrations, and access policies',
    body:
      'Connect SSO, configure integrations (Slack, Linear, Jira), set retention policies, and manage member roles for your Murmuro workspace.',
    cta: 'Get notified when it ships',
    bullets: [
      'SSO via Okta, Azure AD, Google Workspace',
      'MCP server configuration for downstream Claude / Cursor agents',
      'Per-inquiry redaction rules and PII consent windows',
    ],
  },
};

export default function ComingSoonPanel({ kind }) {
  const preset = presets[kind] ?? presets.map;
  const Icon = preset.icon;

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-accent/[0.06] to-panel/60 p-10 overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-accent blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-accent blur-3xl opacity-5 pointer-events-none" />
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-5">
            <Icon aria-hidden="true" className="w-5 h-5 text-accent" />
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-accent mb-2 flex items-center gap-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {preset.eyebrow}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-4 max-w-2xl leading-tight">
            {preset.title}
          </h1>
          <p className="text-ink-secondary text-base max-w-xl mb-6 leading-relaxed">{preset.body}</p>

          <ul className="space-y-2 mb-8 max-w-xl">
            {preset.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink-primary/80">
                <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent/15 transition font-medium text-sm cursor-not-allowed"
            title="Coming soon"
            aria-disabled="true"
            disabled
          >
            {preset.cta}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
