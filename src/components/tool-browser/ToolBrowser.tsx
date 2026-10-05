import { useMemo, useState } from 'react';
import { Archive, Code2, Shield, Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Section, type ToolSection } from './Section';
import './ToolBrowser.css';

export type ToolId = 'transformations' | 'crypto' | 'codecs' | 'gzip-base64';

const sections: ToolSection[] = [
  { id: 'serialization', label: 'Serialization', icon: Sparkles, tools: [{ id: 'transformations', label: 'Transformations', detail: 'Convert structured data' }] },
  { id: 'crypto', label: 'Crypto', icon: Shield, tools: [{ id: 'crypto', label: 'Hash', detail: 'Generate MD5 and SHA digests' }] },
  { id: 'codecs', label: 'Codecs', icon: Code2, tools: [{ id: 'codecs', label: 'Base64', detail: 'Encode and decode strings' }] },
  { id: 'compression', label: 'Compression', icon: Archive, tools: [{ id: 'gzip-base64', label: 'Gzip (+ Base64)', detail: 'Compress and decompress text' }] },
];

type ToolBrowserProps = { selectedTool: ToolId; onSelect: (tool: ToolId) => void };

export function ToolBrowser({ selectedTool, onSelect }: ToolBrowserProps) {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const visibleSections = useMemo(() => sections.map((section) => ({
    ...section,
    tools: section.tools.filter((tool) => `${section.label} ${tool.label} ${tool.detail}`.toLowerCase().includes(search.toLowerCase())),
  })).filter((section) => section.tools.length > 0), [search]);

  function toggleSection(id: string) {
    setCollapsed((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <aside className="tool-browser" aria-label="Tool browser">
    <div className="browser-heading"><span className="brand-mark">t</span><div><strong>takotools</strong><span>DEVELOPER TOOLKIT</span></div></div>
    <SearchBar value={search} onChange={setSearch} />
    <div className="section-caption">WORKSPACE</div>
    <nav className="section-list">
      {visibleSections.map((section) => <Section
        key={section.id}
        section={section}
        collapsed={collapsed.includes(section.id) && !search}
        onToggle={() => toggleSection(section.id)}
        selectedTool={selectedTool}
        onSelect={onSelect}
      />)}
      {visibleSections.length === 0 && <p className="no-tools">No tools found.</p>}
    </nav>
    <div className="browser-footer"><div className="avatar">T</div><div><strong>Local workspace</strong><span>All processing stays on device</span></div><span className="online-dot" /></div>
  </aside>;
}
