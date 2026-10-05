import { describe, expect, it } from 'vitest';
import { decodeBase64, encodeBase64, transformBase64 } from './core';

describe('Base64 codec', () => {
  it('encodes known UTF-8 strings', () => {
    expect(encodeBase64('Hello, world!')).toBe('SGVsbG8sIHdvcmxkIQ==');
    expect(encodeBase64('')).toBe('');
  });

  it('round-trips Unicode text', () => {
    const input = '¡Hola, 世界! 🐙';
    expect(decodeBase64(encodeBase64(input))).toBe(input);
  });

  it('decodes valid Base64 with whitespace', () => {
    expect(decodeBase64('SGVs\nbG8=')).toBe('Hello');
  });

  it('supports encode and decode mode dispatch', () => {
    expect(transformBase64('hello', 'encode')).toBe('aGVsbG8=');
    expect(transformBase64('aGVsbG8=', 'decode')).toBe('hello');
  });

  it.each(['abc', 'a===', 'aGVsbG8_', 'SGVsbG8=extra'])('rejects malformed Base64: %s', (input) => {
    expect(() => decodeBase64(input)).toThrow('not valid Base64');
  });

  it('rejects Base64 that decodes to invalid UTF-8', () => {
    expect(() => decodeBase64('/w==')).toThrow('valid UTF-8');
  });
});
