import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { CARD_PROVIDERS, generateTestCard, type CardProvider, type TestCard } from '../core';
import { GeneratorPanel } from './widgets/GeneratorPanel';
import './View.css';

export function View() {
  const [provider, setProvider] = useState<CardProvider>(CARD_PROVIDERS[0]);
  const [card, setCard] = useState<TestCard | null>(null);
  const [copied, setCopied] = useState(false);
  function generate() { setCard(generateTestCard(provider)); setCopied(false); }
  async function copy() {
    if (!card) return;
    try { await navigator.clipboard.writeText(`TEST ONLY — NOT FOR REAL PAYMENTS\nProvider: ${card.provider}\nCard: ${card.number}\nExpiry: ${card.expiry}\nCVC: ${card.cvc}`); setCopied(true); }
    catch { setCopied(false); }
  }
  return <div className="generators-view credit-card-view">
    <ToolTopBar section="Generators" tool="Credit Card" />
    <main className="generators-main"><div className="generators-title"><div><div className="generators-eyebrow">PAYMENT TEST DATA</div><h1>Credit Card</h1><p>Published sandbox card numbers for payment integration testing.</p></div></div>
      <div className="test-card-warning"><strong>TEST ONLY — NOT FOR REAL PAYMENTS</strong><span>These provider-published test values are for sandbox integrations only. Never use them for real transactions or customer data.</span></div>
      <GeneratorPanel provider={provider} card={card} copied={copied} onProviderChange={(next) => { setProvider(next); setCard(null); }} onGenerate={generate} onCopy={copy} />
      <InfoCallout title="Sandbox use only">The displayed values are static provider test numbers, not random payment credentials. Use them only in the provider's test environment.</InfoCallout>
    </main><footer className="generators-footer"><SystemStatus /><span>FIDGETMAN · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
