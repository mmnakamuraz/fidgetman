import { md5, sha1, sha256, sha384, sha512 } from 'hash-wasm';

export const HASH_ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

export async function hashText(input: string, algorithm: HashAlgorithm): Promise<string> {
  const bytes = new TextEncoder().encode(input);

  switch (algorithm) {
    case 'MD5':
      return md5(bytes);
    case 'SHA-1':
      return sha1(bytes);
    case 'SHA-256':
      return sha256(bytes);
    case 'SHA-384':
      return sha384(bytes);
    case 'SHA-512':
      return sha512(bytes);
  }
}
