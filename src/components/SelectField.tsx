import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import './SelectField.css';

export type SelectOption<T extends string> = { value: T; label: ReactNode };

type SelectFieldProps<T extends string> = {
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function SelectField<T extends string>({ value, options, onChange, ariaLabel, label, disabled = false, className = '' }: SelectFieldProps<T>) {
  return <div className={`select-field ${className}`.trim()}>
    {label && <span className="select-field-label">{label}</span>}
    <span className="select-field-control">
      <select aria-label={ariaLabel} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <ChevronDown className="select-field-chevron" size={15} aria-hidden="true" />
    </span>
  </div>;
}
