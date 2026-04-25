import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  BrainCircuit,
  Cog,
  LayoutDashboard,
  MessageSquareQuote,
  Mic2,
  Network,
  Plus,
  Settings,
  X,
} from 'lucide-react';
import { getActiveInquiries } from '../data/repository.js';

const navItems = [
  { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'map', label: 'Operational Map', icon: Network, to: '/dashboard/map' },
  { id: 'voices', label: 'Employee Voices', icon: MessageSquareQuote, to: '/dashboard/voices' },
  { id: 'agents', label: 'Interview Agents', icon: Mic2, to: '/dashboard/agents' },
  { id: 'settings', label: 'Settings', icon: Cog, to: '/dashboard/settings' },
];

export default function Sidebar({
  onBackToLanding,
  onSelectInquiry,
  onNavigate,
  mobileOpen,
  onMobileClose,
}) {
  const activeInquiries = getActiveInquiries();
  const location = useLocation();
  const closeBtnRef = useRef(null);

  const activeNavTo =
    navItems
      .map((n) => n.to)
      .filter((to) => location.pathname === to || location.pathname.startsWith(to + '/'))
      .sort((a, b) => b.length - a.length)[0] ?? '/dashboard';

  const activeInquiryId = (() => {
    const m = location.pathname.match(/\/dashboard\/inquiry\/(\d+)/);
    return m ? Number.parseInt(m[1], 10) : null;
  })();

  // Body scroll lock while drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  // Escape closes + focus close button on open
  useEffect(() => {
    if (!mobileOpen) return;
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onMobileClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      <button
        type="button"
        onClick={onMobileClose}
        aria-label="Close navigation"
        tabIndex={mobileOpen ? 0 : -1}
        className={`md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        aria-label="Primary navigation"
        // React 18 workaround: empty string emits `inert=""` (HTML treats any presence as truthy);
        // `undefined` removes the attribute. React 19 will accept booleans natively.
        inert={!mobileOpen ? '' : undefined}
        className={`fixed md:static inset-y-0 left-0 z-40 w-[260px] md:w-[240px] flex-shrink-0 border-r border-white/[0.06] bg-bg-deep/95 backdrop-blur-xl flex flex-col transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:!translate-x-0'
        }`}
      >
        <div className="px-5 py-5 flex items-center justify-between border-b border-white/[0.06]">
          <button
            type="button"
            onClick={onBackToLanding}
            className="flex items-center gap-2.5 group"
            title="Back to landing page"
          >
            <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition">
              <BrainCircuit aria-hidden="true" className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-display font-semibold tracking-tight">Fathom</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[1px] text-ink-secondary border border-white/10 rounded px-1.5 py-0.5 font-mono">
              v3.4
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onMobileClose}
              className="md:hidden min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-ink-secondary hover:text-white"
              aria-label="Close navigation"
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          <button
            type="button"
            title="Coming soon"
            aria-disabled="true"
            disabled
            className="w-full flex items-center justify-center gap-2 px-3 py-3 md:py-2.5 min-h-[44px] md:min-h-0 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-cyan-300 transition shadow-accent-glow cursor-not-allowed"
          >
            <Plus aria-hidden="true" className="w-4 h-4" strokeWidth={2.5} />
            New Inquiry
          </button>
        </div>

        <div className="px-4 pt-6">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary/70 mb-2 px-2">
            Workspace
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavTo === item.to;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.to)}
                  className={`w-full flex items-center gap-3 px-2.5 py-3 md:py-2 min-h-[44px] md:min-h-0 rounded-md text-sm transition ${
                    isActive
                      ? 'bg-white/[0.06] text-ink-primary border border-white/[0.08]'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 pt-7 flex-1 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary/70 mb-3 px-2 flex items-center justify-between">
            <span>Active Inquiries</span>
            <span className="text-[10px] text-ink-secondary/50 font-mono tabular-nums">{activeInquiries.length}</span>
          </div>
          <div className="space-y-1.5">
            {activeInquiries.map((inq) => {
              const isActive = activeInquiryId === inq.id;
              return (
                <button
                  key={inq.id}
                  type="button"
                  onClick={() => onSelectInquiry(inq.id)}
                  className={`w-full text-left p-3 md:p-2.5 min-h-[44px] md:min-h-0 rounded-md transition group border ${
                    isActive
                      ? 'bg-white/[0.05] border-white/[0.08]'
                      : 'border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]'
                  }`}
                >
                  <div className="text-xs text-ink-primary line-clamp-2 mb-2 leading-snug group-hover:text-white">
                    {inq.question}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-cyan-300"
                        style={{ width: `${inq.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-ink-secondary font-mono tabular-nums">{inq.progress}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/[0.06] p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 min-h-[44px] md:min-h-0 px-2 -ml-2 text-xs text-ink-secondary hover:text-white transition"
          >
            <ArrowLeft aria-hidden="true" className="w-3 h-3" />
            Landing
          </button>
          <button
            type="button"
            title="Settings (coming soon)"
            aria-label="Settings (coming soon)"
            aria-disabled="true"
            disabled
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-secondary hover:text-white transition cursor-not-allowed"
          >
            <Settings aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
