import type { PageServerLoad } from './$types';

let visitCount = 0;

export const load: PageServerLoad = async () => {
  visitCount++;

  return {
    user: {
      name: 'Chris',
      role: 'developer',
      preferences: {
        theme: 'dark',
        language: 'en',
      },
    },
    visits: visitCount,
    timestamp: Date.now(),
    features: ['runes', 'snippets', 'universal-reactivity'],
  };
};
