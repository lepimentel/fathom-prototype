import { ArrowLeft, FileQuestion, Inbox } from 'lucide-react';

export function InquiryNotFound({ onBack }) {
  return (
    <div className="px-8 py-12 max-w-2xl mx-auto">
      <div className="rounded-2xl border border-white/[0.08] bg-panel/60 p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5 mx-auto">
          <FileQuestion className="w-5 h-5 text-ink-secondary" aria-hidden="true" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-[1px] text-ink-secondary mb-2">
          Inquiry not found
        </div>
        <h1 className="font-display text-2xl font-medium tracking-tight mb-3">
          That inquiry no longer exists
        </h1>
        <p className="text-ink-secondary text-sm mb-5 leading-relaxed">
          It may have been archived, deleted, or never existed in this workspace.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-cyan-300 transition shadow-accent-glow"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to overview
        </button>
      </div>
    </div>
  );
}

export function NoInquiries() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-panel/60 p-10 text-center">
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4 mx-auto">
        <Inbox className="w-5 h-5 text-accent" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-medium mb-2">No inquiries yet</h3>
      <p className="text-ink-secondary text-sm max-w-md mx-auto">
        Once you publish a question to your operations agents, active investigations will
        appear here.
      </p>
    </div>
  );
}
