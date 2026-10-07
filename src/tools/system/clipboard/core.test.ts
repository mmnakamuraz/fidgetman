import { describe, expect, it } from 'vitest';
import { createClipboardSlots, createClipboardState, saveToSlot, updateClipboardSlot, updateClipboardText } from './core';

describe('clipboard session state', () => {
  it('starts empty and in memory', () => {
    expect(createClipboardState()).toEqual({ currentText: '', hasRead: false, slots: ['', '', '', '', ''] });
  });

  it('preserves clipboard text and other slots when updating one slot', () => {
    const state = updateClipboardText(createClipboardState(), 'current');
    const withSlot = updateClipboardSlot(state, 3, 'saved');
    expect(withSlot).toEqual({ currentText: 'current', hasRead: true, slots: ['', '', '', 'saved', ''] });
    expect(updateClipboardSlot(withSlot, 1, 'another').slots).toEqual(['', 'another', '', 'saved', '']);
  });
});

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
