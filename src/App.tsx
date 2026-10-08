import { Suspense, useEffect, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { ToolBrowser } from './components/tool-browser/ToolBrowser';
import { getTool, tools, type ToolId } from './tools/registry';
import { getToolFromHash, getToolSlug } from './tools/toolUrl';
import './App.css';

function getInitialToolId() {
  return getToolFromHash(window.location.hash, tools)?.id ?? tools[0]?.id ?? '';
}

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>(getInitialToolId);
  const [browserVisible, setBrowserVisible] = useState(true);
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
    if (window.matchMedia('(orientation: portrait)').matches) setBrowserVisible(false);
    const slug = getToolSlug(tool);
    if (window.location.hash.slice(1) !== slug) window.location.hash = slug;
  }
  const View = selected?.View;

  return (
    <div className={`app-shell ${browserVisible ? '' : 'browser-hidden'}`}>
      {browserVisible && <ToolBrowser selectedTool={selectedTool} onSelect={selectTool} />}
      <button
        className="browser-toggle"
        type="button"
        aria-label={browserVisible ? 'Hide tool browser' : 'Show tool browser'}
        aria-expanded={browserVisible}
        onClick={() => setBrowserVisible((visible) => !visible)}
      >
        {browserVisible ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
      </button>
      <Suspense
        fallback={
          <div className="tool-loading" role="status">
            Loading tool…
          </div>
        }
      >
        {View ? <View /> : <main className="tool-loading">No tools are available.</main>}
      </Suspense>
    </div>
  );
}
