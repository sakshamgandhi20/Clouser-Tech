  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
    {#each Array(6) as _}
      <div class="animate-pulse border rounded-lg p-4 shadow-sm">
        <div class="h-48 bg-gray-200 rounded-md mb-3"></div>
        <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div class="space-y-2">
          <div class="h-3 bg-gray-200 rounded"></div>
          <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    {/each}
  </div>

