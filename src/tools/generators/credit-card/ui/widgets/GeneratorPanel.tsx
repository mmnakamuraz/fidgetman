import { Copy, RefreshCw } from 'lucide-react';
import { SelectField } from '../../../../../components/SelectField';
import { CARD_PROVIDERS, type CardProvider, type TestCard } from '../../core';
import './GeneratorPanel.css';

type Props = { provider: CardProvider; card: TestCard | null; copied: boolean; onProviderChange: (provider: CardProvider) => void; onGenerate: () => void; onCopy: () => void };
const providerOptions = CARD_PROVIDERS.map((provider) => ({ value: provider, label: provider }));

export function GeneratorPanel({ provider, card, copied, onProviderChange, onGenerate, onCopy }: Props) {
  return <section className="generator-card test-card-panel">
    <div className="test-card-actions"><SelectField value={provider} options={providerOptions} onChange={onProviderChange} ariaLabel="Card network" label="CARD NETWORK" className="test-card-select" /><button className="generator-primary" onClick={onGenerate}><RefreshCw size={15} /> Generate test card</button></div>
    {card && <div className="test-card-result"><span className="test-card-brand">TEST ONLY · {card.provider.toUpperCase()} · SANDBOX</span><code className="test-card-number">{card.number}</code><div className="test-card-meta"><div><span>EXPIRY</span><code>{card.expiry}</code></div><div><span>CVC</span><code>{card.cvc}</code></div></div><button className="generator-secondary" onClick={onCopy}><Copy size={14} />{copied ? 'Copied' : 'Copy test data'}</button><small>Source: {card.source}</small></div>}
    {!card && <p className="fake-person-empty">Select a network to view its published sandbox test card.</p>}
  </section>;
}
