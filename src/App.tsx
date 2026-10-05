import { useState } from 'react';
import { ToolBrowser, type ToolId } from './components/tool-browser/ToolBrowser';
import { View as TransformationsView } from './tools/serializations/transformations/ui/View';
import { View as Base64View } from './tools/codecs/base64/ui/View';
import { View as HashView } from './tools/crypto/hash/ui/View';
import { View as GzipBase64View } from './tools/compression/gzip-base64/ui/View';
import { View as UuidView } from './tools/generators/uuid/ui/View';
import { View as FakePersonalDataView } from './tools/generators/fake-personal-data/ui/View';
import { View as CreditCardView } from './tools/generators/credit-card/ui/View';
import './App.css';

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolId>('transformations');
  return <div className="app-shell">
    <ToolBrowser selectedTool={selectedTool} onSelect={setSelectedTool} />
    {selectedTool === 'transformations' ? <TransformationsView /> : selectedTool === 'codecs' ? <Base64View /> : selectedTool === 'gzip-base64' ? <GzipBase64View /> : selectedTool === 'crypto' ? <HashView /> : selectedTool === 'uuid' ? <UuidView /> : selectedTool === 'fake-personal-data' ? <FakePersonalDataView /> : <CreditCardView />}
  </div>;
}
