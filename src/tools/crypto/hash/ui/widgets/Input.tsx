import { FileInput, RotateCcw } from 'lucide-react';
import './Input.css';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function Input({ value, onChange, onClear }: InputProps) {
  return (
    <section className="hash-panel">
      <div className="hash-panel-heading">
        <div className="hash-panel-label">
          <FileInput size={14} /> Input text
        </div>
        <button className="hash-small-tool" title="Clear input" onClick={onClear}>
          <RotateCcw size={13} />
        </button>
      </div>
      <textarea
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type or paste text here…"
        aria-label="Input text"
      />
      <div className="hash-panel-status">
        <span>{new Intl.NumberFormat().format(new Blob([value]).size)} bytes</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
