<script>
	import Arrow from './../../lib/svg/Arrow.svelte';
	import SearchBar from './components/SearchBar.svelte';
	import { toggleSidebar } from '../../utils/functions/toggleSideBar';
	import { isSidebarOpen } from '../../utils/stores/sidebar.ts';
	// here add the chat with the question and and answer
</script>

<div class="relative h-full w-full">
	<button
		on:click={toggleSidebar}
		class={`absolute top-4 left-4 z-20 transition-all duration-150 ${$isSidebarOpen ? 'rotate-180 sm:translate-x-0 translate-x-[200px]' : ''}`}
	>
		<Arrow color={'#FF4500'} width={'20'} height={'20'} />
	</button>
	<enhanced:img
		class="sm:w-[400px] w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		src="/Users/jperrama/Code/Chatbot/src/lib/images/mistral_logo.webp"
		alt="mistral logo"
	/>
	<!-- take the question from here -->
	<SearchBar />
</div>
