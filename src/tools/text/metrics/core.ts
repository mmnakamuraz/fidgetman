export type TextMetrics = {
  characterCount: number;
  wordCount: number;
  newlineCount: number;
  mostRepeatedWord: string | null;
  mostRepeatedWordCount: number;
};

export function getTextMetrics(text: string): TextMetrics {
  const words = text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
  const counts = new Map<string, { display: string; count: number }>();

  for (const word of words) {
    const key = word.toLocaleLowerCase();
    const current = counts.get(key);
    counts.set(key, { display: current?.display ?? word, count: (current?.count ?? 0) + 1 });
  }

  let mostRepeatedWord: string | null = null;
  let mostRepeatedWordCount = 0;
  for (const value of counts.values()) {
    if (value.count > mostRepeatedWordCount) {
      mostRepeatedWord = value.display;
      mostRepeatedWordCount = value.count;
    }
  }

  if (mostRepeatedWordCount < 2) mostRepeatedWord = null;

  return {
    characterCount: Array.from(text).length,
    wordCount: words.length,
    newlineCount: (text.match(/\n/g) ?? []).length,
    mostRepeatedWord,
    mostRepeatedWordCount: mostRepeatedWord ? mostRepeatedWordCount : 0,
  };
}
