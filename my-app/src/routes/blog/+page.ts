import type { PageLoad } from './$types';
import { fetchPosts } from '$lib/api/wp';

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;

  try {
    const { posts, totalPages } = await fetchPosts(page);
    return { posts, totalPages, page };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1, page: 1, error: true };
  }
};


