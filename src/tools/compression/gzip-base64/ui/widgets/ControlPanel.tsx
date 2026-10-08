import { Play } from 'lucide-react';
import { SelectField } from '../../../../../components/SelectField';
import type { CompressionMode } from '../../core';
import './ControlPanel.css';

const modeOptions = [
  { value: 'compress', label: 'Compress' },
  { value: 'decompress', label: 'Decompress' },
] as const;

type ControlPanelProps = {
  mode: CompressionMode;
  busy: boolean;
  onModeChange: (mode: CompressionMode) => void;
  onConvert: () => void;
};

export function ControlPanel({ mode, busy, onModeChange, onConvert }: ControlPanelProps) {
  return (
    <section className="gzip-controls">
      <div className="gzip-mode-block">
        <SelectField
          value={mode}
          options={modeOptions}
          onChange={onModeChange}
          ariaLabel="Compression operation"
          label="OPERATION"
        />
      </div>
      <button className="gzip-convert-button" onClick={onConvert} disabled={busy}>
        <Play size={13} fill="currentColor" />
        {busy ? 'Working…' : 'Convert'}
      </button>
    </section>
  );
}
