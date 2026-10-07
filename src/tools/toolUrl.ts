import type { ToolId } from './registry';

type ToolUrlData = { id: ToolId; sectionId: string };

export function getToolSlug(tool: ToolUrlData) {
  return `${tool.sectionId}-${tool.id}`
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getToolFromHash(hash: string, tools: ToolUrlData[]) {
  const slug = hash.replace(/^#/, '').toLowerCase();
  if (!slug) return undefined;
  return tools.find((tool) => getToolSlug(tool) === slug);
}
