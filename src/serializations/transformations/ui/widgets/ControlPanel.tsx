import { ArrowRight, ChevronDown, FileInput, FileOutput, Maximize2, Minimize2, Play } from 'lucide-react';
import { FORMATS, supportsFormatting, type DataFormat, type FormatMode } from '../../core';
import './ControlPanel.css';

type ControlPanelProps = {
  source: DataFormat;
  target: DataFormat;
  mode: FormatMode;
  busy: boolean;
  onSourceChange: (format: DataFormat) => void;
  onTargetChange: (format: DataFormat) => void;
  onFormat: (mode: FormatMode) => void;
  onConvert: () => void;
};

export function ControlPanel({ source, target, mode, busy, onSourceChange, onTargetChange, onFormat, onConvert }: ControlPanelProps) {
  return <section className="transform-controls">
    <div className="transform-format-block">
      <span className="transform-control-label"><FileInput size={14} /> INPUT FORMAT</span>
      <label className="transform-select-wrap">
        <select value={source} onChange={(event) => onSourceChange(event.target.value as DataFormat)} aria-label="Input format">
          {FORMATS.map((format) => <option key={format}>{format}</option>)}
        </select>
        <ChevronDown size={15} />
      </label>
    </div>
    <ArrowRight className="transform-format-arrow" size={17} />
    <div className="transform-format-block">
      <span className="transform-control-label"><FileOutput size={14} /> OUTPUT FORMAT</span>
      <label className="transform-select-wrap">
        <select value={target} onChange={(event) => onTargetChange(event.target.value as DataFormat)} aria-label="Output format">
          {FORMATS.map((format) => <option key={format}>{format}</option>)}
        </select>
        <ChevronDown size={15} />
      </label>
    </div>
    <div className="transform-control-actions">
      {supportsFormatting(source) ? <div className="transform-format-toggle" aria-label="Input formatting">
        <button className={mode === 'pretty' ? 'active' : ''} onClick={() => onFormat('pretty')} title="Beautify" disabled={busy}><Maximize2 size={14} /></button>
        <button className={mode === 'compact' ? 'active' : ''} onClick={() => onFormat('compact')} title="Minify" disabled={busy}><Minimize2 size={14} /></button>
      </div> : <span className="transform-not-formattable">No formatting</span>}
      <button className="transform-convert-button" onClick={onConvert} disabled={busy}><Play size={13} fill="currentColor" />{busy ? 'Converting…' : 'Convert'}</button>
    </div>
  </section>;
}
