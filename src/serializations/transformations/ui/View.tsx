import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ChevronDown, FileInput, FileOutput, Maximize2, Minimize2, Play, Sparkles } from 'lucide-react';
import { FORMATS, supportsFormatting, type DataFormat, type FormatMode } from '../core';
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
    <div className="transform-topline">
      <div className="breadcrumbs"><span>Serialization</span><span className="crumb-divider">/</span><strong>Transformations</strong></div>
      <div className="local-badge"><span /> Runs locally</div>
    </div>
    <main className="transform-main">
      <div className="tool-title-row">
        <div><div className="tool-eyebrow"><span className="eyebrow-glyph">✳</span> SERIALIZATION TOOL</div><h1>Transformations</h1><p>Convert structured data between formats with precision.</p></div>
        <button className="icon-button help-button" title="Tool information"><Sparkles size={15} /></button>
      </div>
      <div className="format-card">
        <div className="format-block"><div className="format-label"><FileInput size={14} /> INPUT FORMAT</div><label className="select-wrap"><select value={source} onChange={(event) => setSource(event.target.value as DataFormat)} aria-label="Input format">{FORMATS.map((format) => <option key={format}>{format}</option>)}</select><ChevronDown size={15} /></label></div>
        <div className="format-arrow"><ArrowRight size={17} /></div>
        <div className="format-block"><div className="format-label"><FileOutput size={14} /> OUTPUT FORMAT</div><label className="select-wrap"><select value={target} onChange={(event) => setTarget(event.target.value as DataFormat)} aria-label="Output format">{FORMATS.map((format) => <option key={format}>{format}</option>)}</select><ChevronDown size={15} /></label></div>
        <div className="format-actions">
          {supportsFormatting(source) ? <div className="format-toggle" aria-label="Input formatting"><button className={mode === 'pretty' ? 'active' : ''} onClick={() => runFormat('pretty')} title="Beautify"><Maximize2 size={14} /></button><button className={mode === 'compact' ? 'active' : ''} onClick={() => runFormat('compact')} title="Minify"><Minimize2 size={14} /></button></div> : <span className="not-formattable">No formatting</span>}
          <button className="convert-button" onClick={runConversion} disabled={busy}><Play size={13} fill="currentColor" />{busy ? 'Converting…' : 'Convert'}</button>
        </div>
      </div>
      <div className="editor-grid">
        <Input input={input} setInput={setInput} inputTab={inputTab} setInputTab={setInputTab} outputLines={output ? output.split('\n').length : 0} clearError={() => setError('')} />
        <div className="editor-bridge"><ArrowDown size={14} /></div>
        <Output output={output} error={error} target={target} copied={copied} onCopy={copyOutput} clearError={() => setError('')} />
      </div>
      <div className="tip-card"><span className="tip-icon">✦</span><div><strong>Quick tip</strong><span>Conversion runs locally in a background worker, so large inputs won't block editing.</span></div><span className="tip-shortcut">⇧ ↵</span></div>
    </main>
    <footer className="transform-footer"><span><span className="footer-dot" /> ALL SYSTEMS OPERATIONAL</span><span>TAKOTOOLS <b>·</b> BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
