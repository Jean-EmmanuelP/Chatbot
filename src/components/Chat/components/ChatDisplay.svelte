<script lang="ts">
	import type { ChatMessage } from '../../../utils/types/chat';

	export let message: ChatMessage;
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
			{#if message.response}
				{message.response}
			{:else}
				Réponse en cours de chargement
			{/if}
		</p>
	</li>
</ul>
