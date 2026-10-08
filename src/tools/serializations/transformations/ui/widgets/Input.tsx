import { FileOutput, Maximize2, RotateCcw } from 'lucide-react';
import './Input.css';

type InputProps = {
  input: string;
  setInput: (value: string) => void;
  inputTab: 'input' | 'output';
  setInputTab: (tab: 'input' | 'output') => void;
  outputLines: number;
  clearError: () => void;
};

export function Input({ input, setInput, inputTab, setInputTab, outputLines, clearError }: InputProps) {
  const inputLineCount = input ? Math.min(input.split('\n').length, 1000) : 1;

  return (
    <section className={`editor-panel input-panel ${inputTab === 'input' ? 'panel-focused' : ''}`}>
      <div className="panel-heading">
        <div className="panel-tabs">
          <button className={inputTab === 'input' ? 'tab-active' : ''} onClick={() => setInputTab('input')}>
            Input <span className="tab-count">{input ? `${input.length.toLocaleString()} chars` : 'empty'}</span>
          </button>
          <button className={inputTab === 'output' ? 'tab-active' : ''} onClick={() => setInputTab('output')}>
            Output{outputLines > 0 && <span className="tab-count">{outputLines} lines</span>}
          </button>
        </div>
        <div className="panel-tools">
          <button
            className="small-tool"
            title="Clear input"
            onClick={() => {
              setInput('');
              clearError();
            }}
          >
            <RotateCcw size={13} />
          </button>
          <button className="small-tool" title="Expand editor">
            <Maximize2 size={13} />
          </button>
        </div>
      </div>
      <div className="editor-content" style={{ display: inputTab === 'input' ? 'flex' : 'none' }}>
        <div className="line-numbers">
          {Array.from({ length: inputLineCount }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <textarea
          spellCheck={false}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={'Paste or type your content here…\n\nYour data stays on this device.'}
          aria-label="Input content"
        />
      </div>
      {inputTab === 'output' && (
        <div className="output-placeholder">
          <FileOutput size={20} />
          <span>Output is shown in the result panel.</span>
        </div>
      )}
      <div className="panel-status">
        <span className="status-ready">
          <span /> READY
        </span>
        <span>{new Intl.NumberFormat().format(new Blob([input]).size)} bytes</span>
        <span>UTF-8</span>
      </div>
    </section>
  );
}
