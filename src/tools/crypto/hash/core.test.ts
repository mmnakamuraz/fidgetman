import { describe, expect, it } from 'vitest';
import { hashText, HASH_ALGORITHMS } from './core';

describe('hashText', () => {
  it.each([
    ['MD5', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['SHA-1', 'da39a3ee5e6b4b0d3255bfef95601890afd80709'],
    ['SHA-256', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
    ['SHA-384', '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b'],
    [
      'SHA-512',
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    ],
  ] as const)('computes the empty-string %s digest', async (algorithm, expected) => {
    await expect(hashText('', algorithm)).resolves.toBe(expected);
  });

  it.each([
    ['MD5', '900150983cd24fb0d6963f7d28e17f72'],
    ['SHA-1', 'a9993e364706816aba3e25717850c26c9cd0d89d'],
    ['SHA-256', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
    ['SHA-384', 'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7'],
    [
      'SHA-512',
      'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f',
    ],
  ] as const)('computes the known "abc" %s digest', async (algorithm, expected) => {
    await expect(hashText('abc', algorithm)).resolves.toBe(expected);
  });

  it('hashes Unicode text as UTF-8', async () => {
    await expect(hashText('世界', 'SHA-256')).resolves.toBe(
      '33650a369521ec29f2e26c43d25967535bcb26436755f536735d1ef6e84a1ec5',
    );
  });

  it('exposes the supported algorithm choices', () => {
    expect(HASH_ALGORITHMS).toEqual(['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']);
  });
});
