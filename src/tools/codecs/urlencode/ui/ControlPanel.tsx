import { SelectField } from '../../../../components/SelectField';
import './ControlPanel.css';

export type Mode = 'encode' | 'decode';

const modeOptions = [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] as const;

type ControlPanelProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onConvert: () => void;
};

export function ControlPanel({ mode, onModeChange, onConvert }: ControlPanelProps) {
  return <section className="urlencode-controls">
    <div className="urlencode-mode-block">
      <SelectField value={mode} options={modeOptions} onChange={onModeChange} ariaLabel="URLencode operation" label="OPERATION" />
    </div>
    <button className="urlencode-convert-button" onClick={onConvert}>Convert</button>
  </section>;
}
