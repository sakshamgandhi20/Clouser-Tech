import type { WPPost, WPCategory } from '$lib/types/wp';
import { PUBLIC_WP_API_BASE } from '$env/static/public';

const API_BASE = PUBLIC_WP_API_BASE;

export async function fetchPosts(page = 1): Promise<{ posts: WPPost[]; totalPages: number  }> {
  
  try {
    const url = `${API_BASE}/posts?per_page=9&page=${page}&_embed=1`;
  
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const posts: WPPost[] = await res.json();
  
  
    const totalPages = Number(res.headers.get('x-wp-totalpages')) || 1;
    return { posts, totalPages };
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    return { posts: [], totalPages: 1};
  }
}


export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {

  try {
    const url = `${API_BASE}/posts?slug=${slug}&_embed=1`;
    const res = await fetch(url);
  
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
    const posts: WPPost[] = await res.json();
  
    return posts.length ? posts[0] : null;
  } catch (error) {
    console.error('Error in fetchPostBySlug:', error);
    return null;
  }
}


export async function fetchCategories(): Promise<WPCategory[] > {
  try {
    const url = `${API_BASE}/categories?per_page=100&orderby=name&_fields=id,slug,name,count`;
    const res = await fetch(url);
  
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    const categories: WPCategory[] = await res.json();
  
   return categories;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
}

export async function fetchCategoryById(id: number) {
  try {
    const url = `${API_BASE}/posts?categories=${id}`;
    const res = await fetch(url); 
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const posts: WPPost[] = await res.json();
    return  posts ;
  }
  catch (error) {
    console.error('Error in fetchCategoryById:', error);
    return null;
  }
}

export async function fetchPostsBySearch(term = ""): Promise<{ posts: WPPost[] }> {
  try {
    const url = `${API_BASE}/posts?search=${term}`;
  
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const posts: WPPost[] = await res.json();
  
    return { posts };
  } catch (error) {
    console.error('Error in fetchPostsBySearch:', error);
    return { posts: []};
  }
}