import { FileOutput } from 'lucide-react';
import { BCRYPT_COST_FACTOR_MAX, BCRYPT_COST_FACTOR_MIN } from '../../core';

type ControlPanelProps = {
  costFactor: number;
  busy: boolean;
  costFactorValid: boolean;
  onCostFactorChange: (costFactor: number) => void;
  onGenerate: () => void;
};

export function ControlPanel({ costFactor, busy, costFactorValid, onCostFactorChange, onGenerate }: ControlPanelProps) {
  return (
    <section className="bcrypt-controls">
      <label className="bcrypt-cost-field">
        <span>COST FACTOR</span>
        <input
          type="number"
          min={BCRYPT_COST_FACTOR_MIN}
          max={BCRYPT_COST_FACTOR_MAX}
          step={1}
          value={Number.isNaN(costFactor) ? '' : costFactor}
          onChange={(event) => onCostFactorChange(event.target.value === '' ? Number.NaN : Number(event.target.value))}
          aria-label="bcrypt cost factor"
          aria-invalid={!costFactorValid}
          aria-describedby="bcrypt-cost-help"
        />
        <span id="bcrypt-cost-help" className={!costFactorValid ? 'bcrypt-cost-error' : 'bcrypt-cost-hint'}>
          {costFactorValid
            ? `Choose a value from ${BCRYPT_COST_FACTOR_MIN} to ${BCRYPT_COST_FACTOR_MAX}.`
            : `Enter a whole number from ${BCRYPT_COST_FACTOR_MIN} to ${BCRYPT_COST_FACTOR_MAX}.`}
        </span>
      </label>
      <button className="bcrypt-generate-button" onClick={onGenerate} disabled={busy || !costFactorValid}>
        <FileOutput size={13} />
        {busy ? 'Hashing…' : 'Generate hash'}
      </button>
    </section>
  );
}
