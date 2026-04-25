import { forwardRef } from 'react';
import { Bell, Menu, Search } from 'lucide-react';

const Header = forwardRef(function Header({ onMenuToggle }, ref) {
  return (
    <header className="h-16 flex-shrink-0 border-b border-white/[0.06] px-4 md:px-6 flex items-center justify-between gap-3 md:gap-4 bg-bg/80 backdrop-blur-xl sticky top-0 z-20">
      <button
        ref={ref}
        type="button"
        onClick={onMenuToggle}
        aria-label="Open navigation"
        className="md:hidden min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-lg text-ink-secondary hover:text-white hover:bg-white/[0.05] transition"
      >
        <Menu aria-hidden="true" className="w-5 h-5" />
      </button>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex-1 max-w-2xl"
      >
        <label htmlFor="ops-search" className="sr-only">
          Search operations
        </label>
        <div className="relative group">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary group-focus-within:text-accent transition"
          />
          <input
            id="ops-search"
            name="ops-search"
            type="search"
            placeholder="Ask a question about your operations..."
            className="w-full pl-10 pr-12 sm:pr-16 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm placeholder:text-ink-secondary focus-visible:outline-none focus-visible:border-accent/50 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-accent/40 transition"
          />
          <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-secondary bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono">
            ⌘ K
          </kbd>
        </div>
      </form>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          className="relative min-w-[44px] min-h-[44px] md:w-9 md:h-9 md:min-w-0 md:min-h-0 rounded-lg border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] flex items-center justify-center transition cursor-not-allowed"
          aria-label="Notifications (coming soon)"
          title="Coming soon"
          aria-disabled="true"
          disabled
        >
          <Bell aria-hidden="true" className="w-4 h-4 text-ink-secondary" />
          {/* notification badge intentionally suppressed while button is disabled */}
        </button>
        <div className="flex items-center gap-2.5 pl-2 md:pl-3 md:border-l border-white/[0.06]">
          <div
            className="w-9 h-9 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-xs font-semibold text-bg"
            aria-label="Leandro Pimentel avatar"
          >
            LP
          </div>
          <div className="text-xs hidden md:block">
            <div className="font-medium text-ink-primary">Leandro P.</div>
            <div className="text-ink-secondary text-[11px]">VP Operations</div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
