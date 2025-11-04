<script lang="ts">
  export let postData;
  $:  post  = postData;
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

    <!-- Back to blog link -->
    <a href="/blog" class="text-blue-600 mt-6 inline-block hover:underline">
      ← Back to Blog
    </a>
  </article>

{:else}
  <!-- 404 Not Found Page -->
  <section class="text-center py-20">
    <h1 class="text-6xl font-bold text-gray-700 mb-4">404</h1>
    <p class="text-gray-500 text-lg mb-6">Oops! The blog post you’re looking for doesn’t exist or may have been removed.</p>
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
