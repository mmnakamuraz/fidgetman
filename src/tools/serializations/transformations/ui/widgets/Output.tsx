import { Check, Clipboard, X, ArrowRight } from 'lucide-react';
import type { DataFormat } from '../../core';
import './Output.css';

type OutputProps = {
  output: string;
  error: string;
  target: DataFormat;
  copied: boolean;
  onCopy: () => void;
  clearError: () => void;
};

export function Output({ output, error, target, copied, onCopy, clearError }: OutputProps) {
  const outputLines = output ? output.split('\n').length : 0;

  return (
    <section className="editor-panel result-panel">
      <div className="panel-heading">
        <div className="result-heading">
          <span className="result-icon">
            <Check size={13} />
          </span>
          <strong>Result</strong>
          <span className="result-format">{target}</span>
        </div>
        <div className="panel-tools">
          <button className="small-tool" title="Copy result" onClick={onCopy} disabled={!output}>
            {copied ? <Check size={13} /> : <Clipboard size={13} />}
          </button>
          <button className="small-tool" title="Close error" onClick={clearError}>
            <X size={13} />
          </button>
        </div>
      </div>
      <div className="result-body">
        {error ? (
          <div className="error-message">
            <span className="error-mark">!</span>
            <div>
              <strong>Unable to convert input</strong>
              <p>{error}</p>
            </div>
          </div>
        ) : output ? (
          <pre>{output}</pre>
        ) : (
          <div className="empty-result">
            <span className="empty-result-icon">
              <ArrowRight size={18} />
            </span>
            <strong>Your result will appear here</strong>
            <span>Choose formats and click Convert to get started.</span>
          </div>
        )}
      </div>
      <div className="panel-status">
        <span>{output ? `${outputLines} lines` : 'AWAITING INPUT'}</span>
        <span>{new Intl.NumberFormat().format(new Blob([output]).size)} bytes</span>
        <span>{copied ? 'Copied' : 'UTF-8'}</span>
      </div>
    </section>
  );
}
