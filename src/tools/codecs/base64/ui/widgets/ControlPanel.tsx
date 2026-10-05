import { SelectField } from '../../../../../components/SelectField';
import './ControlPanel.css';

export type Mode = 'encode' | 'decode';

const modeOptions = [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] as const;

type ControlPanelProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onConvert: () => void;
};

export function ControlPanel({ mode, onModeChange, onConvert }: ControlPanelProps) {
  return <section className="base64-controls">
    <div className="base64-mode-block">
      <SelectField value={mode} options={modeOptions} onChange={onModeChange} ariaLabel="Base64 operation" label="OPERATION" />
    </div>
    <button className="base64-convert-button" onClick={onConvert}>Convert</button>
  </section>;
}
