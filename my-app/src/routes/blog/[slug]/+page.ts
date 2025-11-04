import type { PageLoad } from './$types';
import { fetchPostBySlug } from '$lib/api/wp';
import { buildMeta } from '$lib/utils/seo';

export const load: PageLoad = async ({ params,url }) => {
  const { slug } = params;
  
  try {
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return { status: 404, error: new Error('Post not found') };
    }
    const metadata = buildMeta({
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
      url: url.href,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
    });
    return { post, metadata  };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { post: null, error: true };
  }
};
