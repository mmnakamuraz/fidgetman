import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { SectionManifest, ToolManifest } from './manifest.types';

declare global {
  interface ImportMeta {
    glob<T = unknown>(
      pattern: string,
      options?: { eager?: boolean },
    ): Record<string, T> | Record<string, () => Promise<T>>;
  }
}

type ViewModule = { View: ComponentType };

type RegisteredTool = ToolManifest & {
  sectionId: string;
  View: LazyExoticComponent<ComponentType>;
};

export type RegisteredSection = SectionManifest & { tools: RegisteredTool[] };
export type ToolId = string;

const sectionManifests = import.meta.glob<{ manifest: SectionManifest }>('./*/manifest.ts', {
  eager: true,
});
const toolManifests = import.meta.glob<{ manifest: ToolManifest }>('./*/*/manifest.ts', {
  eager: true,
});
const viewLoaders = import.meta.glob<ViewModule>('./*/*/ui/View.tsx');

function makeRegistry() {
  const sectionsByPath = new Map<string, SectionManifest>();
  const sectionsById = new Map<string, SectionManifest & { tools: RegisteredTool[] }>();

  for (const [path, module] of Object.entries(sectionManifests)) {
    const manifest = module.manifest;
    const sectionPath = path.replace(/\/manifest\.ts$/, '');
    sectionsByPath.set(sectionPath, manifest);
    if (sectionsById.has(manifest.id)) throw new Error(`Duplicate tool section id "${manifest.id}".`);
    sectionsById.set(manifest.id, { ...manifest, tools: [] });
  }

  const toolIds = new Set<string>();
  for (const [path, module] of Object.entries(toolManifests)) {
    const manifest = module.manifest;
    const toolPath = path.replace(/\/manifest\.ts$/, '');
    const sectionPath = toolPath.slice(0, toolPath.lastIndexOf('/'));
    const section = sectionsByPath.get(sectionPath);
    if (!section) throw new Error(`Tool manifest "${path}" has no section manifest.`);
    const registeredSection = sectionsById.get(section.id)!;
    if (toolIds.has(manifest.id)) throw new Error(`Duplicate tool id "${manifest.id}".`);
    toolIds.add(manifest.id);

    const viewPath = `${toolPath}/ui/View.tsx`;
    const loader = viewLoaders[viewPath];
    if (!loader) throw new Error(`Tool "${manifest.id}" is missing its ui/View.tsx module.`);
    registeredSection.tools.push({
      ...manifest,
      sectionId: section.id,
      View: lazy(() => {
        if (typeof loader !== 'function') throw new Error(`Tool view loader for "${manifest.id}" is not lazy.`);
        return loader().then((viewModule) => ({ default: viewModule.View }));
      }),
    });
  }

  for (const [path] of Object.entries(viewLoaders)) {
    const toolPath = path.replace(/\/ui\/View\.tsx$/, '');
    if (!toolManifests[`${toolPath}/manifest.ts`]) throw new Error(`Tool view "${path}" has no tool manifest.`);
  }

  return [...sectionsById.values()]
    .map((section) => ({ ...section, tools: section.tools.sort((a, b) => a.order - b.order) }))
    .sort((a, b) => a.order - b.order);
}

export const toolSections = makeRegistry();
export const tools = toolSections.flatMap((section) => section.tools);
export function getTool(id: ToolId) {
  return tools.find((tool) => tool.id === id);
}
