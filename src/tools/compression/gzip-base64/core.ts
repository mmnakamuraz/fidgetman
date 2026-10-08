const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const MAX_DECOMPRESSED_BYTES = 64 * 1024 * 1024;

export type CompressionMode = 'compress' | 'decompress';

function getCompressionStream(): typeof CompressionStream {
  if (typeof CompressionStream === 'undefined') {
    throw new Error('Gzip compression is not supported in this browser.');
  }
  return CompressionStream;
}

function getDecompressionStream(): typeof DecompressionStream {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Gzip decompression is not supported in this browser.');
  }
  return DecompressionStream;
}

async function readStream(stream: ReadableStream<Uint8Array>, maxBytes = Infinity): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new Error('Decompressed text exceeds the 64 MB safety limit.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const result = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function fromBase64(input: string): Uint8Array {
  const normalized = input.replace(/[\t\n\f\r ]/g, '');
  if (normalized.length % 4 !== 0 || !BASE64_PATTERN.test(normalized)) {
    throw new Error('Input is not valid Base64. Check the characters and padding.');
  }
  const binary = atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function transformBytes(bytes: Uint8Array, format: 'gzip' | 'gunzip'): Promise<Uint8Array> {
  const input = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  const stream =
    format === 'gzip'
      ? input.pipeThrough(new (getCompressionStream())('gzip'))
      : input.pipeThrough(new (getDecompressionStream())('gzip'));
  return readStream(stream, format === 'gunzip' ? MAX_DECOMPRESSED_BYTES : Infinity);
}

export async function compressToGzipBase64(input: string): Promise<string> {
  const compressed = await transformBytes(new TextEncoder().encode(input), 'gzip');
  return toBase64(compressed);
}

export async function decompressFromGzipBase64(input: string): Promise<string> {
  const compressed = fromBase64(input);
  let decompressed: Uint8Array;
  try {
    decompressed = await transformBytes(compressed, 'gunzip');
  } catch (error) {
    if (error instanceof Error && error.message.includes('64 MB safety limit')) throw error;
    throw new Error('Input is not valid Gzip data.');
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(decompressed);
  } catch {
    throw new Error('Gzip data does not contain valid UTF-8 text.');
  }
}

export function transformGzipBase64(input: string, mode: CompressionMode): Promise<string> {
  return mode === 'compress' ? compressToGzipBase64(input) : decompressFromGzipBase64(input);
}
