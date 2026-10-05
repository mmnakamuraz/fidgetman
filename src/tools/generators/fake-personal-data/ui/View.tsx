import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { COUNTRIES, generateFakePerson, type CountryCode, type FakePerson } from '../core';
import { GeneratorPanel } from './widgets/GeneratorPanel';
import './View.css';

export function View() {
  const [country, setCountry] = useState<CountryCode>(COUNTRIES[0].code);
  const [person, setPerson] = useState<FakePerson | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<keyof FakePerson | null>(null);
  function generate() { setPerson(generateFakePerson(country)); setCopied(false); setCopiedField(null); }
  async function copy() {
    if (!person) return;
    try { await navigator.clipboard.writeText(JSON.stringify(person, null, 2)); setCopied(true); }
    catch { setCopied(false); }
  }
  async function copyField(field: keyof FakePerson) {
    if (!person) return;
    try {
      await navigator.clipboard.writeText(person[field]);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField((current) => current === field ? null : current), 1600);
    } catch {
      setCopiedField(null);
    }
  }
  return <div className="generators-view fake-person-view">
    <header className="generators-topline"><div className="generators-breadcrumbs"><span>Generators</span><span>/</span><strong>Fake Personal Data</strong></div><div className="generators-local-badge"><span /> Runs locally</div></header>
    <main className="generators-main"><div className="generators-title"><div><div className="generators-eyebrow">SAMPLE DATA GENERATOR</div><h1>Fake Personal Data</h1><p>Create a fictional, localized profile for development and testing.</p></div></div>
      <GeneratorPanel country={country} person={person} copied={copied} copiedField={copiedField} onCountryChange={(next) => { setCountry(next); setPerson(null); setCopiedField(null); }} onGenerate={generate} onCopy={copy} onCopyField={copyField} />
      <InfoCallout title="Fictional data">All values are generated locally and are intended only as sample data. They do not identify real people.</InfoCallout>
    </main><footer className="generators-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
