type Props = { value: string; onChange: (value: string) => void; onClear: () => void };

export function Input({ value, onChange, onClear }: Props) {
  return (
    <section className="text-panel metrics-input-panel">
      <div className="text-panel-heading">
        <div>
          <span className="text-panel-kicker">INPUT</span>
          <h2>Your text</h2>
        </div>
        <button className="text-quiet-button" onClick={onClear} disabled={!value}>
          Clear
        </button>
      </div>
      <textarea
        aria-label="Text to analyze"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste or type text here…"
        spellCheck={false}
      />
      <div className="text-panel-footnote">Statistics update as you type.</div>
    </section>
  );
}
