import { ChevronDown, ChevronRight, type LucideIcon } from 'lucide-react';
import { ToolItem, type ToolItemData } from './ToolItem';
import type { ToolId } from '../../tools/registry';
import './Section.css';

export type ToolSection = { id: string; label: string; icon: LucideIcon; tools: ToolItemData[] };

type SectionProps = {
  section: ToolSection;
  collapsed: boolean;
  onToggle: () => void;
  selectedTool: string;
  onSelect: (tool: ToolId) => void;
};

export function Section({ section, collapsed, onToggle, selectedTool, onSelect }: SectionProps) {
  const Icon = section.icon;
  return <section className="tool-section">
    <button className="section-trigger" onClick={onToggle} aria-expanded={!collapsed}>
      {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
      <Icon size={15} />
      <span>{section.label}</span>
      <span className="section-count">{section.tools.length}</span>
    </button>
    {!collapsed && <div className="tool-items">{section.tools.map((tool) => <ToolItem key={tool.id} tool={tool} selected={selectedTool === tool.id} onSelect={onSelect} />)}</div>}
  </section>;
}
