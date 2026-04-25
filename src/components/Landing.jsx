import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const onEnter = () => navigate('/dashboard');
  return (
    <div className="min-h-screen bg-bg text-ink-primary relative overflow-hidden">
      <div className="absolute inset-0 grid-radial opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-accent blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute top-[35%] -right-40 w-[480px] h-[480px] rounded-full bg-accent blur-3xl opacity-[0.06] pointer-events-none" />

      <nav className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
            <BrainCircuit aria-hidden="true" className="w-4 h-4 text-accent" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Fathom</span>
        </div>
        <div className="flex items-center gap-7 text-sm text-ink-secondary">
          {['Product', 'Customers', 'Pricing', 'Research'].map((item) => (
            <button
              key={item}
              type="button"
              className="hover:text-white transition cursor-not-allowed"
              title="Coming soon"
            aria-disabled="true"
            disabled
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            className="text-ink-primary hover:text-accent transition font-medium cursor-not-allowed"
            title="Coming soon"
          aria-disabled="true"
          disabled
          >
            Sign in
          </button>
        </div>
      </nav>

      <section className="relative z-10 px-6 py-20 md:py-28 max-w-6xl mx-auto text-center">
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-white/10 bg-white/[0.03]"
        >
          <Sparkles aria-hidden="true" className="w-3 h-3 text-accent" />
          <span className="text-xs text-ink-secondary">
            Announcing our Series A — $40M led by Sequoia
          </span>
          <ArrowRight aria-hidden="true" className="w-3 h-3 text-ink-secondary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display font-semibold text-5xl md:text-7xl tracking-tight leading-[1.04] mb-7"
        >
          Figure out how your<br />
          company{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent italic">
            actually
          </span>{' '}
          works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-ink-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fathom conducts 20-minute voice interviews with your employees, observes their
          screens, and assembles a living operational map — exposing the workarounds,
          bottlenecks, and tribal knowledge no org chart will ever show you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-cyan-300 transition-all shadow-accent-glow-lg"
          >
            Access Dashboard
            <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm text-ink-primary hover:bg-white/5 hover:border-white/20 transition cursor-not-allowed"
            title="Coming soon"
          aria-disabled="true"
          disabled
          >
            Watch demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[1px] text-ink-secondary/70"
        >
          <span>Trusted by</span>
          <span className="font-display text-ink-secondary">SCALE.AI</span>
          <span className="font-display text-ink-secondary">RAMP</span>
          <span className="font-display text-ink-secondary">RETOOL</span>
          <span className="font-display text-ink-secondary">VANTA</span>
          <span className="font-display text-ink-secondary">LINEAR</span>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="relative"
        >
          <div className="absolute -inset-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-2xl blur-xl opacity-70" />
          <div className="relative rounded-2xl border border-white/[0.08] bg-panel/80 backdrop-blur-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="ml-4 flex-1 h-7 rounded-md bg-black/40 border border-white/[0.06] flex items-center px-3 text-[11px] text-ink-secondary font-mono">
                fathom.ai/inquiry/procurement-cycle
              </div>
              <div className="text-[10px] uppercase tracking-wider text-ink-secondary">
                Live · <span className="font-mono">#0042</span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-[11px] font-bold uppercase tracking-[1px] text-accent mb-3 inline-flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Active Inquiry
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-7">
                Why does the procurement cycle take{' '}
                <span className="text-accent">14 days longer</span> than benchmark?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Interviews', value: '47', delta: '+12 this week', icon: Users, accent: false },
                  { label: 'Bottlenecks Found', value: '3', delta: 'Vendor approval loop', icon: Clock, accent: true },
                  { label: 'Estimated Savings', value: '$2.4M', delta: 'Per year, conservative', icon: TrendingUp, accent: false },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-white/[0.06] bg-black/30 p-4 hover:bg-black/40 hover:border-white/[0.12] transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <m.icon className={`w-4 h-4 ${m.accent ? 'text-red-400' : 'text-accent'}`} />
                      <span className="text-[10px] uppercase tracking-[1px] text-ink-secondary">
                        {m.label}
                      </span>
                    </div>
                    <div className="font-display text-3xl font-semibold mb-1 tabular-nums">
                      {m.value}
                    </div>
                    <div className={`text-xs ${m.accent ? 'text-red-400/80' : 'text-ink-secondary'}`}>
                      {m.delta}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 px-8 py-8 border-t border-white/[0.06] text-xs text-ink-secondary flex items-center justify-between">
        <div>© 2026 Fathom Labs Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Security', 'SOC 2'].map((item) => (
            <button
              key={item}
              type="button"
              className="hover:text-white transition cursor-not-allowed"
              title="Coming soon"
            aria-disabled="true"
            disabled
            >
              {item}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
