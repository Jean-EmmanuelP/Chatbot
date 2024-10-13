<script>
	import Arrow from './../../lib/svg/Arrow.svelte';
	import SearchBar from './components/SearchBar.svelte';
	import Body from './components/Body.svelte';
	import { toggleSidebar } from '../../utils/functions/toggleSideBar';
	import { isSidebarOpen } from '../../utils/stores/sidebar';
	// here add the chat with the question and and answer
</script>

<div class="relative h-full w-full">
	<button
		on:click={toggleSidebar}
		class={`absolute top-4 left-4 z-20 transition-all duration-150 ${$isSidebarOpen ? 'rotate-180 sm:translate-x-0 translate-x-[200px]' : ''}`}
	>
		<Arrow color={'#FF4500'} width={'20'} height={'20'} />
	</button>
	<Body />
	<!-- take the question from here -->
	<SearchBar />
</div>
