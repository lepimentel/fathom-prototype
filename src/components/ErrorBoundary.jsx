import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[Murmuro ErrorBoundary]', error, info);
    }
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="px-8 py-12 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-500/[0.06] to-panel/60 p-8">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-5">
            <AlertTriangle aria-hidden="true" className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-red-400 mb-2">
            Something broke
          </div>
          <h1 className="font-display text-2xl font-medium tracking-tight mb-3">
            We couldn&rsquo;t render this view
          </h1>
          <p className="text-ink-secondary text-sm mb-5 leading-relaxed">
            {this.state.error?.message || 'Unexpected error in the dashboard tree.'}
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-cyan-300 transition shadow-accent-glow"
          >
            <RefreshCw aria-hidden="true" className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }
}
