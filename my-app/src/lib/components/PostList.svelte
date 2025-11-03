<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
    import Skeletons from '$lib/components/Skeletons.svelte';
	export let data;
	$: ({ posts, error } = data);

	// Retry function for network errors
	function retryFetch() {
		location.reload();
	}
</script>



{#if error}
	<!--  Network Error State -->
	<div class="flex flex-col items-center justify-center mt-16 text-center text-red-600">
		<p class="text-lg font-semibold mb-2">⚠️ Unable to load posts.</p>
		<p class="text-gray-600 mb-4">There was a problem fetching the blog posts. Please check your connection.</p>
		<button
			on:click={retryFetch}
			class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
		>
			Retry
		</button>
	</div>

{:else if !posts}
  <!-- Skeleton or Empty State -->
  <Skeletons />

{:else if posts.length === 0}
	<!-- Empty State -->
	<div class="flex flex-col items-center justify-center mt-16 text-center text-gray-500">
		<p class="text-lg font-semibold mb-2">No posts found</p>
		<p class="text-gray-600 mb-4">It looks like there aren’t any blogs right now.</p>
	</div>

    

{:else}
	<!-- Normal Posts Display -->
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
			<article class="rounded-lg border p-4 shadow-sm transition hover:shadow-md">
				{#if post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
					<img
						src={post._embedded['wp:featuredmedia'][0].source_url}
						alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Blog image'}
						class="mb-3 h-48 w-full rounded-md object-cover"
						loading="lazy"
					/>
				{/if}

				<h2 class="mb-2 text-lg font-semibold">
					{@html post.title.rendered}
				</h2>

				<p class="mb-2 text-sm text-gray-600">
					{new Date(post.date).toLocaleDateString()}
					{#if post._embedded?.author?.[0]?.name}
						• {post._embedded.author[0].name}
					{/if}
				</p>

				<div class="line-clamp-3 text-sm text-gray-700">
					{@html post.excerpt.rendered}
				</div>

				<a href={`/blog/${post.slug}`} class="mt-3 inline-block text-blue-600">Read More →</a>
			</article>
		{/each}
	</div>
{/if}

