import { Check, Clipboard, FileOutput } from 'lucide-react';
import type { HashAlgorithm } from '../../core';
import './Output.css';

type OutputProps = {
  algorithm: HashAlgorithm;
  value: string;
  error: string;
  busy: boolean;
  copied: boolean;
  onCopy: () => void;
};

export function Output({ algorithm, value, error, busy, copied, onCopy }: OutputProps) {
  return (
    <section className="hash-panel hash-result-panel">
      <div className="hash-panel-heading">
        <div className="hash-panel-label">
          <FileOutput size={14} /> {algorithm} digest
        </div>
        <button className="hash-small-tool" title="Copy hash" onClick={onCopy} disabled={!value}>
          {copied ? <Check size={13} /> : <Clipboard size={13} />}
        </button>
      </div>
      <div className="hash-result-body">
        {error ? (
          <div className="hash-error">
            <strong>Unable to generate hash</strong>
            <span>{error}</span>
          </div>
        ) : value ? (
          <pre>{value}</pre>
        ) : (
          <div className="hash-empty">
            <strong>Your hash will appear here</strong>
            <span>Enter text and select an algorithm.</span>
          </div>
        )}
      </div>
      <div className="hash-panel-status">
        <span>{busy ? 'PROCESSING' : value ? 'HASH READY' : 'AWAITING INPUT'}</span>
        <span>{value.length ? `${value.length} hex chars` : '—'}</span>
        <span>{copied ? 'Copied' : 'Hex'}</span>
      </div>
    </section>
  );
}
