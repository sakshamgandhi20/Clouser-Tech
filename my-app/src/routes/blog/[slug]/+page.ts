import type { PageLoad } from './$types';
import { fetchPostBySlug } from '$lib/api/wp';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;
  try {
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return { status: 404, error: new Error('Post not found') };
    }

    return { post };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { post: null, error: true };
  }
};
