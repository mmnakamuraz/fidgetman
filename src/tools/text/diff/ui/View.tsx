import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { summarizeDiff } from '../core';
import './View.css';

export function View() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const summary = summarizeDiff(left, right);
  return (
    <div className="text-tool-view diff-view">
      <ToolTopBar section="Text" tool="Diff" />
      <main className="text-tool-main">
        <header className="text-tool-title">
          <div className="text-tool-eyebrow">TEXT COMPARISON</div>
          <h1>Diff</h1>
          <p>Compare two texts and summarize line changes.</p>
        </header>
        <div className="diff-inputs">
          <label className="text-panel diff-editor">
            <span className="diff-editor-label">Original</span>
            <textarea
              aria-label="Original text"
              value={left}
              onChange={(event) => setLeft(event.target.value)}
              placeholder="Paste original text…"
              spellCheck={false}
            />
          </label>
          <label className="text-panel diff-editor">
            <span className="diff-editor-label">Updated</span>
            <textarea
              aria-label="Updated text"
              value={right}
              onChange={(event) => setRight(event.target.value)}
              placeholder="Paste updated text…"
              spellCheck={false}
            />
          </label>
        </div>
        <section className="diff-summary">
          <div className="text-panel-kicker">SUMMARY</div>
          <strong className="diff-state">{summary.identical ? 'Texts are identical' : 'Differences found'}</strong>
          <div className="diff-counts">
            <span>
              <b>{summary.added}</b> added
            </span>
            <span>
              <b>{summary.removed}</b> removed
            </span>
            <span>
              <b>{summary.unchanged}</b> unchanged
            </span>
          </div>
        </section>
        <InfoCallout title="Line-based comparison">
          The summary compares lines, not characters. A changed line is counted as one removal and one addition.
        </InfoCallout>
      </main>
      <footer className="text-tool-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
