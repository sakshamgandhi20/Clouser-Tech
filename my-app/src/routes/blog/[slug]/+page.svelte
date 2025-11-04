<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

  export let data;
  $: ({ metadata } = data);

</script>
<PostCard postData={data.post} />
<svelte:head>

  {#each metadata as tag}
    {#if tag?.name && tag?.content}
    <meta name={tag?.name} content={tag?.content} />
    {:else if tag?.property && tag?.content}
    <meta property={tag?.property} content={tag?.content} />
    {/if}
  {/each}
</svelte:head>
