import { describe, expect, it } from 'vitest';
import { compressToGzipBase64, decompressFromGzipBase64, transformGzipBase64 } from './core';

describe('Gzip + Base64', () => {
  it.each(['Hello, world!', '¡Hola, 世界! 🐙', ''])('round-trips text: %s', async (input) => {
    const compressed = await compressToGzipBase64(input);
    expect(compressed).toMatch(/^[A-Za-z0-9+/]+=*$/);
    await expect(decompressFromGzipBase64(compressed)).resolves.toBe(input);
  });

  it('dispatches compress and decompress operations', async () => {
    const compressed = await transformGzipBase64('text', 'compress');
    await expect(transformGzipBase64(compressed, 'decompress')).resolves.toBe('text');
  });

  it('rejects malformed Base64', async () => {
    await expect(decompressFromGzipBase64('not base64!')).rejects.toThrow('not valid Base64');
  });

  it('rejects valid Base64 that is not a Gzip stream', async () => {
    await expect(decompressFromGzipBase64('SGVsbG8=')).rejects.toThrow('not valid Gzip');
  });
});
