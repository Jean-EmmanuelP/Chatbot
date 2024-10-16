<!-- components/ChatWindow.svelte -->
<script lang="ts">
	import { chatStore, selectedChatStore } from '../../../utils/stores/chat';
	import ChatDisplay from './ChatDisplay.svelte';

	$: selectedChat = $selectedChatStore;
	$: chats = $chatStore;

	// Obtenir les messages du chat sélectionné
	$: messages = selectedChat
		? chats.find((chat) => chat.id === selectedChat.id)?.messages || []
		: [];
</script>

<div class="h-full w-full">
	{#if messages.length === 0}
		<enhanced:img
			class="sm:w-[400px] w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			src="/Users/jperrama/Code/Chatbot/src/lib/images/mistral_logo.webp"
			alt="mistral logo"
		/>
	{:else}
		<div
			class="flex flex-col gap-4 mx-auto sm:w-[55%] w-[90%] mt-[7%] max-h-[78vh] overflow-y-auto"
		>
			{#each messages as message (message.id)}
				<ChatDisplay {message} />
			{/each}
		</div>
	{/if}
</div>
