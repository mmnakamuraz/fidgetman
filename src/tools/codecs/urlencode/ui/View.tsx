import { useState } from 'react';
import { transformUrl } from '../core';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ControlPanel, type Mode } from './ControlPanel';
import { Input } from './Input';
import { Output } from './Output';
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
      setOutput(transformUrl(input, mode));
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

  return (
    <div className="urlencode-view">
      <ToolTopBar section="Codecs" tool="URLencode" />
      <main className="urlencode-main">
        <div className="urlencode-title-row">
          <div>
            <div className="urlencode-eyebrow">CODEC TOOL</div>
            <h1>URLencode</h1>
            <p>Encode and decode a string as a URL component.</p>
          </div>
        </div>
        <ControlPanel mode={mode} onModeChange={changeMode} onConvert={convert} />
        <div className="urlencode-editor-grid">
          <Input
            mode={mode}
            value={input}
            onChange={(value) => {
              setInput(value);
              setError('');
            }}
            onClear={clear}
          />
          <Output mode={mode} value={output} error={error} copied={copied} onCopy={copyOutput} />
        </div>
        <InfoCallout title="Single URL component">
          This encodes one string, not a URL or key/value query string. Spaces are encoded as %20.
        </InfoCallout>
      </main>
      <footer className="urlencode-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
