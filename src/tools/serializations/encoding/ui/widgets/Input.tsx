import { FileInput, RotateCcw } from 'lucide-react';
import type { Encoding, Mode } from '../../core';
import './Input.css';

type InputProps = {
  encoding: Encoding;
  mode: Mode;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function Input({ encoding, mode, value, onChange, onClear }: InputProps) {
  const encodingName = encoding === 'base64' ? 'Base64' : 'URL-encoded';
  const label = mode === 'encode' ? 'Plain text' : encodingName;
  const placeholder = mode === 'encode' ? 'Type or paste text here…' : `Paste ${encodingName} here…`;

  return (
    <section className="encoding-panel">
      <div className="encoding-panel-heading">
        <div className="encoding-panel-label">
          <FileInput size={14} /> {label}
        </div>
        <button className="encoding-small-tool" title="Clear input" onClick={onClear}>
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
      <div className="encoding-panel-status">
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
