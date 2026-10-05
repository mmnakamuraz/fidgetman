import { useState } from 'react';
import { ToolBrowser, type ToolId } from './components/tool-browser/ToolBrowser';
import { View as TransformationsView } from './serializations/transformations/ui/View';
import { View as Base64View } from './codecs/base64/ui/View';
import { View as HashView } from './crypto/hash/ui/View';
import './App.css';

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>('transformations');
  return <div className="app-shell">
    <ToolBrowser selectedTool={selectedTool} onSelect={setSelectedTool} />
    {selectedTool === 'transformations' ? <TransformationsView /> : selectedTool === 'codecs' ? <Base64View /> : <HashView />}
  </div>;
}
