import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { generateUuid, prependUuid } from '../core';
import { GeneratorPanel } from './widgets/GeneratorPanel';
import './View.css';

export function View() {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  function generate() {
    const uuid = generateUuid();
    setValue(uuid);
    setHistory((current) => prependUuid(current, uuid));
    setCopied(false);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(value); setCopied(true); }
    catch { setCopied(false); }
  }
  return <div className="generators-view uuid-view">
    <ToolTopBar section="Generators" tool="UUID" />
    <main className="generators-main"><div className="generators-title"><div><div className="generators-eyebrow">IDENTIFIER GENERATOR</div><h1>UUID</h1><p>Generate random version 4 UUIDs.</p></div></div>
      <GeneratorPanel value={value} history={history} copied={copied} onGenerate={generate} onCopy={copy} />
      <InfoCallout title="About UUIDs">UUIDs are generated locally using the browser's cryptographically secure random number generator. The history is kept only while this view is open.</InfoCallout>
    </main><footer className="generators-footer"><SystemStatus /><span>FIDGETMAN · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
