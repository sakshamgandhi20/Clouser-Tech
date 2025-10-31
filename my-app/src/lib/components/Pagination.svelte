<script lang="ts">
  import { goto } from '$app/navigation';

  export let page: number;
  export let totalPages: number;
    function nextPage() {
    if (page < totalPages) {
      goto(`/blog?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      goto(`/blog?page=${page - 1}`);
    }
  }
</script>


<!-- Pagination Buttons -->
  <div class="flex justify-center items-center gap-4 mt-8">
    <button
      on:click={prevPage}
      disabled={page === 1}
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      ← Previous
    </button>

    <span class="text-gray-700">Page {page} of {totalPages}</span>

    <button
      on:click={nextPage}
      disabled={page === totalPages}
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Next →
    </button>
  </div>