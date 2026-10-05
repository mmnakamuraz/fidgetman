import { useEffect, useRef, useState } from 'react';
import { transformGzipBase64, type CompressionMode } from '../core';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ControlPanel } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [mode, setMode] = useState<CompressionMode>('compress');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const requestId = useRef(0);

  useEffect(() => () => { requestId.current += 1; }, []);

  async function convert() {
    if (!input) {
      setError('Enter content to get started.');
      setOutput('');
      return;
    }
    const id = ++requestId.current;
    setBusy(true);
    setError('');
    setCopied(false);
    try {
      const result = await transformGzipBase64(input, mode);
      if (id === requestId.current) setOutput(result);
    } catch (conversionError) {
      if (id === requestId.current) {
        setOutput('');
        setError(conversionError instanceof Error ? conversionError.message : 'Unable to process this input.');
      }
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

  function changeInput(value: string) {
    requestId.current += 1;
    setInput(value);
    setOutput('');
    setError('');
    setBusy(false);
  }

  function changeMode(value: CompressionMode) {
    requestId.current += 1;
    setMode(value);
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
      setError('Clipboard access is unavailable. Select and copy the output manually.');
    }
  }

  return <div className="gzip-view">
    <header className="gzip-topline"><div className="gzip-breadcrumbs"><span>Compression</span><span>/</span><strong>Gzip (+ Base64)</strong></div><div className="gzip-local-badge"><span /> Runs locally</div></header>
    <main className="gzip-main">
      <div className="gzip-title-row"><div><div className="gzip-eyebrow">COMPRESSION TOOL</div><h1>Gzip (+ Base64)</h1><p>Compress text to Gzip encoded as standard Base64, or decode it back.</p></div></div>
      <ControlPanel mode={mode} busy={busy} onModeChange={changeMode} onConvert={convert} />
      <div className="gzip-editor-grid"><Input mode={mode} value={input} onChange={changeInput} onClear={clear} /><Output mode={mode} value={output} error={error} busy={busy} copied={copied} onCopy={copyOutput} /></div>
      <InfoCallout title="Standard Gzip + Base64">Compression runs locally. Output is Base64 of Gzip-compressed UTF-8 bytes.</InfoCallout>
    </main>
    <footer className="gzip-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
