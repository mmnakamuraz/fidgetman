import { Check, Copy, RefreshCw } from 'lucide-react';
import { SelectField } from '../../../../../components/SelectField';
import { COUNTRIES, type CountryCode, type FakePerson } from '../../core';
import './GeneratorPanel.css';

type Props = {
  country: CountryCode;
  person: FakePerson | null;
  copied: boolean;
  copiedField: keyof FakePerson | null;
  onCountryChange: (country: CountryCode) => void;
  onGenerate: () => void;
  onCopy: () => void;
  onCopyField: (field: keyof FakePerson) => void;
};
const countryOptions = COUNTRIES.map((item) => ({ value: item.code, label: item.label }));
const fields: { key: keyof FakePerson; label: string }[] = [
  { key: 'name', label: 'FULL NAME' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phone', label: 'PHONE' },
  { key: 'street', label: 'STREET ADDRESS' },
  { key: 'city', label: 'CITY' },
  { key: 'postalCode', label: 'POSTAL CODE' },
];

export function GeneratorPanel({
  country,
  person,
  copied,
  copiedField,
  onCountryChange,
  onGenerate,
  onCopy,
  onCopyField,
}: Props) {
  return (
    <section className="generator-card fake-person-panel">
      <div className="fake-person-actions">
        <SelectField
          value={country}
          options={countryOptions}
          onChange={onCountryChange}
          ariaLabel="Country"
          label="COUNTRY"
          className="fake-person-country-select"
        />
        <button className="generator-primary" onClick={onGenerate}>
          <RefreshCw size={15} /> Generate profile
        </button>
      </div>
      {person ? (
        <>
          <div className="fake-person-grid">
            {fields.map(({ key, label }) => (
              <div className="fake-person-field" key={key}>
                <span>{label}</span>
                <div className="fake-person-value">
                  <code>{person[key]}</code>
                  <button
                    className="generator-icon-button"
                    onClick={() => onCopyField(key)}
                    aria-label={`Copy ${label.toLowerCase()}`}
                    title={copiedField === key ? 'Copied' : `Copy ${label.toLowerCase()}`}
                  >
                    {copiedField === key ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="generator-secondary" onClick={onCopy}>
            <Copy size={14} />
            {copied ? 'Copied' : 'Copy profile'}
          </button>
        </>
      ) : (
        <p className="fake-person-empty">Choose a country and generate a fictional profile.</p>
      )}
    </section>
  );
}
