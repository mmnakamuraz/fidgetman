import { describe, expect, it } from 'vitest';
import { generateUuid, prependUuid } from './core';

describe('UUID generator', () => {
  it('returns the UUID from the runtime generator', () => {
    expect(generateUuid(() => 'sample-uuid')).toBe('sample-uuid');
  });

  it('keeps only the five most recent UUIDs', () => {
    expect(prependUuid(['b', 'c', 'd', 'e', 'f'], 'a')).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
