import { describe, expect, it } from 'vitest';
import { formatInput, supportsFormatting, transform, type DataFormat } from './core';

describe('serialization transformations', () => {
  it('converts JSON to YAML 1.2', () => {
    expect(transform('{"enabled":true,"count":3}', 'JSON', 'YAML')).toContain('enabled: true');
  });

  it('converts YAML 1.2 booleans and numbers to JSON', () => {
    expect(transform('enabled: true\ncount: 3', 'YAML', 'JSON')).toBe('{\n  "enabled": true,\n  "count": 3\n}');
  });

  it('converts XML with attributes and text nodes', () => {
    const result = transform('<item id="7">hello</item>', 'XML', 'JSON');
    expect(JSON.parse(result)).toEqual({ item: { '@_id': '7', '#text': 'hello' } });
  });

  it('preserves repeated URL-encoded keys', () => {
    expect(transform('tag=red&tag=blue&space=a+b', 'URL Encoded', 'JSON')).toContain(
      '"tag": [\n    "red",\n    "blue"\n  ]',
    );
  });

  it('flattens nested objects into dot-separated URL-encoded keys', () => {
    const result = transform(
      '{"user":{"name":"Ada","address":{"city":"London"}},"active":true}',
      'JSON',
      'URL Encoded',
    );
    expect(result).toBe('user.name=Ada&user.address.city=London&active=true');
  });

  it('encodes flattened keys and values and preserves scalar arrays as repeated keys', () => {
    const result = transform(
      '{"user.profile":{"display name":"Ada Lovelace"},"tags":["red","blue"]}',
      'JSON',
      'URL Encoded',
    );
    expect(result).toBe('user.profile.display+name=Ada+Lovelace&tags=red&tags=blue');
  });

  it('uses dotted numeric segments for objects in arrays', () => {
    const result = transform('{"items":[{"name":"Ada"},{"name":"Grace"}]}', 'JSON', 'URL Encoded');
    expect(result).toBe('items.0.name=Ada&items.1.name=Grace');
  });

  it('rejects null leaves and non-object URL-encoded roots', () => {
    expect(() => transform('{"user":{"name":null}}', 'JSON', 'URL Encoded')).toThrow('is null');
    expect(() => transform('[1,2]', 'JSON', 'URL Encoded')).toThrow('requires an object');
  });

  it('supports formatting only for JSON and XML', () => {
    expect(supportsFormatting('JSON')).toBe(true);
    expect(supportsFormatting('XML')).toBe(true);
    expect(supportsFormatting('YAML')).toBe(false);
    expect(supportsFormatting('URL Encoded')).toBe(false);
  });

  it('formats JSON input without changing its format', () => {
    expect(formatInput('{"a":1}', 'JSON', 'pretty')).toBe('{\n  "a": 1\n}');
    expect(formatInput('{"a":1}', 'JSON', 'compact')).toBe('{"a":1}');
  });

  it('rejects formatting for YAML and URL-encoded input', () => {
    expect(() => formatInput('a: 1', 'YAML', 'pretty')).toThrow('not available');
    expect(() => formatInput('a=1', 'URL Encoded', 'pretty')).toThrow('not available');
  });

  it('reports malformed input', () => {
    expect(() => transform('{', 'JSON', 'YAML')).toThrow();
    const formats: DataFormat[] = ['JSON', 'XML', 'YAML', 'URL Encoded'];
    expect(formats).toHaveLength(4);
  });
});
