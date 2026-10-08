import { FileInput, RotateCcw } from 'lucide-react';
import type { CompressionMode } from '../../core';
import './Input.css';

type InputProps = {
  mode: CompressionMode;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function Input({ mode, value, onChange, onClear }: InputProps) {
  const label = mode === 'compress' ? 'Text input' : 'Gzip + Base64 input';
  return (
    <section className="gzip-panel">
      <div className="gzip-panel-heading">
        <div className="gzip-panel-label">
          <FileInput size={14} /> {label}
        </div>
        <button className="gzip-small-tool" title="Clear input" onClick={onClear}>
          <RotateCcw size={13} />
        </button>
      </div>
      <textarea
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={mode === 'compress' ? 'Type or paste text here…' : 'Paste Base64-encoded Gzip data here…'}
        aria-label={label}
      />
      <div className="gzip-panel-status">
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>{mode === 'compress' ? 'UTF-8' : 'Base64'}</span>
      </div>
    </section>
  );
}
