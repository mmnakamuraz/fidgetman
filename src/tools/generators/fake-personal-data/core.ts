export const COUNTRIES = [
  { code: 'US', label: 'United States', language: 'en' },
  { code: 'GB', label: 'United Kingdom', language: 'en' },
  { code: 'CA', label: 'Canada', language: 'en' },
  { code: 'AU', label: 'Australia', language: 'en' },
  { code: 'FR', label: 'France', language: 'fr' },
  { code: 'DE', label: 'Germany', language: 'de' },
  { code: 'ES', label: 'Spain', language: 'es' },
  { code: 'JP', label: 'Japan', language: 'ja' },
  { code: 'BR', label: 'Brazil', language: 'pt' },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]['code'];
export type FakePerson = {
  name: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  email: string;
};

const DATA: Record<
  string,
  {
    first: string[];
    last: string[];
    cities: string[];
    streets: string[];
    postalCodes: string[];
    phones: string[];
    domains: string[];
  }
> = {
  US: {
    first: ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'],
    last: ['Anderson', 'Bennett', 'Carter', 'Morgan', 'Reed', 'Parker'],
    cities: ['Portland', 'Austin', 'Madison', 'Denver'],
    streets: ['Maple Street', 'Oak Avenue', 'Cedar Lane', 'Pine Road'],
    postalCodes: ['97204', '78701', '53703', '80202'],
    phones: ['+1 202-555-0142', '+1 202-555-0187', '+1 202-555-0116'],
    domains: ['example.com', 'example.net'],
  },
  GB: {
    first: ['Alex', 'Jamie', 'Morgan', 'Charlie', 'Riley', 'Sam'],
    last: ['Taylor', 'Morgan', 'Bennett', 'Reed', 'Parker', 'Ellis'],
    cities: ['London', 'Manchester', 'Bristol', 'Edinburgh'],
    streets: ['High Street', 'Church Road', 'Station Road', 'Park Lane'],
    postalCodes: ['SW1A 1AA', 'M1 1AE', 'BS1 4ST', 'EH1 1YZ'],
    phones: ['+44 7700 900123', '+44 7700 900456', '+44 7700 900789'],
    domains: ['example.com', 'example.org'],
  },
  CA: {
    first: ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'],
    last: ['Anderson', 'Bennett', 'Carter', 'Morgan', 'Reed', 'Parker'],
    cities: ['Toronto', 'Vancouver', 'Ottawa', 'Calgary'],
    streets: ['Maple Avenue', 'King Street', 'Cedar Road', 'Lake Street'],
    postalCodes: ['M5V 2T6', 'V6B 1A1', 'K1P 1J1', 'T2P 1J9'],
    phones: ['+1 416-555-0142', '+1 604-555-0187', '+1 613-555-0116'],
    domains: ['example.com', 'example.net'],
  },
  AU: {
    first: ['Alex', 'Jamie', 'Taylor', 'Morgan', 'Casey', 'Riley'],
    last: ['Taylor', 'Morgan', 'Bennett', 'Reed', 'Parker', 'Ellis'],
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    streets: ['George Street', 'King Street', 'Park Road', 'Victoria Avenue'],
    postalCodes: ['2000', '3000', '4000', '6000'],
    phones: ['+61 2 5550 0142', '+61 3 5550 0187', '+61 7 5550 0116'],
    domains: ['example.com', 'example.org'],
  },
  FR: {
    first: ['Camille', 'Alex', 'Lou', 'Noa', 'Sacha', 'Charlie'],
    last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard'],
    cities: ['Paris', 'Lyon', 'Nantes', 'Lille'],
    streets: ['Rue des Fleurs', 'Rue du Parc', 'Avenue Victor Hugo', 'Rue de la Paix'],
    postalCodes: ['75001', '69001', '44000', '59000'],
    phones: ['+33 6 12 34 56 78', '+33 6 23 45 67 89', '+33 6 34 56 78 90'],
    domains: ['example.com', 'example.fr'],
  },
  DE: {
    first: ['Alex', 'Kim', 'Luca', 'Noah', 'Mika', 'Sam'],
    last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer'],
    cities: ['Berlin', 'Hamburg', 'München', 'Köln'],
    streets: ['Hauptstraße', 'Bahnhofstraße', 'Gartenweg', 'Schillerstraße'],
    postalCodes: ['10115', '20095', '80331', '50667'],
    phones: ['+49 30 5550 1420', '+49 40 5550 1870', '+49 89 5550 1160'],
    domains: ['example.com', 'example.de'],
  },
  ES: {
    first: ['Alex', 'Noa', 'Cruz', 'Dani', 'Ariel', 'Andrea'],
    last: ['García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'Gómez'],
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
    streets: ['Calle Mayor', 'Calle del Sol', 'Avenida Central', 'Calle Nueva'],
    postalCodes: ['28001', '08001', '46001', '41001'],
    phones: ['+34 600 123 456', '+34 610 234 567', '+34 620 345 678'],
    domains: ['example.com', 'example.es'],
  },
  JP: {
    first: ['Haruto', 'Yui', 'Aoi', 'Ren', 'Hina', 'Sora'],
    last: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito'],
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'],
    streets: ['Chuo-dori', 'Sakura Avenue', 'Midori Street', 'Higashi Road'],
    postalCodes: ['100-0001', '530-0001', '600-8001', '060-0001'],
    phones: ['+81 90-5550-0142', '+81 80-5550-0187', '+81 70-5550-0116'],
    domains: ['example.com', 'example.jp'],
  },
  BR: {
    first: ['Alex', 'Camila', 'Ravi', 'Noa', 'João', 'Luiza'],
    last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Pereira'],
    cities: ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Recife'],
    streets: ['Rua das Flores', 'Avenida Central', 'Rua do Sol', 'Rua das Palmeiras'],
    postalCodes: ['01001-000', '20010-000', '80010-000', '50010-000'],
    phones: ['+55 11 95550-0142', '+55 21 95550-0187', '+55 41 95550-0116'],
    domains: ['example.com', 'example.br'],
  },
};

function pick<T>(values: T[], seed: number, offset: number): T {
  return values[Math.abs(Math.floor(seed + offset)) % values.length];
}

export function generateFakePerson(country: CountryCode, seed = Math.random() * 1_000_000): FakePerson {
  const data = DATA[country];
  if (!data) throw new Error(`Unsupported country: ${country}`);
  const first = pick(data.first, seed, 1);
  const last = pick(data.last, seed, 7);
  const emailName = `${first}.${last}`
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9.]/g, '')
    .toLowerCase();
  return {
    name: `${first} ${last}`,
    phone: pick(data.phones, seed, 13),
    street: `${Math.floor(Math.abs(seed) % 1900) + 100} ${pick(data.streets, seed, 17)}`,
    city: pick(data.cities, seed, 23),
    postalCode: pick(data.postalCodes, seed, 29),
    email: `${emailName}${Math.floor(Math.abs(seed) % 90) + 10}@${pick(data.domains, seed, 31)}`,
  };
}
