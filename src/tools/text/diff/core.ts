export type DiffSummary = {
  identical: boolean;
  added: number;
  removed: number;
  unchanged: number;
};

function getLines(text: string): string[] {
  if (!text) return [];
  const lines = text.split(/\r\n|\n|\r/);
  if (/(\r\n|\n|\r)$/.test(text)) lines.pop();
  return lines;
}

export function summarizeDiff(leftText: string, rightText: string): DiffSummary {
  if (leftText === rightText) {
    const lineCount = getLines(leftText).length;
    return { identical: true, added: 0, removed: 0, unchanged: lineCount };
  }

  const left = getLines(leftText);
  const right = getLines(rightText);
  const rows = Array.from({ length: left.length + 1 }, () => Array<number>(right.length + 1).fill(0));
  for (let i = left.length - 1; i >= 0; i--) {
    for (let j = right.length - 1; j >= 0; j--) {
      rows[i][j] = left[i] === right[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);
    }
  }

  let i = 0;
  let j = 0;
  let added = 0;
  let removed = 0;
  let unchanged = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      unchanged++;
      i++;
      j++;
    } else if (rows[i + 1][j] >= rows[i][j + 1]) {
      removed++;
      i++;
    } else {
      added++;
      j++;
    }
  }
  removed += left.length - i;
  added += right.length - j;
  return { identical: false, added, removed, unchanged };
}
