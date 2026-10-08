import { useMemo, useState } from 'react';
import { Archive, Clipboard, Code2, FileText, Shield, Sparkles } from 'lucide-react';
import { toolSections, type ToolId } from '../../tools/registry';
import { SearchBar } from './SearchBar';
import { Section } from './Section';
import './ToolBrowser.css';

const sectionIcons = { Sparkles, Shield, Code2, Archive, Clipboard, FileText } as const;

type ToolBrowserProps = { selectedTool: ToolId; onSelect: (tool: ToolId) => void };

export function ToolBrowser({ selectedTool, onSelect }: ToolBrowserProps) {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const visibleSections = useMemo(
    () =>
      toolSections
        .map((section) => ({
          ...section,
          label: section.displayName,
          icon: sectionIcons[section.icon],
          tools: section.tools
            .map((tool) => ({ ...tool, label: tool.displayName }))
            .filter((tool) =>
              `${section.displayName} ${tool.displayName} ${tool.detail}`.toLowerCase().includes(search.toLowerCase()),
            ),
        }))
        .filter((section) => section.tools.length > 0),
    [search],
  );

  function toggleSection(id: string) {
    setCollapsed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <aside className="tool-browser" aria-label="Tool browser">
      <div className="browser-heading">
        <span className="brand-mark">F</span>
        <div>
          <strong>Fidgetman</strong>
          <span>DEVELOPER TOOLKIT</span>
        </div>
      </div>
      <SearchBar value={search} onChange={setSearch} />
      <div className="section-caption">WORKSPACE</div>
      <nav className="section-list">
        {visibleSections.map((section) => (
          <Section
            key={section.id}
            section={section}
            collapsed={collapsed.includes(section.id) && !search}
            onToggle={() => toggleSection(section.id)}
            selectedTool={selectedTool}
            onSelect={onSelect}
          />
        ))}
        {visibleSections.length === 0 && <p className="no-tools">No tools found.</p>}
      </nav>
      <div className="browser-footer">
        <div className="avatar">F</div>
        <div>
          <strong>Local workspace</strong>
          <span>All processing stays on device</span>
        </div>
        <span className="online-dot" />
      </div>
    </aside>
  );
}
