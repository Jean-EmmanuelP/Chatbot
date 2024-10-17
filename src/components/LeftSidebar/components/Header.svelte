<script>
	import { addNewChat } from '../../../utils/functions/chat';
</script>

<button
	on:click={addNewChat}
	class="h-[8%] w-full border border-t-0 border-r-0 border-l-0 border-[#342F2E] flex items-center justify-start pl-4"
>
	<enhanced:img
		class="w-[40%]"
		src="/src/lib/images/mistral_logo.webp"
		alt="mistral logo"
	/>
</button>
