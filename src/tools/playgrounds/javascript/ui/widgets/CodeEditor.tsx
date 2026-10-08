import { Play, Square, Trash2 } from 'lucide-react';
import './CodeEditor.css';

type Props = {
  code: string;
  running: boolean;
  onChange: (value: string) => void;
  onRun: () => void;
  onStop: () => void;
  onClear: () => void;
};

export function CodeEditor({ code, running, onChange, onRun, onStop, onClear }: Props) {
  return (
    <section className="javascript-editor-card">
      <div className="javascript-widget-heading">
        <div>
          <span>EDITOR</span>
          <strong>JavaScript</strong>
        </div>
        <div className="javascript-editor-actions">
          <button className="javascript-tool-button" onClick={onClear} disabled={!code && !running}>
            <Trash2 size={14} /> Clear
          </button>
          {running ? (
            <button className="javascript-stop-button" onClick={onStop}>
              <Square size={13} fill="currentColor" /> Stop
            </button>
          ) : (
            <button className="javascript-run-button" onClick={onRun}>
              <Play size={14} fill="currentColor" /> Run
            </button>
          )}
        </div>
      </div>
      <textarea
        className="javascript-code-input"
        spellCheck={false}
        aria-label="JavaScript code"
        value={code}
        onChange={(event) => onChange(event.target.value)}
        placeholder={'// Try a snippet\nconsole.log("Hello, world!");\n2 + 2'}
      />
    </section>
  );
}
