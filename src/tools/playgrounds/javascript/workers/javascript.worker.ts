import { formatArguments, formatValue, type ConsoleLevel, type PlaygroundMessage } from '../core';

const consoleLevels: ConsoleLevel[] = ['log', 'info', 'warn', 'error'];

self.onmessage = async (event: MessageEvent<{ id: number; code: string }>) => {
  const { id, code } = event.data;
  const originalConsole = globalThis.console;
  const scopedConsole = { ...originalConsole } as Console;
  for (const level of consoleLevels) {
    scopedConsole[level] = (...values: unknown[]) => {
      self.postMessage({ id, message: { type: 'console', level, text: formatArguments(values) } satisfies PlaygroundMessage });
    };
  }
  globalThis.console = scopedConsole;
  try {
    const execute = new Function(`"use strict";\n${code}`);
    const result = await execute();
    if (result !== undefined) {
      self.postMessage({ id, message: { type: 'result', text: formatValue(result) } satisfies PlaygroundMessage });
    }
  } catch (error) {
    self.postMessage({ id, message: { type: 'error', text: formatValue(error) } satisfies PlaygroundMessage });
  } finally {
    globalThis.console = originalConsole;
    self.postMessage({ id, message: { type: 'done' } satisfies PlaygroundMessage });
  }
};
