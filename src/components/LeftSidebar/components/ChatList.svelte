<!-- components/ChatList.svelte -->
<script lang="ts">
	import { chatStore, selectedChatStore } from './../../../utils/stores/chat';
	import { deleteChat } from './../../../utils/functions/chat';
	import Trash from '$lib/svg/Trash.svelte';

	export let searchQuery = '';

	$: chats = $chatStore;
	$: selectedChat = $selectedChatStore;

	$: filteredChats = chats.filter((chat) =>
		chat.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function selectChat(chatId: number) {
		const chat = chats.find((c) => c.id === chatId);
		if (chat) {
			selectedChatStore.set(chat);
		}
	}
</script>

<ul class="flex flex-col gap-2 mt-4">
	{#each filteredChats as chat}
		{#if chat.name !== ''}
			<li class="flex items-center w-full">
				<button
					class="w-full pl-3 p-2 flex items-center justify-between rounded-md hover:bg-white/5 {selectedChat &&
					chat.id === selectedChat.id
						? 'bg-white/10 text-orange-600'
						: 'text-white'} group"
					on:click={() => selectChat(chat.id)}
				>
					{chat.name}
					<button on:click={() => deleteChat(chat.id)}>
						<Trash color={selectedChat && chat.id === selectedChat.id ? 'white' : 'none'} />
					</button>
				</button>
			</li>
		{/if}
	{/each}
</ul>
