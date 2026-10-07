export type RegexTestResult = { matches: boolean; count: number; examples: string[]; error?: string };

export function testRegex(pattern: string, text: string): RegexTestResult {
  try {
    const regex = new RegExp(pattern, 'g');
    const matches = Array.from(text.matchAll(regex), (match) => match[0]);
    return { matches: matches.length > 0, count: matches.length, examples: matches.slice(0, 10) };
  } catch (error) {
    return { matches: false, count: 0, examples: [], error: error instanceof Error ? error.message : 'Invalid regular expression.' };
  }
}
