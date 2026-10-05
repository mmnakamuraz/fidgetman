import { describe, expect, it } from 'vitest';
import { formatArguments, formatValue } from './core';

describe('formatValue', () => {
  it('formats primitive and structured values for display', () => {
    expect(formatValue('hello')).toBe('hello');
    expect(formatValue(42)).toBe('42');
    expect(formatValue({ answer: 42 })).toBe(`{\n  "answer": 42\n}`);
  });

  it('handles undefined, bigint, and errors', () => {
    expect(formatValue(undefined)).toBe('undefined');
    expect(formatValue(12n)).toBe('12n');
    expect(formatValue(new Error('failed'))).toBe('Error: failed');
  });

  it('falls back for circular values', () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;
    expect(formatValue(circular)).toBe('[object Object]');
  });
});

describe('formatArguments', () => {
  it('formats console arguments as readable text', () => {
    expect(formatArguments(['hello', 2, { ok: true }])).toBe(`hello 2 {\n  "ok": true\n}`);
  });
});
