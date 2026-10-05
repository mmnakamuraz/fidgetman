export const CLIPBOARD_SLOT_COUNT = 5;
export type ClipboardSlots = string[];

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
