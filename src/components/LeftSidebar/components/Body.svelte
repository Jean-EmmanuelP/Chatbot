<script>
	import ChatList from './ChatList.svelte';
	import SearchBar from './SearchBar.svelte';

	let searchQuery = '';
</script>

<div class="h-full w-full py-5 px-2">
	<SearchBar bind:query={searchQuery} />
	<ChatList {searchQuery} />
</div>
