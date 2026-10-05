import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { SystemStatus } from '../../../../components/SystemStatus';
import { createClipboardSlots, saveToSlot, type ClipboardSlots } from '../core';
import { ClipboardPanel } from './widgets/ClipboardPanel';
import './View.css';

export function View() {
  const [currentText, setCurrentText] = useState('');
  const [hasRead, setHasRead] = useState(false);
  const [slots, setSlots] = useState<ClipboardSlots>(createClipboardSlots);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function refreshClipboard() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const text = await navigator.clipboard.readText();
      setCurrentText(text);
      setHasRead(true);
    } catch {
      setError('Clipboard access was denied or is unavailable. Check browser permissions and try Refresh again.');
    } finally {
      setBusy(false);
    }
  }

  function updateSlot(index: number, value?: string) {
    setSlots((current) => saveToSlot(current, index, value ?? currentText));
    setMessage(`Slot ${index + 1} updated.`);
    setError('');
  }

  async function sendSlot(index: number) {
    const value = slots[index];
    if (!value) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await navigator.clipboard.writeText(value);
      setCurrentText(value);
      setHasRead(true);
      setMessage(`Slot ${index + 1} sent to the system clipboard.`);
    } catch {
      setError('Unable to write to the system clipboard. Check browser permissions and try again.');
    } finally {
      setBusy(false);
    }
  }

  return <div className="clipboard-view">
    <ToolTopBar section="System" tool="Clipboard" status="In-memory only" />
    <main className="clipboard-main">
      <div className="clipboard-title"><div><div className="clipboard-page-eyebrow">SYSTEM TOOL</div><h1>Clipboard</h1><p>View and temporarily manage text from your system clipboard.</p></div></div>
      <ClipboardPanel currentText={currentText} hasRead={hasRead} slots={slots} busy={busy} onRefresh={refreshClipboard} onSave={updateSlot} onSend={sendSlot} />
      {error && <p className="clipboard-feedback clipboard-error" role="alert">{error}</p>}
      {message && <p className="clipboard-feedback clipboard-success" role="status">{message}</p>}
      <InfoCallout title="Private and temporary">Clipboard text and the five slots exist only in this view's memory. Reading the system clipboard happens only when you press Refresh.</InfoCallout>
    </main>
    <footer className="clipboard-footer"><SystemStatus /><span>TAKOTOOLS · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
