import type { TextMetrics } from '../../core';

type Props = { metrics: TextMetrics };

export function Output({ metrics }: Props) {
  return <section className="text-panel metrics-output-panel">
    <div className="text-panel-heading"><div><span className="text-panel-kicker">LIVE ANALYSIS</span><h2>Metrics</h2></div></div>
    <div className="metrics-grid">
      <Metric label="Characters" value={metrics.characterCount} />
      <Metric label="Words" value={metrics.wordCount} />
      <Metric label="Newlines" value={metrics.newlineCount} />
      <Metric label="Most repeated word" value={metrics.mostRepeatedWord ? `${metrics.mostRepeatedWord} (${metrics.mostRepeatedWordCount})` : 'None'} />
    </div>
  </section>;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>;
}
