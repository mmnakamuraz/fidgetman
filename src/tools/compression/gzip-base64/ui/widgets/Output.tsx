import { Check, Clipboard, FileOutput } from 'lucide-react';
import type { CompressionMode } from '../../core';
import './Output.css';

type OutputProps = {
  mode: CompressionMode;
  value: string;
  error: string;
  busy: boolean;
  copied: boolean;
  onCopy: () => void;
};

export function Output({ mode, value, error, busy, copied, onCopy }: OutputProps) {
  const label = mode === 'compress' ? 'Gzip + Base64 output' : 'Decompressed text';
  return <section className="gzip-panel gzip-result-panel">
    <div className="gzip-panel-heading"><div className="gzip-panel-label"><FileOutput size={14} /> {label}</div><button className="gzip-small-tool" title="Copy result" onClick={onCopy} disabled={!value}>{copied ? <Check size={13} /> : <Clipboard size={13} />}</button></div>
    <div className="gzip-result-body">{error ? <div className="gzip-error"><strong>Unable to convert input</strong><span>{error}</span></div> : value ? <pre>{value}</pre> : <div className="gzip-empty"><strong>Your result will appear here</strong><span>Choose an operation and click Convert.</span></div>}</div>
    <div className="gzip-panel-status"><span>{busy ? 'PROCESSING' : value ? 'RESULT READY' : 'AWAITING INPUT'}</span><span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span><span>{copied ? 'Copied' : mode === 'compress' ? 'Base64' : 'UTF-8'}</span></div>
  </section>;
}
