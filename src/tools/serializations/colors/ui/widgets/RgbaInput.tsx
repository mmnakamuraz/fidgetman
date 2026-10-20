import './RgbaInput.css';

type RgbaInputProps = {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export function RgbaInput({ value, error, onChange }: RgbaInputProps) {
  return (
    <label className="colors-field">
      <span className="colors-field-label">RGBA COLOR</span>
      <input
        className={error ? 'colors-field-invalid' : ''}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="rgba(255, 255, 255, 1)"
        spellCheck={false}
        autoComplete="off"
        aria-label="RGBA color"
        aria-invalid={error}
      />
      <span className="colors-field-hint">RGB channels 0–255 · alpha 0–1</span>
    </label>
  );
}
