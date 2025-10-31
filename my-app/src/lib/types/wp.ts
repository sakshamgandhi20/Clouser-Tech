export type WPMedia = {
  source_url?: string
  alt_text?: string
};

export type WPAuthor = { name?: string };

export type WPPost = {
  id: number
  date: string
  slug: string
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<WPMedia>
    author?: Array<WPAuthor>
  }
};

export type WPCategory = {
  id: number
  name: string
  slug: string
  count: number
};
