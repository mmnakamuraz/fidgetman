import type { CSSProperties } from 'react';
import type { Color } from '../../core';
import './ColorPreview.css';

type ColorPreviewProps = {
  color: Color;
};

export function ColorPreview({ color }: ColorPreviewProps) {
  const backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;

  return (
    <div className="colors-preview-card">
      <div
        className="colors-preview-swatch"
        style={{ '--colors-preview-color': backgroundColor } as CSSProperties}
        role="img"
        aria-label={`Color preview: ${backgroundColor}`}
      />
      <div className="colors-preview-caption">
        <span>PREVIEW</span>
        <strong>{backgroundColor}</strong>
      </div>
    </div>
  );
}
