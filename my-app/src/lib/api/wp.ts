import type { WPPost } from '$lib/types/wp';
import { PUBLIC_WP_API_BASE } from '$env/static/public';

const API_BASE = PUBLIC_WP_API_BASE;

export async function fetchPosts(page = 1): Promise<{ posts: WPPost[]; totalPages: number }> {
  const url = `${API_BASE}/posts?per_page=9&page=${page}&_embed=1`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  const posts: WPPost[] = await res.json();


  const totalPages = Number(res.headers.get('x-wp-totalpages')) || 1;
  return { posts, totalPages };
}


export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${API_BASE}/posts?slug=${slug}&_embed=1`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  const posts: WPPost[] = await res.json();

  return posts.length ? posts[0] : null;
}