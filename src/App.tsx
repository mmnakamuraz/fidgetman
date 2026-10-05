import { useState } from 'react';
import { ToolBrowser, type ToolId } from './components/ToolBrowser/ToolBrowser';
import { TransformationsView } from './views/Transformations/TransformationsView';
import './App.css';

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>('transformations');
  return <div className="app-shell">
    <ToolBrowser selectedTool={selectedTool} onSelect={setSelectedTool} />
    {selectedTool === 'transformations' ? <TransformationsView /> : <main className="placeholder-view"><span>COMING SOON</span><h1>{selectedTool === 'crypto' ? 'Crypto' : 'Codecs'}</h1><p>More developer utilities are on the way.</p></main>}
  </div>;
}
