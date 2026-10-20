import { describe, expect, it } from 'vitest';
import { bcryptVerify } from 'hash-wasm';
import {
  BCRYPT_COST_FACTOR_DEFAULT,
  BCRYPT_COST_FACTOR_MAX,
  BCRYPT_COST_FACTOR_MIN,
  BCRYPT_PASSWORD_MAX_BYTES,
  getBcryptInputError,
  hashBcrypt,
} from './core';

describe('hashBcrypt', () => {
  it('creates hashes with a random salt and the selected cost factor', async () => {
    const firstHash = await hashBcrypt('password', BCRYPT_COST_FACTOR_MIN);
    const secondHash = await hashBcrypt('password', BCRYPT_COST_FACTOR_MIN);

    expect(firstHash).toMatch(/^\$2[aby]\$04\$/);
    expect(secondHash).not.toBe(firstHash);
    await expect(bcryptVerify({ password: 'password', hash: firstHash })).resolves.toBe(true);
    await expect(bcryptVerify({ password: 'incorrect', hash: firstHash })).resolves.toBe(false);
  });

  it('uses the default cost factor when none is supplied', async () => {
    const result = await hashBcrypt('password');

    expect(result).toMatch(new RegExp(`^\\$2[aby]\\$${BCRYPT_COST_FACTOR_DEFAULT.toString().padStart(2, '0')}\\$`));
  });

  it.each([BCRYPT_COST_FACTOR_MIN - 1, BCRYPT_COST_FACTOR_MAX + 1, 4.5])(
    'rejects invalid cost factor %s',
    async (costFactor) => {
      await expect(hashBcrypt('password', costFactor)).rejects.toThrow(RangeError);
    },
  );

  it.each(['', 'x'.repeat(BCRYPT_PASSWORD_MAX_BYTES + 1)])('rejects empty or oversized inputs', async (input) => {
    await expect(hashBcrypt(input)).rejects.toThrow(RangeError);
  });

  it('counts the bcrypt limit using UTF-8 bytes', () => {
    expect(getBcryptInputError('é'.repeat(36))).toBe('');
    expect(getBcryptInputError('é'.repeat(37))).toContain('72 UTF-8 bytes');
  });
});
