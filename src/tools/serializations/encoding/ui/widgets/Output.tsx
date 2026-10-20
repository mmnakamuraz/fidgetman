import { Check, Clipboard, FileOutput } from 'lucide-react';
import type { Encoding, Mode } from '../../core';
import './Output.css';

type OutputProps = {
  encoding: Encoding;
  mode: Mode;
  value: string;
  error: string;
  copied: boolean;
  onCopy: () => void;
};

export function Output({ encoding, mode, value, error, copied, onCopy }: OutputProps) {
  const label = mode === 'encode' ? (encoding === 'base64' ? 'Base64' : 'URL-encoded') : 'Decoded text';

  return (
    <section className="encoding-panel encoding-result-panel">
      <div className="encoding-panel-heading">
        <div className="encoding-panel-label">
          <FileOutput size={14} /> {label}
        </div>
        <button className="encoding-small-tool" title="Copy result" onClick={onCopy} disabled={!value}>
          {copied ? <Check size={13} /> : <Clipboard size={13} />}
        </button>
      </div>
      <div className="encoding-result-body">
        {error ? (
          <div className="encoding-error">
            <strong>Unable to convert input</strong>
            <span>{error}</span>
          </div>
        ) : value !== '' ? (
          <pre>{value}</pre>
        ) : (
          <div className="encoding-empty">
            <strong>Your result will appear here</strong>
            <span>Choose an operation and click Convert.</span>
          </div>
        )}
      </div>
      <div className="encoding-panel-status">
        <span>{value ? 'RESULT READY' : 'AWAITING INPUT'}</span>
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>{copied ? 'Copied' : 'UTF-8'}</span>
      </div>
    </section>
  );
}
