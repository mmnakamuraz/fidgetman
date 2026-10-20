import './HexInput.css';

type HexInputProps = {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export function HexInput({ value, error, onChange }: HexInputProps) {
  return (
    <label className="colors-field">
      <span className="colors-field-label">HEX COLOR</span>
      <input
        className={error ? 'colors-field-invalid' : ''}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="#RRGGBBAA"
        spellCheck={false}
        autoComplete="off"
        aria-label="Hex color"
        aria-invalid={error}
      />
      <span className="colors-field-hint">3, 4, 6, or 8 hexadecimal digits</span>
    </label>
  );
}
