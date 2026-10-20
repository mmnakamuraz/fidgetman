import { hashBcrypt } from '../core';

type Request = { id: number; input: string; costFactor: number };

self.onmessage = async (event: MessageEvent<Request>) => {
  const { id, input, costFactor } = event.data;
  try {
    const result = await hashBcrypt(input, costFactor);
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({ id, error: error instanceof Error ? error.message : 'Unable to generate this hash.' });
  }
};
