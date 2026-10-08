import { Terminal } from 'lucide-react';
import type { PlaygroundMessage } from '../../core';
import './OutputPanel.css';

type Props = { messages: PlaygroundMessage[]; running: boolean };

export function OutputPanel({ messages, running }: Props) {
  return (
    <section className="javascript-output-card">
      <div className="javascript-output-heading">
        <div>
          <Terminal size={15} />
          <strong>OUTPUT</strong>
        </div>
        <span>{running ? 'RUNNING' : 'READY'}</span>
      </div>
      <div className="javascript-output-content" aria-live="polite">
        {messages.length === 0 ? (
          <p className="javascript-output-empty">Run a snippet to see its output here.</p>
        ) : (
          messages.map((message, index) => {
            if (message.type === 'done') return null;
            return (
              <div
                className={`javascript-output-line javascript-output-${message.type}${message.type === 'console' ? ` javascript-console-${message.level}` : ''}`}
                key={index}
              >
                <span>
                  {message.type === 'console'
                    ? message.level.toUpperCase()
                    : message.type === 'result'
                      ? 'RETURN'
                      : 'ERROR'}
                </span>
                <pre>{message.text}</pre>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
