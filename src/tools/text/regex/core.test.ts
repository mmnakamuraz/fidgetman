import { describe, expect, it } from 'vitest';
import { testRegex } from './core';

describe('testRegex', () => {
  it('reports whether and how often the pattern matches', () => {
    expect(testRegex('cat', 'cat scatter')).toEqual({ matches: true, count: 2, examples: ['cat', 'cat'] });
    expect(testRegex('dog', 'cat')).toMatchObject({ matches: false, count: 0 });
  });

  it('catches invalid patterns', () => {
    expect(testRegex('[', 'text').error).toBeTruthy();
  });

  it('supports zero-width patterns without looping', () => {
    expect(testRegex('^', 'abc')).toEqual({ matches: true, count: 1, examples: [''] });
  });
});
