import { Check, Clipboard } from 'lucide-react';
import './RgbaDisplay.css';

type RgbaDisplayProps = {
  value: string;
  copied: boolean;
  onCopy: () => void;
};

export function RgbaDisplay({ value, copied, onCopy }: RgbaDisplayProps) {
  return (
    <div className="colors-display-row">
      <div className="colors-display-label">RGBA</div>
      <code>{value}</code>
      <button className="colors-copy-button" onClick={onCopy} title="Copy RGBA color" aria-label="Copy RGBA color">
        {copied ? <Check size={13} /> : <Clipboard size={13} />}
      </button>
    </div>
  );
}
