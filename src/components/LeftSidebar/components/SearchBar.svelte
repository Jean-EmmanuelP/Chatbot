<script>
	import Search from '$lib/svg/Search.svelte';

	export let query = '';
</script>

<div
	class="flex items-center bg-white/10 rounded-md p-2 border border-transparent focus-within:border focus-within:border-orange-500"
>
	<input
		type="text"
		bind:value={query}
		placeholder="Search..."
		class="text-gray-300 placeholder-gray-500 rounded-md focus:outline-none w-full bg-transparent pl-4"
	/>
	<Search />
</div>
