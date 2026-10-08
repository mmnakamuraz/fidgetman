import { ArrowRight, FileInput, FileOutput, Maximize2, Minimize2, Play } from 'lucide-react';
import { SelectField } from '../../../../../components/SelectField';
import { FORMATS, supportsFormatting, type DataFormat, type FormatMode } from '../../core';
import './ControlPanel.css';

const formatOptions = FORMATS.map((format) => ({ value: format, label: format }));

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

export function ControlPanel({
  source,
  target,
  mode,
  busy,
  onSourceChange,
  onTargetChange,
  onFormat,
  onConvert,
}: ControlPanelProps) {
  return (
    <section className="transform-controls">
      <div className="transform-format-block">
        <SelectField
          value={source}
          options={formatOptions}
          onChange={onSourceChange}
          ariaLabel="Input format"
          label={
            <>
              <FileInput size={14} /> INPUT FORMAT
            </>
          }
          className="transform-select"
        />
      </div>
      <ArrowRight className="transform-format-arrow" size={17} />
      <div className="transform-format-block">
        <SelectField
          value={target}
          options={formatOptions}
          onChange={onTargetChange}
          ariaLabel="Output format"
          label={
            <>
              <FileOutput size={14} /> OUTPUT FORMAT
            </>
          }
          className="transform-select"
        />
      </div>
      <div className="transform-control-actions">
        {supportsFormatting(source) ? (
          <div className="transform-format-toggle" aria-label="Input formatting">
            <button
              className={mode === 'pretty' ? 'active' : ''}
              onClick={() => onFormat('pretty')}
              title="Beautify"
              disabled={busy}
            >
              <Maximize2 size={14} />
            </button>
            <button
              className={mode === 'compact' ? 'active' : ''}
              onClick={() => onFormat('compact')}
              title="Minify"
              disabled={busy}
            >
              <Minimize2 size={14} />
            </button>
          </div>
        ) : (
          <span className="transform-not-formattable">No formatting</span>
        )}
        <button className="transform-convert-button" onClick={onConvert} disabled={busy}>
          <Play size={13} fill="currentColor" />
          {busy ? 'Converting…' : 'Convert'}
        </button>
      </div>
    </section>
  );
}
