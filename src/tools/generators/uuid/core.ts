export function generateUuid(randomUUID: () => string = () => globalThis.crypto.randomUUID()): string {
  return randomUUID();
}

export function prependUuid(history: string[], uuid: string): string[] {
  return [uuid, ...history].slice(0, 5);
}
