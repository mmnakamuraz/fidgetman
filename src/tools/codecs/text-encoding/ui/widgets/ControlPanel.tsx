import type { Encoding, Mode } from '../../core';
import { SelectField } from '../../../../../components/SelectField';
import './ControlPanel.css';

const encodingOptions = [
  { value: 'base64', label: 'Base64' },
  { value: 'urlencode', label: 'URLencode' },
] as const;

const modeOptions = [
  { value: 'encode', label: 'Encode' },
  { value: 'decode', label: 'Decode' },
] as const;

type ControlPanelProps = {
  encoding: Encoding;
  mode: Mode;
  onEncodingChange: (encoding: Encoding) => void;
  onModeChange: (mode: Mode) => void;
  onConvert: () => void;
};

export function ControlPanel({ encoding, mode, onEncodingChange, onModeChange, onConvert }: ControlPanelProps) {
  return (
    <section className="encoding-controls">
      <div className="encoding-select-block">
        <SelectField
          value={encoding}
          options={encodingOptions}
          onChange={onEncodingChange}
          ariaLabel="Encoding format"
          label="ENCODING"
        />
      </div>
      <div className="encoding-select-block">
        <SelectField
          value={mode}
          options={modeOptions}
          onChange={onModeChange}
          ariaLabel="Encoding operation"
          label="OPERATION"
        />
      </div>
      <button className="encoding-convert-button" onClick={onConvert}>
        Convert
      </button>
    </section>
  );
}
