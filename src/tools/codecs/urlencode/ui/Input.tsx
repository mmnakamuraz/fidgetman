import { FileInput, RotateCcw } from 'lucide-react';
import type { Mode } from './ControlPanel';
import './Input.css';

type InputProps = {
  mode: Mode;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function Input({ mode, value, onChange, onClear }: InputProps) {
  const label = mode === 'encode' ? 'Plain text' : 'URL-encoded text';
  const placeholder = mode === 'encode' ? 'Type or paste text here…' : 'Paste URL-encoded text here…';

  return (
    <section className="urlencode-panel">
      <div className="urlencode-panel-heading">
        <div className="urlencode-panel-label">
          <FileInput size={14} /> {label}
        </div>
        <button className="urlencode-small-tool" title="Clear input" onClick={onClear}>
          <RotateCcw size={13} />
        </button>
      </div>
      <textarea
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={`${label} input`}
      />
      <div className="urlencode-panel-status">
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
