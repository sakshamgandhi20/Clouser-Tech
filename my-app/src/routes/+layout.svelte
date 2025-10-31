<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-white mb-3 border-b sticky top-0 z-50">
  <div class="max-w-6xl mx-auto  px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <!-- Blog title -->
    <div class="flex items-center gap-3">
      <h1 class="text-2xl md:text-3xl font-bold">Hunjan Hospital Blogs</h1>
    </div>

   
  </div>
</header>

{@render children?.()}
