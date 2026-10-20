import { FileInput, RotateCcw } from 'lucide-react';

type InputProps = {
  value: string;
  inputBytes: number;
  inputError: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function Input({ value, inputBytes, inputError, onChange, onClear }: InputProps) {
  return (
    <section className="bcrypt-panel">
      <div className="bcrypt-panel-heading">
        <div className="bcrypt-panel-label">
          <FileInput size={14} /> Input text
        </div>
        <button className="bcrypt-small-tool" title="Clear input" aria-label="Clear input" onClick={onClear}>
          <RotateCcw size={13} />
        </button>
      </div>
      <textarea
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type or paste text here…"
        aria-label="Input text"
        aria-invalid={Boolean(inputError)}
        aria-describedby="bcrypt-input-status"
      />
      <div className="bcrypt-panel-status" id="bcrypt-input-status" aria-live="polite">
        <span>{inputError || `${inputBytes} / 72 UTF-8 bytes`}</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
