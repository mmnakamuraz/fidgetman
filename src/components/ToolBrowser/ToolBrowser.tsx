import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Code2, Search, Shield, Sparkles } from 'lucide-react';
import './ToolBrowser.css';

export type ToolId = 'transformations' | 'crypto' | 'codecs';

type ToolSection = {
  id: string;
  label: string;
  icon: typeof Sparkles;
  tools: { id: ToolId; label: string; detail: string }[];
};

const sections: ToolSection[] = [
  { id: 'serialization', label: 'Serialization', icon: Sparkles, tools: [{ id: 'transformations', label: 'Transformations', detail: 'Convert structured data' }] },
  { id: 'crypto', label: 'Crypto', icon: Shield, tools: [{ id: 'crypto', label: 'Coming soon', detail: 'Cryptography tools' }] },
  { id: 'codecs', label: 'Codecs', icon: Code2, tools: [{ id: 'codecs', label: 'Coming soon', detail: 'Encoding utilities' }] },
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

  return (
    <aside className="tool-browser" aria-label="Tool browser">
      <div className="browser-heading"><span className="brand-mark">t</span><div><strong>takotools</strong><span>DEVELOPER TOOLKIT</span></div></div>
      <label className="tool-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tools..." aria-label="Search tools" /><kbd>⌘ K</kbd></label>
      <div className="section-caption">WORKSPACE</div>
      <nav className="section-list">
        {visibleSections.map((section) => {
          const Icon = section.icon;
          const isCollapsed = collapsed.includes(section.id) && !search;
          return <section className="tool-section" key={section.id}>
            <button className="section-trigger" onClick={() => toggleSection(section.id)} aria-expanded={!isCollapsed}>
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}<Icon size={15} /><span>{section.label}</span><span className="section-count">{section.tools.length}</span>
            </button>
            {!isCollapsed && <div className="tool-items">{section.tools.map((tool) => <button key={tool.id} className={`tool-item ${selectedTool === tool.id ? 'selected' : ''}`} onClick={() => onSelect(tool.id)}>
              <span className="tool-dot" /><span className="tool-label">{tool.label}<small>{tool.detail}</small></span>
            </button>)}</div>}
          </section>;
        })}
        {visibleSections.length === 0 && <p className="no-tools">No tools found.</p>}
      </nav>
      <div className="browser-footer"><div className="avatar">T</div><div><strong>Local workspace</strong><span>All processing stays on device</span></div><span className="online-dot" /></div>
    </aside>
  );
}
