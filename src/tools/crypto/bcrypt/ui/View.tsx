import { useEffect, useRef, useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import {
  BCRYPT_COST_FACTOR_DEFAULT,
  BCRYPT_COST_FACTOR_MAX,
  BCRYPT_COST_FACTOR_MIN,
  BCRYPT_PASSWORD_MAX_BYTES,
  getBcryptInputError,
} from '../core';
import { ControlPanel } from './widgets/ControlPanel';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [costFactor, setCostFactor] = useState(BCRYPT_COST_FACTOR_DEFAULT);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      requestId.current += 1;
    },
    [],
  );

  function generateHash() {
    const inputError = getBcryptInputError(input);
    if (inputError) {
      setError(inputError);
      setOutput('');
      return;
    }

    const id = ++requestId.current;
    setBusy(true);
    setError('');
    setCopied(false);

    let worker: Worker;
    try {
      worker = new Worker(new URL('../workers/bcrypt.worker.ts', import.meta.url), { type: 'module' });
    } catch {
      setBusy(false);
      setError('Unable to start the bcrypt worker. Please try again.');
      return;
    }

    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent<{ id: number; result?: string; error?: string }>) => {
      if (event.data.id !== requestId.current) return;
      setBusy(false);
      if (event.data.error) {
        setOutput('');
        setError(event.data.error);
      } else if (event.data.result !== undefined) {
        setOutput(event.data.result);
        setError('');
      }
      worker.terminate();
      if (workerRef.current === worker) workerRef.current = null;
    };
    worker.onerror = () => {
      if (id !== requestId.current) return;
      setBusy(false);
      setOutput('');
      setError('The bcrypt worker stopped unexpectedly. Please try again.');
      worker.terminate();
      if (workerRef.current === worker) workerRef.current = null;
    };

    try {
      worker.postMessage({ id, input, costFactor });
    } catch {
      worker.terminate();
      if (workerRef.current === worker) workerRef.current = null;
      setBusy(false);
      setError('Unable to send the input to the bcrypt worker. Please try again.');
    }
  }

  function stopWorker() {
    workerRef.current?.terminate();
    workerRef.current = null;
    requestId.current += 1;
    setBusy(false);
  }

  function clear() {
    stopWorker();
    setInput('');
    setOutput('');
    setError('');
    setBusy(false);
    setCopied(false);
  }

  function updateInput(value: string) {
    stopWorker();
    setInput(value);
    setOutput('');
    setError('');
    setBusy(false);
    setCopied(false);
  }

  function updateCostFactor(value: number) {
    stopWorker();
    setCostFactor(value);
    setOutput('');
    setError('');
    setBusy(false);
    setCopied(false);
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

  const inputError = getBcryptInputError(input);
  const inputBytes = new TextEncoder().encode(input).length;
  const costFactorValid =
    Number.isInteger(costFactor) && costFactor >= BCRYPT_COST_FACTOR_MIN && costFactor <= BCRYPT_COST_FACTOR_MAX;

  return (
    <div className="bcrypt-view">
      <ToolTopBar section="Crypto" tool="Bcrypt" />
      <main className="bcrypt-main">
        <div className="bcrypt-title-row">
          <div>
            <div className="bcrypt-eyebrow">CRYPTO TOOL</div>
            <h1>Bcrypt</h1>
            <p>Generate a password hash with a configurable work factor.</p>
          </div>
        </div>
        <ControlPanel
          costFactor={costFactor}
          busy={busy}
          costFactorValid={costFactorValid}
          onCostFactorChange={updateCostFactor}
          onGenerate={generateHash}
        />
        <div className="bcrypt-editor-grid">
          <Input value={input} onChange={updateInput} onClear={clear} inputBytes={inputBytes} inputError={inputError} />
          <Output value={output} error={error} busy={busy} copied={copied} onCopy={copyOutput} />
        </div>
        <InfoCallout title="Password hashing with bcrypt">
          {`bcrypt uses a fresh random salt for each hash. Higher cost factors increase computation time. Passwords must be between 1 and ${BCRYPT_PASSWORD_MAX_BYTES} UTF-8 bytes; this tool supports cost factors ${BCRYPT_COST_FACTOR_MIN}–${BCRYPT_COST_FACTOR_MAX}. Processing stays on this device.`}
        </InfoCallout>
      </main>
      <footer className="bcrypt-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
