import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    buildTime: Date.now(),
    version: '0.1.0',
  };
};
