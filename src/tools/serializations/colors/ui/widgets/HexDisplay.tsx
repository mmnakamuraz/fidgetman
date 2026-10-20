import { Check, Clipboard } from 'lucide-react';
import './HexDisplay.css';

type HexDisplayProps = {
  value: string;
  copied: boolean;
  onCopy: () => void;
};

export function HexDisplay({ value, copied, onCopy }: HexDisplayProps) {
  return (
    <div className="colors-display-row">
      <div className="colors-display-label">HEX</div>
      <code>{value}</code>
      <button className="colors-copy-button" onClick={onCopy} title="Copy hex color" aria-label="Copy hex color">
        {copied ? <Check size={13} /> : <Clipboard size={13} />}
      </button>
    </div>
  );
}
