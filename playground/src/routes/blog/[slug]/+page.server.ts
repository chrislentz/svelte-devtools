import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const posts: Record<string, { title: string; tag: string; author: string; readTime: number; excerpt: string }> = {
  'hello-world': {
    title: 'Hello, World!',
    tag: 'Tutorial',
    author: 'Chris',
    readTime: 3,
    excerpt:
      'Welcome to the Svelte DevTools playground. This blog page demonstrates dynamic route parameters — notice that the "slug" param is captured and visible in the Routes tab of the devtools panel.',
  },
  'svelte-5-runes': {
    title: 'Understanding Svelte 5 Runes',
    tag: 'Deep Dive',
    author: 'Chris',
    readTime: 8,
    excerpt:
      'Svelte 5 introduces runes — a new primitive for reactivity. Instead of $: labels and reactive declarations, you now use $state(), $derived(), $effect(), and $props() to manage state in a more explicit and composable way.',
  },
};

export const load: PageServerLoad = async ({ params }) => {
  const post = posts[params.slug];
  if (!post) error(404, { message: `Post "${params.slug}" not found` });

  return {
    post,
    slug: params.slug,
  };
};
