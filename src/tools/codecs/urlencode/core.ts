export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  return decodeURIComponent(input);
}

export function transformUrl(input: string, mode: 'encode' | 'decode'): string {
  return mode === 'encode' ? encodeUrl(input) : decodeUrl(input);
}
