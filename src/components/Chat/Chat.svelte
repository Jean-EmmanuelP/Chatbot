<script>
	import Arrow from './../../lib/svg/Arrow.svelte';
	import SearchBar from './components/SearchBar.svelte';
	import Body from './components/Body.svelte';
	import { toggleSidebar } from '../../utils/functions/toggleSideBar';
	import { isSidebarOpen } from '../../utils/stores/sidebar';
	import { addNewChat } from '../../utils/functions/chat';
	// here add the chat with the question and and answer
</script>

<div class="relative h-full w-full">
	<button
		on:click={toggleSidebar}
		class={`absolute top-4 left-4 z-20 transition-all duration-150 ${$isSidebarOpen ? 'rotate-180 sm:translate-x-0 translate-x-[200px]' : ''}`}
	>
		<Arrow color={'#FF4500'} width={'20'} height={'20'} />
	</button>
	<button
		class={`absolute top-[17px] left-14 z-20 transition-all duration-150 h-[18px] w-[18px] flex items-center justify-center rounded-full border border-orange-600 ${$isSidebarOpen ? 'rotate-180 sm:translate-x-0 translate-x-[200px]' : ''}`}
		on:click={addNewChat}
	>
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-[.8px] bg-orange-600"
		/>
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[.8px] w-2 bg-orange-600"
		/>
	</button>
	<Body />
	<!-- take the question from here -->
	<SearchBar />
</div>
