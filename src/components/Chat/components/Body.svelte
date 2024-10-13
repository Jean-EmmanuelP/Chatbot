<script lang="ts">
	import { chatStore } from '../../../utils/stores/chat';
	import { type ChatMessage } from '../../../utils/types/chat';
	import { onDestroy } from 'svelte';
	import ChatDisplay from './ChatDisplay.svelte';

	let messages: ChatMessage[] = [];

	const unsubscribe = chatStore.subscribe((value) => {
		messages = value;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<!-- the width of the container for the messages is not good because in the mistral website,
  the scroll is not supposed to be here -->
<div class="h-full w-full">
	{#if $chatStore.length === 0}
		<enhanced:img
			class="sm:w-[400px] w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			src="/Users/jperrama/Code/Chatbot/src/lib/images/mistral_logo.webp"
			alt="mistral logo"
		/>
	{:else}
		<div
			class="flex flex-col gap-4 mx-auto sm:w-[55%] w-[90%] mt-[7%] max-h-[78vh] overflow-y-auto"
		>
			{#each messages as message}
				<ChatDisplay {message} />
			{/each}
		</div>
	{/if}
</div>
