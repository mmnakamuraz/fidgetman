import { useState } from 'react';
import type { Encoding, Mode } from '../core';
import { transformEncoding } from '../core';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ControlPanel } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [encoding, setEncoding] = useState<Encoding>('base64');
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
      setOutput(transformEncoding(input, encoding, mode));
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

  function changeEncoding(nextEncoding: Encoding) {
    setEncoding(nextEncoding);
    setError('');
    setOutput('');
    setCopied(false);
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setError('');
    setOutput('');
    setCopied(false);
  }

  return (
    <div className="encoding-view">
      <ToolTopBar section="Serialization" tool="Encoding" />
      <main className="encoding-main">
        <div className="encoding-title-row">
          <div>
            <div className="encoding-eyebrow">SERIALIZATION TOOL</div>
            <h1>Encoding</h1>
            <p>Encode and decode strings with Base64 or URL encoding.</p>
          </div>
        </div>
        <ControlPanel
          encoding={encoding}
          mode={mode}
          onEncodingChange={changeEncoding}
          onModeChange={changeMode}
          onConvert={convert}
        />
        <div className="encoding-editor-grid">
          <Input
            encoding={encoding}
            mode={mode}
            value={input}
            onChange={(value) => {
              setInput(value);
              setError('');
            }}
            onClear={clear}
          />
          <Output encoding={encoding} mode={mode} value={output} error={error} copied={copied} onCopy={copyOutput} />
        </div>
        <InfoCallout title={encoding === 'base64' ? 'UTF-8 text' : 'Single URL component'}>
          {encoding === 'base64'
            ? 'Unicode characters are converted to UTF-8 bytes before Base64 encoding.'
            : 'This encodes one string, not a URL or key/value query string. Spaces are encoded as %20.'}
        </InfoCallout>
      </main>
      <footer className="encoding-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
