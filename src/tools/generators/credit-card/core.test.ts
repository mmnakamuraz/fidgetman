import { describe, expect, it } from 'vitest';
import { generateTestCard } from './core';

describe('test credit cards', () => {
  it('returns the published sandbox card for the selected provider', () => {
    expect(generateTestCard('Visa').number).toBe('4242 4242 4242 4242');
    expect(generateTestCard('American Express').cvc).toHaveLength(4);
  });
});
