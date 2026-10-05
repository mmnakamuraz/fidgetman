import { XMLBuilder, XMLParser, XMLValidator } from 'fast-xml-parser';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

export type DataFormat = 'JSON' | 'XML' | 'YAML' | 'URL Encoded';
export type FormatMode = 'compact' | 'pretty';

export const FORMATS: DataFormat[] = ['JSON', 'XML', 'YAML', 'URL Encoded'];

export function supportsFormatting(format: DataFormat): boolean {
  return format === 'JSON' || format === 'XML';
}

export function transform(
  input: string,
  source: DataFormat,
  target: DataFormat,
  mode: FormatMode = 'pretty',
): string {
  const value = parse(input, source);
  return serialize(value, target, mode);
}

export function formatInput(input: string, format: DataFormat, mode: FormatMode): string {
  if (!supportsFormatting(format)) {
    throw new Error(`Formatting is not available for ${format}.`);
  }
  return serialize(parse(input, format), format, mode);
}

function parse(input: string, format: DataFormat): unknown {
  switch (format) {
    case 'JSON':
      return JSON.parse(input);
    case 'YAML':
      return parseYaml(input, { version: '1.2', uniqueKeys: true });
    case 'XML': {
      const validation = XMLValidator.validate(input);
      if (validation !== true) {
        throw new Error(`Invalid XML: ${validation.err.msg} at line ${validation.err.line}.`);
      }
      return new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        parseTagValue: false,
        parseAttributeValue: false,
        trimValues: false,
      }).parse(input);
    }
    case 'URL Encoded': {
      const params = new URLSearchParams(input);
      const result: Record<string, string | string[]> = {};
      for (const [key, value] of params) {
        const previous = result[key];
        result[key] = previous === undefined ? value : Array.isArray(previous) ? [...previous, value] : [previous, value];
      }
      return result;
    }
  }
}

function appendUrlEncodedEntries(params: URLSearchParams, value: Record<string, unknown>, prefix = ''): void {
  for (const [key, entry] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
      appendUrlEncodedEntries(params, entry as Record<string, unknown>, path);
      continue;
    }

    for (const [index, item] of (Array.isArray(entry) ? entry : [entry]).entries()) {
      const itemPath = Array.isArray(entry) && item !== null && typeof item === 'object'
        ? `${path}.${index}`
        : path;
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        appendUrlEncodedEntries(params, item as Record<string, unknown>, itemPath);
      } else if (item === null) {
        throw new Error(`URL-encoded values must be scalar; "${itemPath}" is null.`);
      } else if (Array.isArray(item)) {
        throw new Error(`URL-encoded values must be scalar; "${itemPath}" is nested too deeply.`);
      } else {
        params.append(itemPath, String(item));
      }
    }
  }
}

function serialize(value: unknown, format: DataFormat, mode: FormatMode): string {
  switch (format) {
    case 'JSON':
      return JSON.stringify(value, null, mode === 'pretty' ? 2 : undefined);
    case 'YAML':
      return stringifyYaml(value, { indent: 2, lineWidth: mode === 'pretty' ? 0 : 0 });
    case 'XML': {
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        format: mode === 'pretty',
        indentBy: '  ',
        suppressEmptyNode: false,
      });
      const xmlBody = builder.build(value);
      return xmlBody.startsWith('<?xml') ? xmlBody : `<?xml version="1.0" encoding="UTF-8"?>\n${xmlBody}`;
    }
    case 'URL Encoded': {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('URL-encoded output requires an object with key/value pairs.');
      }
      const params = new URLSearchParams();
      appendUrlEncodedEntries(params, value as Record<string, unknown>);
      return params.toString();
    }
  }
}
