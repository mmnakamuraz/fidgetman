import { useEffect, useRef, useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import type { PlaygroundMessage } from '../core';
import { CodeEditor } from './widgets/CodeEditor';
import { OutputPanel } from './widgets/OutputPanel';
import './View.css';

type WorkerResponse = { id: number; message: PlaygroundMessage };

export function View() {
  const [code, setCode] = useState('console.log("Hello, world!");\n2 + 2');
  const [messages, setMessages] = useState<PlaygroundMessage[]>([]);
  const [running, setRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const runIdRef = useRef(0);

  useEffect(() => () => { workerRef.current?.terminate(); workerRef.current = null; }, []);

  function stop() {
    workerRef.current?.terminate();
    workerRef.current = null;
    runIdRef.current++;
    setRunning(false);
    setMessages((current) => [...current, { type: 'error', text: 'Execution stopped.' }, { type: 'done' }]);
  }

  function run() {
    workerRef.current?.terminate();
    const id = ++runIdRef.current;
    const worker = new Worker(new URL('../workers/javascript.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    setMessages([]);
    setRunning(true);
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id !== runIdRef.current) return;
      setMessages((current) => [...current, event.data.message]);
      if (event.data.message.type === 'done') {
        setRunning(false);
        worker.terminate();
        if (workerRef.current === worker) workerRef.current = null;
      }
    };
    worker.onerror = () => {
      if (id !== runIdRef.current) return;
      setMessages((current) => [...current, { type: 'error', text: 'The JavaScript worker failed unexpectedly.' }, { type: 'done' }]);
      setRunning(false);
      worker.terminate();
      if (workerRef.current === worker) workerRef.current = null;
    };
    worker.postMessage({ id, code });
  }

  function clear() {
    if (running) stop();
    setCode('');
    setMessages([]);
  }

  return <div className="javascript-playground-view">
    <ToolTopBar section="Playgrounds" tool="JavaScript" />
    <main className="javascript-playground-main">
      <div className="javascript-playground-title"><div><span>CODE PLAYGROUND</span><h1>JavaScript</h1><p>Write and run JavaScript snippets locally.</p></div></div>
      <div className="javascript-playground-grid">
        <CodeEditor code={code} running={running} onChange={setCode} onRun={run} onStop={stop} onClear={clear} />
        <OutputPanel messages={messages} running={running} />
      </div>
      <InfoCallout title="Execution and safety">Code runs in a Web Worker so Stop can interrupt long-running scripts without freezing the interface. This is not a security sandbox: only run code you trust. Snippets are not saved.</InfoCallout>
    </main>
    <footer className="javascript-playground-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
