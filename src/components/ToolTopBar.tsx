import './ToolTopBar.css';

type ToolTopBarProps = {
  section: string;
  tool: string;
  status?: string;
};

export function ToolTopBar({ section, tool, status = 'Runs locally' }: ToolTopBarProps) {
  return (
    <header className="tool-topbar">
      <div className="tool-topbar-breadcrumbs">
        <span>{section}</span>
        <span>/</span>
        <strong>{tool}</strong>
      </div>
      <div className="tool-topbar-status">
        <span />
        {status}
      </div>
    </header>
  );
}
