import { formatInput, type DataFormat, type FormatMode, transform } from '../core';

type Request =
  | { id: number; operation: 'transform'; input: string; source: DataFormat; target: DataFormat; mode: FormatMode }
  | { id: number; operation: 'format'; input: string; format: DataFormat; mode: FormatMode };

self.onmessage = (event: MessageEvent<Request>) => {
  const request = event.data;
  try {
    const result =
      request.operation === 'transform'
        ? transform(request.input, request.source, request.target, request.mode)
        : formatInput(request.input, request.format, request.mode);
    self.postMessage({ id: request.id, result });
  } catch (error) {
    self.postMessage({ id: request.id, error: error instanceof Error ? error.message : 'Unable to process input.' });
  }
};
