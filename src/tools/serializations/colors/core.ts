export type Color = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export function parseHex(input: string): Color {
  const value = input.trim().replace(/^#/, '');
  if (!/^(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(value)) {
    throw new Error('Enter a 3, 4, 6, or 8-digit hexadecimal color.');
  }

  const expanded = value.length <= 4 ? [...value].map((digit) => `${digit}${digit}`).join('') : value;
  const hasAlpha = expanded.length === 8;
  return {
    red: Number.parseInt(expanded.slice(0, 2), 16),
    green: Number.parseInt(expanded.slice(2, 4), 16),
    blue: Number.parseInt(expanded.slice(4, 6), 16),
    alpha: hasAlpha ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
  };
}

export function parseRgba(input: string): Color {
  const match = input.trim().match(/^rgba\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*\)$/i);
  if (!match) throw new Error('Enter RGBA as rgba(red, green, blue, alpha).');

  const values = match.slice(1);
  if (values.some((value) => !/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(value.trim()))) {
    throw new Error('RGBA channels and alpha must be numeric values.');
  }

  const [red, green, blue, alpha] = values.map(Number);
  if (![red, green, blue].every((channel) => Number.isInteger(channel) && channel >= 0 && channel <= 255)) {
    throw new Error('RGB channels must be whole numbers from 0 to 255.');
  }
  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) {
    throw new Error('Alpha must be a number from 0 to 1.');
  }

  return { red, green, blue, alpha };
}

export function formatHex(color: Color): string {
  const alpha = Math.round(color.alpha * 255);
  return `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}${toHex(alpha)}`;
}

export function formatRgba(color: Color): string {
  const alpha = Number(color.alpha.toFixed(3));
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
}

function toHex(value: number): string {
  return Math.round(value).toString(16).padStart(2, '0').toUpperCase();
}
