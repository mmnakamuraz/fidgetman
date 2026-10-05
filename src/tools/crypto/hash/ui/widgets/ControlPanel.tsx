import { FileOutput } from 'lucide-react';
import { SelectField } from '../../../../../components/SelectField';
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
      <SelectField value={algorithm} options={HASH_ALGORITHMS.map((item) => ({ value: item, label: item }))} onChange={onAlgorithmChange} ariaLabel="Hash algorithm" label="ALGORITHM" />
    </div>
    <button className="hash-generate-button" onClick={onGenerate} disabled={busy}>
      <FileOutput size={13} />{busy ? 'Hashing…' : 'Generate hash'}
    </button>
  </section>;
}
