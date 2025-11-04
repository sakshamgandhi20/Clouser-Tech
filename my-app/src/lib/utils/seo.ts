type MetaInput = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export function buildMeta({ title, description, url, image }: MetaInput) {
  return [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    image ? { property: 'og:image', content: image } : null,
    { name: 'twitter:card', content: 'summary_large_image' }
  ].filter(Boolean);
}
