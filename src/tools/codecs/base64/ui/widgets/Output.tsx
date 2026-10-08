import { Check, Clipboard, FileOutput } from 'lucide-react';
import type { Mode } from './ControlPanel';
import './Output.css';

type OutputProps = {
  mode: Mode;
  value: string;
  error: string;
  copied: boolean;
  onCopy: () => void;
};

export function Output({ mode, value, error, copied, onCopy }: OutputProps) {
  const label = mode === 'encode' ? 'Base64' : 'Decoded text';

  return (
    <section className="base64-panel base64-result-panel">
      <div className="base64-panel-heading">
        <div className="base64-panel-label">
          <FileOutput size={14} /> {label}
        </div>
        <button className="base64-small-tool" title="Copy result" onClick={onCopy} disabled={!value}>
          {copied ? <Check size={13} /> : <Clipboard size={13} />}
        </button>
      </div>
      <div className="base64-result-body">
        {error ? (
          <div className="base64-error">
            <strong>Unable to convert input</strong>
            <span>{error}</span>
          </div>
        ) : value !== '' ? (
          <pre>{value}</pre>
        ) : (
          <div className="base64-empty">
            <strong>Your result will appear here</strong>
            <span>Choose an operation and click Convert.</span>
          </div>
        )}
      </div>
      <div className="base64-panel-status">
        <span>{value ? 'RESULT READY' : 'AWAITING INPUT'}</span>
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>{copied ? 'Copied' : 'UTF-8'}</span>
      </div>
    </section>
  );
}
