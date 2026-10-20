import { bcrypt } from 'hash-wasm';

export const BCRYPT_COST_FACTOR_MIN = 4;
export const BCRYPT_COST_FACTOR_MAX = 16;
export const BCRYPT_COST_FACTOR_DEFAULT = 10;
export const BCRYPT_PASSWORD_MAX_BYTES = 72;

export function getBcryptInputError(input: string): string {
  const byteLength = new TextEncoder().encode(input).length;
  if (byteLength === 0) return 'Enter text to generate a bcrypt hash.';
  if (byteLength > BCRYPT_PASSWORD_MAX_BYTES) {
    return `Bcrypt passwords must not exceed ${BCRYPT_PASSWORD_MAX_BYTES} UTF-8 bytes.`;
  }
  return '';
}

export async function hashBcrypt(input: string, costFactor = BCRYPT_COST_FACTOR_DEFAULT): Promise<string> {
  if (!Number.isInteger(costFactor) || costFactor < BCRYPT_COST_FACTOR_MIN || costFactor > BCRYPT_COST_FACTOR_MAX) {
    throw new RangeError(
      `bcrypt cost factor must be an integer between ${BCRYPT_COST_FACTOR_MIN} and ${BCRYPT_COST_FACTOR_MAX}.`,
    );
  }

  const inputError = getBcryptInputError(input);
  if (inputError) throw new RangeError(inputError);

  const salt = new Uint8Array(16);
  globalThis.crypto.getRandomValues(salt);
  return bcrypt({ password: input, salt, costFactor, outputType: 'encoded' });
}
