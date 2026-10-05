import './SystemStatus.css';

type SystemStatusProps = {
  className?: string;
};

export function SystemStatus({ className = '' }: SystemStatusProps) {
  return <span className={`system-status ${className}`.trim()}>
    <i /> ALL SYSTEMS OPERATIONAL
  </span>;
}
