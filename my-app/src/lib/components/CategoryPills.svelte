<script lang="ts">
export let data;
let categories = data?.categories ?? [];
let root: HTMLElement | null = null;
let isOpen = false;

  // Toggle dropdown open/close
  function toggleDropdown() {
    isOpen = !isOpen;
  }

  // Close dropdown when clicking outside — use element binding and attach
  // listeners only in the browser to avoid SSR issues.
  import { onMount, onDestroy } from 'svelte';

  function handleClickOutside(event: MouseEvent) {
    if (!root) return;
    if (!root.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('click', handleClickOutside);
  });
</script>

<!-- Dropdown Container -->
 
<div class="relative" id="category-dropdown" bind:this={root}>
  <!-- Button -->
  <button
    onclick={toggleDropdown}
    class="px-4 py-2 border rounded-md bg-white text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition"
    aria-expanded={isOpen}
  >
   
    <span class="text-gray-500 text-xs">{isOpen ? 'Categories ▲' : 'Categories ▼'}</span>
  </button>

  <!-- Dropdown List -->
  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50"
    >
      {#each categories as category}
        <a
         href={`/blog?category=${category.id}`}
          class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
        >
          {category.name}
        </a>
      {/each}
    </div>
  {/if}
</div>
 