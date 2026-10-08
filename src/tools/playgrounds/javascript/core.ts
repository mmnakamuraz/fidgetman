export type ConsoleLevel = 'log' | 'info' | 'warn' | 'error';

export type PlaygroundMessage =
  | { type: 'console'; level: ConsoleLevel; text: string }
  | { type: 'result'; text: string }
  | { type: 'error'; text: string }
  | { type: 'done' };

export function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'bigint') return `${value}n`;
  try {
    const serialized = JSON.stringify(
      value,
      (_key, item: unknown) => (typeof item === 'bigint' ? `${item}n` : item),
      2,
    );
    return serialized === undefined ? String(value) : serialized;
  } catch {
    try {
      return String(value);
    } catch {
      return '[Unserializable value]';
    }
  }
}

export function formatArguments(values: unknown[]): string {
  return values.map(formatValue).join(' ');
}
