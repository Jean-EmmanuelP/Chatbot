<script>
	import Chat from './../components/Chat.svelte';
	import LeftSidebar from '../components/LeftSidebar/LeftSidebar.svelte';
</script>

<svelte:head>
	<title>Chatbot</title>
	<meta name="description" content="Mistral Chatbot demo" />
</svelte:head>

<div class="bg-[#181412] w-screen h-screen flex flex-row">
	<LeftSidebar />
	<Chat />
</div>
