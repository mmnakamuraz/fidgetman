import { ChevronDown, Play } from 'lucide-react';
import type { CompressionMode } from '../../core';
import './ControlPanel.css';

type ControlPanelProps = {
  mode: CompressionMode;
  busy: boolean;
  onModeChange: (mode: CompressionMode) => void;
  onConvert: () => void;
};

export function ControlPanel({ mode, busy, onModeChange, onConvert }: ControlPanelProps) {
  return <section className="gzip-controls">
    <div className="gzip-mode-block"><span className="gzip-control-label">OPERATION</span><label className="gzip-select-wrap"><select value={mode} onChange={(event) => onModeChange(event.target.value as CompressionMode)} aria-label="Compression operation"><option value="compress">Compress</option><option value="decompress">Decompress</option></select><ChevronDown size={15} /></label></div>
    <button className="gzip-convert-button" onClick={onConvert} disabled={busy}><Play size={13} fill="currentColor" />{busy ? 'Working…' : 'Convert'}</button>
  </section>;
}
