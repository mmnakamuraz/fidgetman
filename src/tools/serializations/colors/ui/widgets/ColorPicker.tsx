import type { Color } from '../../core';
import './ColorPicker.css';

type ColorPickerProps = {
  color: Color;
  onChange: (value: string) => void;
};

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const value = `#${[color.red, color.green, color.blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;

  return (
    <label className="colors-picker-field">
      <span className="colors-field-label">COLOR PICKER</span>
      <span className="colors-picker-control">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Pick a color"
        />
        <span>
          Choose a color <small>Alpha is kept from the current value</small>
        </span>
      </span>
    </label>
  );
}
