import { Sparkles } from 'lucide-react';
import './InfoCallout.css';

type InfoCalloutProps = {
  title: string;
  children: string;
};

export function InfoCallout({ title, children }: InfoCalloutProps) {
  return (
    <aside className="info-callout">
      <Sparkles className="info-callout-icon" size={15} aria-hidden="true" />
      <div className="info-callout-content">
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </aside>
  );
}
