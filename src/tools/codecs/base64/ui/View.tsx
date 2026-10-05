import { useState } from 'react';
import { transformBase64 } from '../core';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ControlPanel, type Mode } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function convert() {
    if (!input) {
      setError('Enter a string to get started.');
      setOutput('');
      return;
    }

    try {
      setOutput(transformBase64(input, mode));
      setError('');
      setCopied(false);
    } catch (conversionError) {
      setOutput('');
      setError(conversionError instanceof Error ? conversionError.message : 'Unable to process this input.');
    }
  }

  function clear() {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
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

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setError('');
    setOutput('');
  }

  return <div className="base64-view">
    <ToolTopBar section="Codecs" tool="Base64" />
    <main className="base64-main">
      <div className="base64-title-row"><div><div className="base64-eyebrow">CODEC TOOL</div><h1>Base64</h1><p>Encode and decode UTF-8 strings with Base64.</p></div></div>
      <ControlPanel mode={mode} onModeChange={changeMode} onConvert={convert} />
      <div className="base64-editor-grid">
        <Input mode={mode} value={input} onChange={(value) => { setInput(value); setError(''); }} onClear={clear} />
        <Output mode={mode} value={output} error={error} copied={copied} onCopy={copyOutput} />
      </div>
      <InfoCallout title="UTF-8 text">Unicode characters are converted to UTF-8 bytes before Base64 encoding.</InfoCallout>
    </main>
    <footer className="base64-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
