<script lang="ts">
	import type { ChatMessage } from '../../../utils/types/chat';

	export let message: ChatMessage;
</script>

<ul class="list-none flex flex-col items-start text-white">
	<li class="relative flex items-center pl-5 mb-5">
		<div class="absolute left-2 top-0 bottom-0 w-px bg-white"></div>
		<h1 class="mr-2">💬</h1>
		<p class="font-bold leading-relaxed max-w-[43vw] break-words">{message.question}</p>
	</li>
	<li class="relative flex items-center pl-5 mb-5">
		<div class="absolute left-2 top-0 bottom-0 w-px bg-white"></div>
		<h1 class="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white p-1 mr-2">
			M
		</h1>
		<p class="leading-relaxed max-w-[70%] break-words">
			{#if message.response}
				{message.response}
			{:else}
				Réponse en cours de chargement
			{/if}
		</p>
	</li>
</ul>
