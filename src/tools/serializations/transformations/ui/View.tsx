import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { DataFormat, FormatMode } from '../core';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ControlPanel } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

type Response = { id: number; result?: string; error?: string };

export function View() {
  const [source, setSource] = useState<DataFormat>('JSON');
  const [target, setTarget] = useState<DataFormat>('YAML');
  const [mode, setMode] = useState<FormatMode>('pretty');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputTab, setInputTab] = useState<'input' | 'output'>('input');
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const worker = new Worker(new URL('../workers/conversion.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent<Response>) => {
      if (event.data.id !== requestId.current) return;
      setBusy(false);
      if (event.data.error) setError(event.data.error);
      else if (event.data.result !== undefined) {
        setOutput(event.data.result);
        setError('');
        setInputTab('output');
      }
    };
    worker.onerror = () => { setBusy(false); setError('The conversion worker stopped unexpectedly. Please try again.'); };
    return () => { worker.terminate(); workerRef.current = null; };
  }, []);

  function runConversion() {
    if (!input.trim()) { setError('Paste some content to get started.'); return; }
    const id = ++requestId.current;
    setBusy(true);
    setError('');
    workerRef.current?.postMessage({ id, operation: 'transform', input, source, target, mode });
  }

  function runFormat(nextMode: FormatMode) {
    if (!input.trim()) { setError('Paste some content to get started.'); return; }
    setMode(nextMode);
    const id = ++requestId.current;
    setBusy(true);
    setError('');
    workerRef.current?.postMessage({ id, operation: 'format', input, format: source, mode: nextMode });
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

  return <div className="transform-view">
    <header className="transform-topline"><div className="transform-breadcrumbs"><span>Serialization</span><span>/</span><strong>Transformations</strong></div><div className="transform-local-badge"><span /> Runs locally</div></header>
    <main className="transform-main">
      <div className="transform-title-row"><div><div className="transform-eyebrow">SERIALIZATION TOOL</div><h1>Transformations</h1><p>Convert structured data between formats with precision.</p></div><button className="transform-help-button" title="Tool information"><Sparkles size={15} /></button></div>
      <ControlPanel source={source} target={target} mode={mode} busy={busy} onSourceChange={setSource} onTargetChange={setTarget} onFormat={runFormat} onConvert={runConversion} />
      <div className="transform-editor-grid">
        <Input input={input} setInput={setInput} inputTab={inputTab} setInputTab={setInputTab} outputLines={output ? output.split('\n').length : 0} clearError={() => setError('')} />
        <Output output={output} error={error} target={target} copied={copied} onCopy={copyOutput} clearError={() => setError('')} />
      </div>
      <InfoCallout title="Quick tip">Conversion runs locally in a background worker, so large inputs won't block editing.</InfoCallout>
    </main>
    <footer className="transform-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
