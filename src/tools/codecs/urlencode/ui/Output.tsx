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
  const label = mode === 'encode' ? 'URL-encoded text' : 'Decoded text';

  return <section className="urlencode-panel urlencode-result-panel">
    <div className="urlencode-panel-heading">
      <div className="urlencode-panel-label"><FileOutput size={14} /> {label}</div>
      <button className="urlencode-small-tool" title="Copy result" onClick={onCopy} disabled={!value}>{copied ? <Check size={13} /> : <Clipboard size={13} />}</button>
    </div>
    <div className="urlencode-result-body">
      {error ? <div className="urlencode-error"><strong>Unable to convert input</strong><span>{error}</span></div> : value !== '' ? <pre>{value}</pre> : <div className="urlencode-empty"><strong>Your result will appear here</strong><span>Choose an operation and click Convert.</span></div>}
    </div>
    <div className="urlencode-panel-status"><span>{value ? 'RESULT READY' : 'AWAITING INPUT'}</span><span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span><span>{copied ? 'Copied' : 'UTF-8'}</span></div>
  </section>;
}
