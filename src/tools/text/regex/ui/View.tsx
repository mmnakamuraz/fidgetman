import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { testRegex } from '../core';
import './View.css';

export function View() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const result = testRegex(pattern, text);
  return (
    <div className="text-tool-view regex-view">
      <ToolTopBar section="Text" tool="Regex" />
      <main className="text-tool-main">
        <header className="text-tool-title">
          <div className="text-tool-eyebrow">PATTERN TESTER</div>
          <h1>Regex</h1>
          <p>Test a JavaScript regular expression against your text.</p>
        </header>
        <section className="text-panel regex-form">
          <label className="regex-field">
            <span>Regular expression</span>
            <div className="regex-pattern-wrap">
              <span>/</span>
              <input
                aria-label="Regular expression"
                value={pattern}
                onChange={(event) => setPattern(event.target.value)}
                placeholder="e.g. \\bcat\\b"
                spellCheck={false}
              />
              <span>/g</span>
            </div>
          </label>
          <label className="regex-field regex-text-field">
            <span>Text to test</span>
            <textarea
              aria-label="Text to test"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter or paste text here…"
              spellCheck={false}
            />
          </label>
        </section>
        <section
          className={`regex-result ${result.error ? 'has-error' : result.matches ? 'has-match' : ''}`}
          aria-live="polite"
        >
          {result.error ? (
            <>
              <strong>Invalid regular expression</strong>
              <span>{result.error}</span>
            </>
          ) : (
            <>
              <strong>{result.matches ? 'Match found' : 'No match'}</strong>
              <span>
                {result.count} {result.count === 1 ? 'match' : 'matches'}
                {result.examples.length > 0
                  ? ` · ${result.examples.map((match) => match || '(empty)').join(', ')}`
                  : ''}
              </span>
            </>
          )}
        </section>
        <InfoCallout title="JavaScript regular expressions">
          This tester uses JavaScript RegExp syntax with the global flag, so it counts all matches. Matching runs
          locally in your browser.
        </InfoCallout>
      </main>
      <footer className="text-tool-footer">
        <SystemStatus />
        <span>FIDGETMAN · BUILT FOR DEVELOPERS</span>
      </footer>
    </div>
  );
}
