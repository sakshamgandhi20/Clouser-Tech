<script lang="ts">
  import { Share2, Facebook, Twitter, Copy, MessageCircle } from 'lucide-svelte';

  export let postData;
  $: post = postData;

  // Share links setup
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post?.title?.rendered || 'Check out this post!';
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
  };

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    alert('🔗 Link copied to clipboard!');
  }
</script>

{#if post}
  <!-- Single Blog Post -->
  <article class="max-w-3xl mx-auto py-10">
    <!-- Title -->
    <h1 class="text-4xl font-bold mb-4">
      {post.title.rendered}
    </h1>

    <!-- Date + Author -->
    <p class="text-gray-500 text-sm mb-6">
      {new Date(post.date).toLocaleDateString()}
      • {post._embedded.author[0].name}
    </p>

    <!-- Featured Image -->
    {#if post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
      <img
        src={post._embedded['wp:featuredmedia'][0].source_url}
        alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Post image'}
        class="w-full h-96 object-cover rounded-xl mb-6"
      />
    {/if}

    <!-- Post Content -->
    <div class="prose max-w-none">
      {@html post.content.rendered}
    </div>

    <!-- Share Links -->
    <div class="border-t border-gray-200 pt-6 mt-10">
      <div class="flex items-center gap-2 mb-3 text-gray-700">
        <Share2 class="w-5 h-5" />
        <h3 class="text-lg font-semibold">Share this post</h3>
      </div>

      <div class="flex flex-wrap gap-3">
        <!-- WhatsApp -->
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <MessageCircle class="w-4 h-4" />
          WhatsApp
        </a>

        <!-- Facebook -->
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Facebook class="w-4 h-4" />
          Facebook
        </a>

        <!-- X (Twitter) -->
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          <Twitter class="w-4 h-4" />
          X (Twitter)
        </a>

        <!-- Copy Link -->
        <button
          on:click={copyLink}
          class="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <Copy class="w-4 h-4" />
          Copy Link
        </button>
      </div>
    </div>

    <!-- Back to blog link -->
    <a href="/blog" class="text-blue-600 mt-6 inline-block hover:underline">
      ← Back to Blog
    </a>
  </article>

{:else}
  <!-- 404 Not Found Page -->
  <section class="text-center py-20">
    <h1 class="text-6xl font-bold text-gray-700 mb-4">404</h1>
    <p class="text-gray-500 text-lg mb-6">
      Oops! The blog post you’re looking for doesn’t exist or may have been removed.
    </p>
    <div class="mx-auto w-40 h-40 bg-gray-100 rounded-full mb-8 flex items-center justify-center text-gray-400 text-4xl">
      📰
    </div>
    <a
      href="/blog"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
    >
      ← Back to Blog
    </a>
  </section>
{/if}
