import { describe, expect, it } from 'vitest';
import { getTextMetrics } from './core';

describe('getTextMetrics', () => {
  it('returns zero counts for empty text', () => {
    expect(getTextMetrics('')).toEqual({ characterCount: 0, wordCount: 0, newlineCount: 0, mostRepeatedWord: null, mostRepeatedWordCount: 0 });
  });

  it('counts Unicode code points, words, and newlines', () => {
    expect(getTextMetrics('Hi 🌍\r\nthere!')).toMatchObject({ characterCount: 12, wordCount: 2, newlineCount: 1 });
  });

  it('finds the most repeated word case-insensitively and keeps first-occurrence spelling', () => {
    expect(getTextMetrics('Fox fox CAT cat')).toMatchObject({ mostRepeatedWord: 'Fox', mostRepeatedWordCount: 2 });
  });

  it('returns no repeated word when each word occurs once', () => {
    expect(getTextMetrics('one two')).toMatchObject({ mostRepeatedWord: null, mostRepeatedWordCount: 0 });
  });
});
