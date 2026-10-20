import { describe, expect, it } from 'vitest';
import { transformEncoding } from './core';

describe('Encoding tool', () => {
  it('encodes and decodes UTF-8 text with Base64', () => {
    const input = '¡Hola, 世界! 🐙';
    const encoded = transformEncoding(input, 'base64', 'encode');

    expect(encoded).toBe('wqFIb2xhLCDkuJbnlYwhIPCfkJk=');
    expect(transformEncoding(encoded, 'base64', 'decode')).toBe(input);
  });

  it('encodes and decodes URL components', () => {
    const input = 'hello world & 世界';
    const encoded = transformEncoding(input, 'urlencode', 'encode');

    expect(encoded).toBe('hello%20world%20%26%20%E4%B8%96%E7%95%8C');
    expect(transformEncoding(encoded, 'urlencode', 'decode')).toBe(input);
  });

  it('reports invalid encoded input', () => {
    expect(() => transformEncoding('invalid', 'base64', 'decode')).toThrow('not valid Base64');
    expect(() => transformEncoding('%XX', 'urlencode', 'decode')).toThrow();
  });
});
