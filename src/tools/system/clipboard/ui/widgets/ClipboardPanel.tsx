import { Clipboard, ClipboardCopy, RefreshCw, Send } from 'lucide-react';
import type { ClipboardSlots } from '../../core';
import './ClipboardPanel.css';

type ClipboardPanelProps = {
  currentText: string;
  hasRead: boolean;
  slots: ClipboardSlots;
  busy: boolean;
  onRefresh: () => void;
  onSave: (index: number, value?: string) => void;
  onSend: (index: number) => void;
};

export function ClipboardPanel({ currentText, hasRead, slots, busy, onRefresh, onSave, onSend }: ClipboardPanelProps) {
  return <div className="clipboard-layout">
    <section className="clipboard-card clipboard-current">
      <div className="clipboard-card-heading"><div><span className="clipboard-eyebrow">SYSTEM CLIPBOARD</span><h2>Current content</h2></div><button className="clipboard-button clipboard-refresh" onClick={onRefresh} disabled={busy}><RefreshCw size={15} />{busy ? 'Reading…' : 'Refresh'}</button></div>
      <pre className="clipboard-current-content">{hasRead ? currentText || 'Clipboard is empty.' : 'Press Refresh to read the system clipboard.'}</pre>
      <p className="clipboard-hint">Clipboard access is requested only when you press Refresh.</p>
    </section>
    <section className="clipboard-slots" aria-label="Temporary clipboard slots">
      {slots.map((value, index) => <article className="clipboard-card clipboard-slot" key={index}>
        <div className="clipboard-slot-heading"><div><span className="clipboard-eyebrow">TEMPORARY SLOT {index + 1}</span><strong>{value ? 'Contains saved text' : 'Empty'}</strong></div><Clipboard size={17} /></div>
        <textarea aria-label={`Clipboard slot ${index + 1}`} value={value} placeholder="Save clipboard text here or type your own…" onChange={(event) => onSave(index, event.target.value)} />
        <div className="clipboard-slot-actions"><button className="clipboard-button" onClick={() => onSave(index)} disabled={!hasRead || busy}><ClipboardCopy size={14} />Save current</button><button className="clipboard-button clipboard-send" onClick={() => onSend(index)} disabled={!value || busy}><Send size={14} />Send to system</button></div>
      </article>)}
    </section>
  </div>;
}
