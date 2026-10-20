import { Check, Clipboard, FileOutput } from 'lucide-react';

type OutputProps = {
  value: string;
  error: string;
  busy: boolean;
  copied: boolean;
  onCopy: () => void;
};

export function Output({ value, error, busy, copied, onCopy }: OutputProps) {
  return (
    <section className="bcrypt-panel">
      <div className="bcrypt-panel-heading">
        <div className="bcrypt-panel-label">
          <FileOutput size={14} /> bcrypt hash
        </div>
        <button
          className="bcrypt-small-tool"
          title="Copy hash"
          aria-label="Copy hash"
          onClick={onCopy}
          disabled={!value}
        >
          {copied ? <Check size={13} /> : <Clipboard size={13} />}
        </button>
      </div>
      <div className="bcrypt-result-body">
        {error ? (
          <div className="bcrypt-error">
            <strong>Unable to generate hash</strong>
            <span>{error}</span>
          </div>
        ) : value ? (
          <pre>{value}</pre>
        ) : (
          <div className="bcrypt-empty">
            <strong>Your hash will appear here</strong>
            <span>Enter text and select a cost factor.</span>
          </div>
        )}
      </div>
      <div className="bcrypt-panel-status">
        <span>{busy ? 'PROCESSING' : value ? 'HASH READY' : 'AWAITING INPUT'}</span>
        <span>{value ? `${value.length} chars` : '—'}</span>
        <span>{copied ? 'Copied' : 'Encoded'}</span>
      </div>
    </section>
  );
}
