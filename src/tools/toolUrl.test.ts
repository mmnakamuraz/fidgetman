import { describe, expect, it } from 'vitest';
import { getToolFromHash, getToolSlug } from './toolUrl';

const tools = [
  { sectionId: 'crypto', id: 'crypto' },
  { sectionId: 'text', id: 'text-metrics' },
];

describe('tool URL hashes', () => {
  it('builds a slug from the section and tool ids', () => {
    expect(getToolSlug(tools[0])).toBe('crypto-crypto');
    expect(getToolSlug({ sectionId: 'my section', id: 'Some_Tool' })).toBe('my-section-some-tool');
  });

  it('resolves only exact tool slugs', () => {
    expect(getToolFromHash('#crypto-crypto', tools)).toBe(tools[0]);
    expect(getToolFromHash('#text-text-metrics', tools)).toBe(tools[1]);
    expect(getToolFromHash('#crypto', tools)).toBeUndefined();
    expect(getToolFromHash('#unknown-tool', tools)).toBeUndefined();
    expect(getToolFromHash('#', tools)).toBeUndefined();
  });
});
