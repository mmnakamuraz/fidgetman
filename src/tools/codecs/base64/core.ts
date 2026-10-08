const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const normalized = input.replace(/[\t\n\f\r ]/g, '');
  if (
    normalized.length % 4 !== 0 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(normalized)
  ) {
    throw new Error('Input is not valid Base64. Check the characters and padding.');
  }

  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('Base64 input does not contain valid UTF-8 text.');
  }
}

export function transformBase64(input: string, mode: 'encode' | 'decode'): string {
  return mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
}

export const BASE64_ALPHABET_LENGTH = BASE64_ALPHABET.length;
