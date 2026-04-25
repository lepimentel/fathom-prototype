import { Clock, FileText, Mic, MonitorPlay } from 'lucide-react';
import Stat from './Stat.jsx';

const fallbackAvatarColors = [
  'bg-purple-500',
  'bg-orange-500',
  'bg-emerald-500',
  'bg-blue-500',
  'bg-pink-500',
];

function avatarColorFromInsight(insight, index) {
  // Insight `color` is a tag with text + bg + border classes; extract just the bg- token if present.
  const bgMatch = insight?.color?.match(/bg-[a-z]+-500/);
  if (bgMatch) return `${bgMatch[0]} text-white`;
  return `${fallbackAvatarColors[index % fallbackAvatarColors.length]} text-white`;
}

export default function MetadataBar({ inquiry }) {
  const { metadataStats: stats, status, timeRange, insights = [] } = inquiry;
  const isCompleted = status === 'completed';

  const avatars = insights.slice(0, 5).map((insight, i) => ({
    initials: insight.initials,
    colorClass: avatarColorFromInsight(insight, i),
  }));
  const overflow = stats.interviews - avatars.length;

  return (
    <div className="flex items-center gap-6 px-5 py-3.5 rounded-xl border border-white/[0.08] bg-panel/60 mb-8 flex-wrap">
      <div className="flex items-center gap-3">
        {avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.map((a) => (
              <div
                key={a.initials}
                className={`w-7 h-7 rounded-full border-2 border-bg flex items-center justify-center text-[10px] font-semibold ${a.colorClass}`}
              >
                {a.initials}
              </div>
            ))}
            {overflow > 0 && (
              <div className="w-7 h-7 rounded-full border-2 border-bg bg-white/10 flex items-center justify-center text-[10px] font-semibold text-ink-secondary">
                +{overflow}
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-ink-secondary">
          <span className="text-white font-semibold font-mono tabular-nums">
            {stats.interviews}
          </span>{' '}
          employees interviewed
        </div>
      </div>
      <div className="h-5 w-px bg-white/10 hidden md:block" />
      <Stat icon={Mic} value={stats.interviews.toString()} label="Interviews" />
      <Stat icon={MonitorPlay} value={stats.screenShares.toString()} label="Screen shares" />
      <Stat icon={Clock} value={stats.audioHours} label="Of audio" />
      <Stat icon={FileText} value={stats.mapsGenerated.toString()} label="Maps generated" />
      <div className="ml-auto text-xs text-ink-secondary" aria-live="polite">
        {isCompleted ? 'Closed' : 'Last updated'} ·{' '}
        <span className="text-white">{isCompleted ? timeRange : '2 hours ago'}</span>
      </div>
    </div>
  );
}
