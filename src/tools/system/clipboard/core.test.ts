import { describe, expect, it } from 'vitest';
import { createClipboardSlots, saveToSlot } from './core';

describe('clipboard slots', () => {
  it('starts with five empty in-memory slots', () => {
    expect(createClipboardSlots()).toEqual(['', '', '', '', '']);
  });

  it('stores clipboard text in only the selected slot', () => {
    expect(saveToSlot(createClipboardSlots(), 2, 'sample text')).toEqual(['', '', 'sample text', '', '']);
  });

  it('preserves empty text and rejects invalid indexes', () => {
    expect(saveToSlot(['a', 'b', 'c', 'd', 'e'], 1, '')).toEqual(['a', '', 'c', 'd', 'e']);
    expect(() => saveToSlot(createClipboardSlots(), 5, 'x')).toThrow('between 0 and 4');
  });
});
