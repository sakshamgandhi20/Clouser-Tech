<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import PostList from '$lib/components/PostList.svelte';
  export let data;
</script>
<PostList {data} />
<Pagination page={data.page} totalPages={data.totalPages} />