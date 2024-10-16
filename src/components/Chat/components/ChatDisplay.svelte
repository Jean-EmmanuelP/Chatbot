<!-- components/ChatDisplay.svelte -->
<script lang="ts">
	import LoadingText from './LoadingText.svelte';
	import type { ChatMessage } from '../../../utils/types/chat';

	export let message: ChatMessage;

	let displayedResponse = '';
	let currentIndex = 0;

	$: if (message.response && currentIndex === 0 && !message.displayed) {
		const interval = setInterval(() => {
			if (currentIndex < message.response.length) {
				displayedResponse += message.response[currentIndex];
				currentIndex++;
			} else {
				clearInterval(interval);
				message = { ...message, displayed: true };
			}
		}, 10);
	}
</script>

<ul class="list-none flex flex-col items-start text-white">
	<li class="relative flex pl-5 mb-8">
		<div class="absolute left-7 top-0 w-px bg-white/10 h-[125%]" />
		<div class="z-10 mr-2 flex items-center justify-center bg-red-500 rounded-full w-4 h-4">
			<h1>JP</h1>
		</div>
		<p class="font-bold leading-relaxed max-w-[43vw] break-words -translate-y-1">
			{message.question}
		</p>
	</li>
	<li class="relative flex pl-5 mb-5">
		<div class="absolute left-7 top-0 w-px bg-white/10 h-[125%]" />
		<h1
			class="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full z-10 w-4 h-4 flex items-center justify-center text-white p-1 mr-2"
		>
			M
		</h1>
		<p class="leading-relaxed max-w-[100%] break-words -translate-y-1">
			{#if !message.loading}
				{#each displayedResponse.split('') as letter, i}
					<span class="fade-in" style="animation-delay: {i * 0.01}s">{letter}</span>
				{/each}
			{:else}
				<LoadingText />
			{/if}
		</p>
	</li>
</ul>

<style>
	.fade-in {
		opacity: 0;
		animation: fadeIn 0.5s forwards;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
</style>
