import type { Color } from '../../core';
import { ColorPreview } from './ColorPreview';
import { HexDisplay } from './HexDisplay';
import { RgbaDisplay } from './RgbaDisplay';
import './Output.css';

type OutputProps = {
  color: Color;
  hex: string;
  rgba: string;
  copied: 'hex' | 'rgba' | null;
  copyError: string;
  onCopy: (format: 'hex' | 'rgba', value: string) => void;
};

export function Output({ color, hex, rgba, copied, copyError, onCopy }: OutputProps) {
  return (
    <section className="colors-output-panel">
      <div className="colors-panel-heading">
        <span className="colors-heading-dot" />
        <strong>Color output</strong>
        <span>LIVE PREVIEW</span>
      </div>
      <div className="colors-preview-wrap">
        <ColorPreview color={color} />
      </div>
      <div className="colors-output-values">
        <HexDisplay value={hex} copied={copied === 'hex'} onCopy={() => onCopy('hex', hex)} />
        <RgbaDisplay value={rgba} copied={copied === 'rgba'} onCopy={() => onCopy('rgba', rgba)} />
      </div>
      <div className={`colors-copy-status ${copyError ? 'has-error' : ''}`} role="status" aria-live="polite">
        {copyError ||
          (copied ? `${copied.toUpperCase()} copied to clipboard` : 'Copy either color format to your clipboard.')}
      </div>
    </section>
  );
}
