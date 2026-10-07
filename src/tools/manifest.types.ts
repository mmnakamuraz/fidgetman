export type SectionIcon = 'Sparkles' | 'Shield' | 'Code2' | 'Archive' | 'Clipboard' | 'FileText';

export type SectionManifest = {
  id: string;
  displayName: string;
  icon: SectionIcon;
  order: number;
};

export type ToolManifest = {
  id: string;
  displayName: string;
  detail: string;
  order: number;
};
