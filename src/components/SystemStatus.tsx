import packageJson from '../../package.json';
import './SystemStatus.css';

type SystemStatusProps = {
  className?: string;
};

export function SystemStatus({ className = '' }: SystemStatusProps) {
  return (
    <span className={`system-status ${className}`.trim()}>
      <i /> ALL SYSTEMS OPERATIONAL <span className="system-version">v{packageJson.version}</span>
    </span>
  );
}
