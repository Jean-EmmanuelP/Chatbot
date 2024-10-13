<script>
	import Chat from '../components/Chat/Chat.svelte';
	import LeftSidebar from '../components/LeftSidebar/LeftSidebar.svelte';
	import { toggleSidebar } from '../functions/toggleSideBar';
	import { isSidebarOpen } from '../stores/sidebar';
	import Device from 'svelte-device-info';
</script>

<svelte:head>
	<title>Chatbot</title>
	<meta name="description" content="Mistral Chatbot demo" />
</svelte:head>

<div class="bg-[#181412] w-screen h-screen flex flex-row">
	{#if $isSidebarOpen && (Device.isPhone || Device.isTablet)}
		<!-- this is a black filter and will only appear if it is a real phone or tablet, not if the width change -->
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
