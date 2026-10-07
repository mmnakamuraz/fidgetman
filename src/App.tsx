import { Suspense, useState } from 'react';
import { ToolBrowser } from './components/tool-browser/ToolBrowser';
import { getTool, tools, type ToolId } from './tools/registry';
import './App.css';

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>(tools[0]?.id ?? '');
  const selected = getTool(selectedTool);
  const View = selected?.View;

  return <div className="app-shell">
    <ToolBrowser selectedTool={selectedTool} onSelect={setSelectedTool} />
    <Suspense fallback={<div className="tool-loading" role="status">Loading tool…</div>}>
      {View ? <View /> : <main className="tool-loading">No tools are available.</main>}
    </Suspense>
  </div>;
}

