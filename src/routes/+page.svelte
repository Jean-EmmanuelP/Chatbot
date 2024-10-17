<script>
	import Chat from '../components/Chat/Chat.svelte';
	import LeftSidebar from '../components/LeftSidebar/LeftSidebar.svelte';
	import { toggleSidebar } from '../utils/functions/toggleSideBar';
	import { isSidebarOpen } from '../utils/stores/sidebar';

	let isMobileOrTablet = false;

	function checkScreenWidth() {
		if (typeof window !== 'undefined') {
			isMobileOrTablet = window.innerWidth <= 768;
		}
	}

	if (typeof window !== 'undefined') {
		checkScreenWidth();
		window.addEventListener('resize', checkScreenWidth);
	}
</script>

<svelte:head>
	<title>Chatbot</title>
	<meta name="description" content="Mistral Chatbot demo" />
</svelte:head>

<div class="overflow-hidden bg-[#181412] w-screen h-screen flex flex-row">
	{#if $isSidebarOpen && isMobileOrTablet}
		<button
			on:click={() => {
				if ($isSidebarOpen) {
					toggleSidebar();
				}
			}}
			class="absolute inset-0 bg-black/50 w-full h-full z-4"
		/>
	{/if}
	<LeftSidebar />
	<Chat />
</div>
