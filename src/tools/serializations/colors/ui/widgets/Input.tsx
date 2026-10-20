import type { Color } from '../../core';
import { ColorPicker } from './ColorPicker';
import { HexInput } from './HexInput';
import { RgbaInput } from './RgbaInput';
import './Input.css';

type InputProps = {
  color: Color;
  hex: string;
  rgba: string;
  error: string;
  onHexChange: (value: string) => void;
  onRgbaChange: (value: string) => void;
  onPickerChange: (value: string) => void;
};

export function Input({ color, hex, rgba, error, onHexChange, onRgbaChange, onPickerChange }: InputProps) {
  return (
    <section className="colors-input-panel">
      <div className="colors-panel-heading">
        <span className="colors-heading-dot" />
        <strong>Color input</strong>
        <span>HEX / RGBA / PICKER</span>
      </div>
      <div className="colors-input-fields">
        <HexInput value={hex} onChange={onHexChange} error={Boolean(error)} />
        <RgbaInput value={rgba} onChange={onRgbaChange} error={Boolean(error)} />
        <ColorPicker color={color} onChange={onPickerChange} />
      </div>
      <div className={`colors-input-status ${error ? 'has-error' : ''}`} role="status" aria-live="polite">
        {error || 'Update any input to convert the color instantly.'}
      </div>
    </section>
  );
}
