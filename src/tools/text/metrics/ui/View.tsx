import { useState } from 'react';
import { InfoCallout } from '../../../../components/InfoCallout';
import { SystemStatus } from '../../../../components/SystemStatus';
import { ToolTopBar } from '../../../../components/ToolTopBar';
import { getTextMetrics } from '../core';
import { Input } from './widgets/Input';
import { Output } from './widgets/Output';
import './View.css';

export function View() {
  const [text, setText] = useState('');
  const metrics = getTextMetrics(text);
  return <div className="text-tool-view metrics-view">
    <ToolTopBar section="Text" tool="Metrics" />
    <main className="text-tool-main"><header className="text-tool-title"><div className="text-tool-eyebrow">TEXT ANALYSIS</div><h1>Metrics</h1><p>Instantly measure the shape of your text.</p></header>
      <div className="metrics-layout"><Input value={text} onChange={setText} onClear={() => setText('')} /><Output metrics={metrics} /></div>
      <InfoCallout title="How metrics are counted">Characters are Unicode code points. Words are letter and number sequences; repeated words ignore case and punctuation. Newlines count line breaks.</InfoCallout>
    </main>
    <footer className="text-tool-footer"><SystemStatus /><span>FIDGETMAN · BUILT FOR DEVELOPERS</span></footer>
  </div>;
}
