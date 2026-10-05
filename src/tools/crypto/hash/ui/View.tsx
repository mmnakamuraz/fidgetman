import { useRef, useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { useEffect } from 'react';
import { hashText, type HashAlgorithm } from '../core';
import { ControlPanel } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const requestId = useRef(0);

  useEffect(() => () => { requestId.current += 1; }, []);

  async function generateHash() {
    if (!input) {
      setError('Enter text to generate a hash.');
      setOutput('');
      return;
    }

    const id = ++requestId.current;
    setBusy(true);
    setError('');
    setCopied(false);
    try {
      const digest = await hashText(input, algorithm);
      if (id !== requestId.current) return;
      setOutput(digest);
    } catch (hashError) {
      if (id !== requestId.current) return;
      setOutput('');
      setError(hashError instanceof Error ? hashError.message : 'Unable to generate this hash.');
    } finally {
      if (id === requestId.current) setBusy(false);
    }
  }

  function clear() {
    requestId.current += 1;
    setInput('');
    setOutput('');
    setError('');
    setBusy(false);
    setCopied(false);
  }

  function updateInput(value: string) {
    requestId.current += 1;
    setInput(value);
    setOutput('');
    setError('');
    setBusy(false);
  }

  function updateAlgorithm(value: HashAlgorithm) {
    requestId.current += 1;
    setAlgorithm(value);
    setOutput('');
    setError('');
    setBusy(false);
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('Clipboard access is unavailable. Select and copy the hash manually.');
    }
  }

  const legacy = algorithm === 'MD5' || algorithm === 'SHA-1';

  return <div className="hash-view">
    <ToolTopBar section="Crypto" tool="Hash" />
    <main className="hash-main">
      <div className="hash-title-row"><div><div className="hash-eyebrow">CRYPTO TOOL</div><h1>Hash</h1><p>Generate a cryptographic digest from text.</p></div></div>
      <ControlPanel algorithm={algorithm} busy={busy} onAlgorithmChange={updateAlgorithm} onGenerate={generateHash} />
      {legacy && <div className="hash-warning"><strong>Legacy algorithm</strong><span>{algorithm} is considered weak. Do not use it for password storage or security-sensitive integrity checks.</span></div>}
      <div className="hash-editor-grid">
        <Input value={input} onChange={updateInput} onClear={clear} />
        <Output algorithm={algorithm} value={output} error={error} busy={busy} copied={copied} onCopy={copyOutput} />
      </div>
      <InfoCallout title="Local hashing">Your text is processed on this device. For security-sensitive use, choose SHA-256 or stronger; MD5 and SHA-1 are legacy algorithms.</InfoCallout>
    </main>
    <footer className="hash-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
