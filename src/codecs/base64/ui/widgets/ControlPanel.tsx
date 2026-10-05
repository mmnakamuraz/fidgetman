import { ChevronDown } from 'lucide-react';
import './ControlPanel.css';

export type Mode = 'encode' | 'decode';

type ControlPanelProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onConvert: () => void;
};

export function ControlPanel({ mode, onModeChange, onConvert }: ControlPanelProps) {
  return <section className="base64-controls">
    <div className="base64-mode-block">
      <span className="base64-control-label">OPERATION</span>
      <label className="base64-select-wrap">
        <select value={mode} onChange={(event) => onModeChange(event.target.value as Mode)} aria-label="Base64 operation">
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
        <ChevronDown size={15} />
      </label>
    </div>
    <button className="base64-convert-button" onClick={onConvert}>Convert</button>
  </section>;
}
