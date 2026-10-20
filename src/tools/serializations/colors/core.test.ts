import { describe, expect, it } from 'vitest';
import { formatHex, formatRgba, parseHex, parseRgba } from './core';

describe('color serialization', () => {
  it('parses short and long hex colors with optional alpha', () => {
    expect(parseHex('#abc')).toEqual({ red: 170, green: 187, blue: 204, alpha: 1 });
    expect(parseHex('#abcd')).toEqual({ red: 170, green: 187, blue: 204, alpha: 0xdd / 255 });
    expect(parseHex('112233')).toEqual({ red: 17, green: 34, blue: 51, alpha: 1 });
    expect(parseHex('#11223380')).toEqual({ red: 17, green: 34, blue: 51, alpha: 128 / 255 });
  });

  it('normalizes hex output to uppercase RGBA hex', () => {
    expect(formatHex(parseHex('#abc'))).toBe('#AABBCCFF');
    expect(formatHex(parseHex('#12345680'))).toBe('#12345680');
    expect(formatHex(parseRgba('rgba(12, 34, 56, 0.5)'))).toBe('#0C223880');
  });

  it('parses and formats rgba colors', () => {
    expect(parseRgba(' RGBA(12, 34, 56, 0.5) ')).toEqual({ red: 12, green: 34, blue: 56, alpha: 0.5 });
    expect(formatRgba(parseHex('#0C223880'))).toBe('rgba(12, 34, 56, 0.502)');
    expect(formatRgba(parseRgba('rgba(1, 2, 3, 1)'))).toBe('rgba(1, 2, 3, 1)');
  });

  it('rejects malformed hex and rgba input', () => {
    expect(() => parseHex('#12')).toThrow('3, 4, 6, or 8-digit');
    expect(() => parseHex('#ggg')).toThrow('3, 4, 6, or 8-digit');
    expect(() => parseRgba('rgb(1, 2, 3)')).toThrow('rgba');
    expect(() => parseRgba('rgba(1, 2, nope, 1)')).toThrow('numeric values');
  });

  it('rejects out-of-range channels and alpha', () => {
    expect(() => parseRgba('rgba(-1, 2, 3, 1)')).toThrow('0 to 255');
    expect(() => parseRgba('rgba(1, 256, 3, 1)')).toThrow('0 to 255');
    expect(() => parseRgba('rgba(1, 2, 3, 1.1)')).toThrow('0 to 1');
  });
});
