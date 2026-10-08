import { describe, expect, it } from 'vitest';
import { decodeUrl, encodeUrl, transformUrl } from './core';

describe('URL encoding', () => {
  it('encodes text as a URI component', () => {
    expect(encodeUrl('hello world')).toBe('hello%20world');
    expect(encodeUrl('a&b=c?/')).toBe('a%26b%3Dc%3F%2F');
  });

  it('decodes percent-encoded text', () => {
    expect(decodeUrl('hello%20world')).toBe('hello world');
    expect(decodeUrl('%E2%9C%93')).toBe('✓');
  });

  it('round-trips Unicode text', () => {
    const input = 'Fidgetman — café 🌱';
    expect(decodeUrl(encodeUrl(input))).toBe(input);
  });

  it('dispatches by mode', () => {
    expect(transformUrl('hello world', 'encode')).toBe('hello%20world');
    expect(transformUrl('hello%20world', 'decode')).toBe('hello world');
  });

  it('rejects malformed escapes and invalid UTF-8', () => {
    expect(() => decodeUrl('%')).toThrow();
    expect(() => decodeUrl('%E0%A4%A')).toThrow();
  });
});
