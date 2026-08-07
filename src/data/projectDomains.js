// Domain grouping for the gallery filter. Kept beside the data rather than in
// projectData.js so the source records stay untouched.
export const DOMAINS = [
  { id: 'all', label: 'All work' },
  { id: 'llm', label: 'LLMs & agents' },
  { id: 'generative', label: 'Generative' },
  { id: 'vision', label: 'Computer vision' },
  { id: 'ml', label: 'Applied ML' },
  { id: 'engineering', label: 'Engineering' },
];

const DOMAIN_BY_PROJECT_ID = {
  1: 'llm',
  2: 'llm',
  3: 'llm',
  5: 'llm',
  6: 'llm',
  9: 'llm',
  15: 'llm',
  4: 'generative',
  7: 'generative',
  10: 'generative',
  8: 'vision',
  11: 'vision',
  12: 'vision',
  13: 'vision',
  14: 'vision',
  16: 'vision',
  17: 'ml',
  18: 'ml',
  19: 'engineering',
  20: 'engineering',
  21: 'engineering',
};

export const getDomain = (id) => DOMAIN_BY_PROJECT_ID[id] || 'engineering';

export const getDomainLabel = (id) =>
  DOMAINS.find((d) => d.id === getDomain(id))?.label ?? 'Engineering';
