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
  const label = mode === 'encode' ? 'Plain text' : 'Base64';
  const placeholder = mode === 'encode' ? 'Type or paste text here…' : 'Paste Base64 here…';

  return (
    <section className="base64-panel">
      <div className="base64-panel-heading">
        <div className="base64-panel-label">
          <FileInput size={14} /> {label}
        </div>
        <button className="base64-small-tool" title="Clear input" onClick={onClear}>
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
      <div className="base64-panel-status">
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
