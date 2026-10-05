import './ToolItem.css';
import type { ToolId } from './ToolBrowser';

export type ToolItemData = { id: ToolId; label: string; detail: string };

type ToolItemProps = { tool: ToolItemData; selected: boolean; onSelect: (id: ToolId) => void };

export function ToolItem({ tool, selected, onSelect }: ToolItemProps) {
  return <button className={`tool-item ${selected ? 'selected' : ''}`} onClick={() => onSelect(tool.id)}>
    <span className="tool-dot" />
    <span className="tool-label">{tool.label}<small>{tool.detail}</small></span>
  </button>;
}
