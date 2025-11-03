<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // use correct store

  // variable to store user input
  let query = '';

  // reference for input element (optional)
  let inputEl: HTMLInputElement | null = null;

  // when component loads, get "search" param from URL
  onMount(() => {
    const searchParam = $page.url.searchParams.get('search');
    if (searchParam) query = searchParam;
  });

  // when user submits search form
  function handleSearch(e: Event) {
    e.preventDefault();

  const params = new URLSearchParams($page.url.searchParams as any);

    // if query has text, set it as ?search=keyword
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search'); // remove empty query
    }

    // reset pagination when searching
    params.delete('page');

    // navigate to blog page with search param
    goto(`/blog?${params.toString()}`);
  }

  // clear the search
  function clearSearch() {
    query = '';
  const params = new URLSearchParams($page.url.searchParams as any);
    params.delete('search');
    params.delete('page');
    goto(`/blog?${params.toString()}`);
    inputEl?.focus();
  }
</script>

<!-- 🔍 Search Bar -->
<form
  class="flex items-center gap-2"
  on:submit={handleSearch}
>
  <!-- Input Field -->
  <input
    bind:this={inputEl}
    bind:value={query}
    type="search"
    placeholder="Search posts..."
    class="px-3 py-2 border rounded-md w-60 md:w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <!-- Clear Button (only shows when there’s text) -->
  {#if query}
    <button
      type="button"
      on:click={clearSearch}
      class="text-sm px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
    >
      Clear
    </button>
  {/if}

  <!-- Submit Button -->
  <button
    type="submit"
    class="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
  >
    Search
  </button>
</form>
