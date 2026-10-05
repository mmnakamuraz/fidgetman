export const CARD_PROVIDERS = ['Visa', 'Mastercard', 'American Express', 'Discover'] as const;
export type CardProvider = (typeof CARD_PROVIDERS)[number];

export type TestCard = { provider: CardProvider; number: string; expiry: string; cvc: string; source: string };

const TEST_CARDS: Record<CardProvider, Omit<TestCard, 'provider'>> = {
  Visa: { number: '4242 4242 4242 4242', expiry: '12/34', cvc: '123', source: 'Stripe test card documentation' },
  Mastercard: { number: '5555 5555 5555 4444', expiry: '12/34', cvc: '123', source: 'Stripe test card documentation' },
  'American Express': { number: '3782 822463 10005', expiry: '12/34', cvc: '1234', source: 'Stripe test card documentation' },
  Discover: { number: '6011 1111 1111 1117', expiry: '12/34', cvc: '123', source: 'Stripe test card documentation' },
};

export function generateTestCard(provider: CardProvider): TestCard {
  const card = TEST_CARDS[provider];
  if (!card) throw new Error(`Unsupported card provider: ${provider}`);
  return { provider, ...card };
}
