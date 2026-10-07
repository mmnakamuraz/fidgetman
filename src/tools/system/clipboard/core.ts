export const CLIPBOARD_SLOT_COUNT = 5;
export type ClipboardSlots = string[];
export type ClipboardState = { currentText: string; hasRead: boolean; slots: ClipboardSlots };

export function createClipboardState(): ClipboardState {
  return { currentText: '', hasRead: false, slots: createClipboardSlots() };
}

export function updateClipboardText(state: ClipboardState, currentText: string): ClipboardState {
  return { ...state, currentText, hasRead: true };
}

export function updateClipboardSlot(state: ClipboardState, index: number, value: string): ClipboardState {
  return { ...state, slots: saveToSlot(state.slots, index, value) };
}

export function createClipboardSlots(): ClipboardSlots {
  return Array.from({ length: CLIPBOARD_SLOT_COUNT }, () => '');
}

export function saveToSlot(slots: ClipboardSlots, index: number, value: string): ClipboardSlots {
  if (!Number.isInteger(index) || index < 0 || index >= CLIPBOARD_SLOT_COUNT) {
    throw new Error(`Clipboard slot index must be between 0 and ${CLIPBOARD_SLOT_COUNT - 1}.`);
  }
  const next = slots.slice(0, CLIPBOARD_SLOT_COUNT);
  while (next.length < CLIPBOARD_SLOT_COUNT) next.push('');
  next[index] = value;
  return next;
}
