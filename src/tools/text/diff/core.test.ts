import { describe, expect, it } from 'vitest';
import { summarizeDiff } from './core';

describe('summarizeDiff', () => {
  it('reports identical texts', () => {
    expect(summarizeDiff('alpha\nbeta\n', 'alpha\nbeta\n')).toEqual({ identical: true, added: 0, removed: 0, unchanged: 2 });
  });

  it('summarizes added and removed lines', () => {
    expect(summarizeDiff('keep\nremove', 'keep\nadd')).toEqual({ identical: false, added: 1, removed: 1, unchanged: 1 });
  });

  it('handles empty inputs and final newlines', () => {
    expect(summarizeDiff('', 'new\nline')).toEqual({ identical: false, added: 2, removed: 0, unchanged: 0 });
    expect(summarizeDiff('line', 'line\n')).toEqual({ identical: false, added: 0, removed: 0, unchanged: 1 });
  });
});
