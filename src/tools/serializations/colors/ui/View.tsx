import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { formatHex, formatRgba, parseHex, parseRgba, type Color } from '../core';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

const INITIAL_COLOR = parseHex('#52C89CFF');

export function View() {
  const [color, setColor] = useState<Color>(INITIAL_COLOR);
  const [hexDraft, setHexDraft] = useState(formatHex(INITIAL_COLOR));
  const [rgbaDraft, setRgbaDraft] = useState(formatRgba(INITIAL_COLOR));
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<'hex' | 'rgba' | null>(null);
  const [copyError, setCopyError] = useState('');

  function updateFromHex(value: string) {
    setHexDraft(value);
    try {
      const next = parseHex(value);
      setColor(next);
      setRgbaDraft(formatRgba(next));
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Enter a valid hex color.');
    }
  }

  function updateFromRgba(value: string) {
    setRgbaDraft(value);
    try {
      const next = parseRgba(value);
      setColor(next);
      setHexDraft(formatHex(next));
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Enter a valid RGBA color.');
    }
  }

  function updateFromPicker(value: string) {
    try {
      const picked = parseHex(value);
      const next = { ...picked, alpha: color.alpha };
      setColor(next);
      setHexDraft(formatHex(next));
      setRgbaDraft(formatRgba(next));
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to read the selected color.');
    }
  }

  async function copyValue(format: 'hex' | 'rgba', value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(format);
      setCopyError('');
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopyError('Clipboard access is unavailable. Select and copy the value manually.');
    }
  }

  const hex = formatHex(color);
  const rgba = formatRgba(color);

  return (
    <div className="colors-view">
      <ToolTopBar section="Serialization" tool="Colors" />
      <main className="colors-main">
        <div className="colors-title-row">
          <div>
            <div className="colors-eyebrow">SERIALIZATION TOOL</div>
            <h1>Colors</h1>
            <p>Convert between HEX and RGBA with a live color preview.</p>
          </div>
          <div className="colors-alpha-badge">ALPHA SUPPORTED</div>
        </div>
        <div className="colors-editor-grid">
          <Input
            color={color}
            hex={hexDraft}
            rgba={rgbaDraft}
            error={error}
            onHexChange={updateFromHex}
            onRgbaChange={updateFromRgba}
            onPickerChange={updateFromPicker}
          />
          <Output color={color} hex={hex} rgba={rgba} copied={copied} copyError={copyError} onCopy={copyValue} />
        </div>
        <InfoCallout title="Quick tip">
          Hex values support 3, 4, 6, or 8 digits. The alpha channel stays intact when using the color picker.
        </InfoCallout>
      </main>
      <footer className="colors-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
