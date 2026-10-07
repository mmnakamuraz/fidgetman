import { Suspense, useEffect, useState } from 'react';
import { ToolBrowser } from './components/tool-browser/ToolBrowser';
import { getTool, tools, type ToolId } from './tools/registry';
import { getToolFromHash, getToolSlug } from './tools/toolUrl';
import './App.css';

function getInitialToolId() {
  return getToolFromHash(window.location.hash, tools)?.id ?? tools[0]?.id ?? '';
}

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>(getInitialToolId);
  const selected = getTool(selectedTool);

  useEffect(() => {
    function syncToolFromHash() {
      const tool = getToolFromHash(window.location.hash, tools);
      if (tool) setSelectedTool(tool.id);
    }

    window.addEventListener('hashchange', syncToolFromHash);
    return () => window.removeEventListener('hashchange', syncToolFromHash);
  }, []);

  function selectTool(toolId: ToolId) {
    const tool = getTool(toolId);
    if (!tool) return;
    setSelectedTool(toolId);
    const slug = getToolSlug(tool);
    if (window.location.hash.slice(1) !== slug) window.location.hash = slug;
  }
  const View = selected?.View;

  return <div className="app-shell">
    <ToolBrowser selectedTool={selectedTool} onSelect={selectTool} />
    <Suspense fallback={<div className="tool-loading" role="status">Loading tool…</div>}>
      {View ? <View /> : <main className="tool-loading">No tools are available.</main>}
    </Suspense>
  </div>;
}

