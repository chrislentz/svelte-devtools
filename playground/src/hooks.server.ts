import { sequence } from '@sveltejs/kit/hooks';
import { svelteDevtoolsHandle } from '../../packages/kit/src/index.ts';

export const handle = sequence(svelteDevtoolsHandle);
