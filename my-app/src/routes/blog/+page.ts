import type { PageLoad } from './$types';
import { fetchCategoryById, fetchPosts, fetchPostsBySearch } from '$lib/api/wp';

export const load: PageLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const categoryId = url.searchParams.get('category') ;
  const searchTerm = url.searchParams.get('search') ;

  if (!categoryId && !searchTerm) {
    try {
      const { posts, totalPages } = await fetchPosts(page);
      return { posts, totalPages, page };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { posts: [], totalPages: 1, page: 1, error: true };
    }
  }
  else if (searchTerm) {
    try {
      const { posts } = await fetchPostsBySearch(searchTerm ?? '');
      return { posts, totalPages: 1, page: 1 };
      
    } catch (error) {
      console.error('Error fetching posts by search:', error);
      return { posts: [], totalPages: 1, page: 1, error: true };
    }
  }
  else {
    try {
      const posts  = await fetchCategoryById(Number(categoryId));
      return { posts, totalPages: 1, page: 1 };
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return { posts: [], totalPages: 1, page: 1, error: true };
    }
  }
};