import { Copy, RefreshCw } from 'lucide-react';
import { COUNTRIES, type CountryCode, type FakePerson } from '../../core';
import './GeneratorPanel.css';

type Props = { country: CountryCode; person: FakePerson | null; copied: boolean; onCountryChange: (country: CountryCode) => void; onGenerate: () => void; onCopy: () => void };
const fields: { key: keyof FakePerson; label: string }[] = [{ key: 'name', label: 'FULL NAME' }, { key: 'email', label: 'EMAIL' }, { key: 'phone', label: 'PHONE' }, { key: 'street', label: 'STREET ADDRESS' }, { key: 'city', label: 'CITY' }, { key: 'postalCode', label: 'POSTAL CODE' }];

export function GeneratorPanel({ country, person, copied, onCountryChange, onGenerate, onCopy }: Props) {
  return <section className="generator-card fake-person-panel">
    <div className="fake-person-actions"><label>COUNTRY<select value={country} onChange={(event) => onCountryChange(event.target.value as CountryCode)}>{COUNTRIES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select></label><button className="generator-primary" onClick={onGenerate}><RefreshCw size={15} /> Generate profile</button></div>
    {person ? <><div className="fake-person-grid">{fields.map(({ key, label }) => <div className="fake-person-field" key={key}><span>{label}</span><code>{person[key]}</code></div>)}</div><button className="generator-secondary" onClick={onCopy}><Copy size={14} />{copied ? 'Copied' : 'Copy profile'}</button></> : <p className="fake-person-empty">Choose a country and generate a fictional profile.</p>}
  </section>;
}
