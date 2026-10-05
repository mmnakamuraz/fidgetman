import { ChevronDown, FileOutput } from 'lucide-react';
import { HASH_ALGORITHMS, type HashAlgorithm } from '../../core';
import './ControlPanel.css';

type ControlPanelProps = {
  algorithm: HashAlgorithm;
  busy: boolean;
  onAlgorithmChange: (algorithm: HashAlgorithm) => void;
  onGenerate: () => void;
};

export function ControlPanel({ algorithm, busy, onAlgorithmChange, onGenerate }: ControlPanelProps) {
  return <section className="hash-controls">
    <div className="hash-algorithm-block">
      <span className="hash-control-label">ALGORITHM</span>
      <label className="hash-select-wrap">
        <select value={algorithm} onChange={(event) => onAlgorithmChange(event.target.value as HashAlgorithm)} aria-label="Hash algorithm">
          {HASH_ALGORITHMS.map((item) => <option key={item}>{item}</option>)}
        </select>
        <ChevronDown size={15} />
      </label>
    </div>
    <button className="hash-generate-button" onClick={onGenerate} disabled={busy}>
      <FileOutput size={13} />{busy ? 'Hashing…' : 'Generate hash'}
    </button>
  </section>;
}
