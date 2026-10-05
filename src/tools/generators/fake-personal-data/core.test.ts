import { describe, expect, it } from 'vitest';
import { generateFakePerson } from './core';

describe('fake personal data', () => {
  it('generates repeatable, populated data for a selected country', () => {
    const first = generateFakePerson('GB', 42);
    expect(first).toEqual(generateFakePerson('GB', 42));
    expect(Object.values(first).every(Boolean)).toBe(true);
    expect(first.email).toMatch(/@example\.(com|net|org)$/);
  });

  it('generates data for a different locale', () => {
    expect(generateFakePerson('JP', 1).name).not.toBe('');
  });
});
