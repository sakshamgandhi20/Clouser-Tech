import type { PageLoad } from './$types';
import { fetchCategoryById, fetchPosts } from '$lib/api/wp';

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const categoryId = url.searchParams.get('category');
  console.log(categoryId)

  if (!categoryId) {
  try {
    const { posts, totalPages } = await fetchPosts(page);
    return { posts, totalPages, page };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1, page: 1, error: true };
  }
}
else{
try {
  const posts = (await fetchCategoryById(Number(categoryId)));
  return { posts, totalPages: 1, page: 1 };
  
} catch (error) {
  console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1, page: 1, error: true };
}
};
};