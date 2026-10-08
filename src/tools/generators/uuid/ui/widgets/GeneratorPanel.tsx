import { Copy, RefreshCw } from 'lucide-react';
import './GeneratorPanel.css';

type GeneratorPanelProps = {
  value: string;
  history: string[];
  copied: boolean;
  onGenerate: () => void;
  onCopy: () => void;
};

export function GeneratorPanel({ value, history, copied, onGenerate, onCopy }: GeneratorPanelProps) {
  return (
    <section className="generator-card uuid-panel">
      <div className="generator-card-heading">
        <div>
          <span className="generator-kicker">RANDOM IDENTIFIER</span>
          <h2>UUID v4</h2>
        </div>
        <button className="generator-primary" onClick={onGenerate}>
          <RefreshCw size={15} /> Generate UUID
        </button>
      </div>
      <div className="generator-result-row">
        <code>{value || 'Click Generate UUID to create one'}</code>
        <button className="generator-icon-button" onClick={onCopy} disabled={!value} aria-label="Copy UUID">
          <Copy size={16} />
        </button>
      </div>
      {copied && <span className="generator-success">Copied to clipboard</span>}
      <div className="uuid-history">
        <h3>
          Recent UUIDs <span>{history.length}/5</span>
        </h3>
        {history.length ? (
          history.map((uuid) => <code key={uuid}>{uuid}</code>)
        ) : (
          <p>Your five most recent UUIDs will appear here.</p>
        )}
      </div>
    </section>
  );
}
