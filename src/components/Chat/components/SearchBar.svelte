<script>
	import Send from '$lib/svg/Send.svelte';

	let model = 'Large 2';
	let query = '';
</script>

<div
	class="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-[55%] sm:h-[60px] h-[100px] border border-[#342F2E] rounded-xl"
>
	<div class="relative flex items-center w-full h-full text-white px-4">
		<select bind:value={model} class="bg-transparent text-[#A8A29D]">
			<option>Large 2</option>
			<option>Medium</option>
			<option>Small</option>
		</select>
		<div class="h-[80%] w-[1px] bg-[#342F2E] mx-2" />
		<input
			type="text"
			bind:value={query}
			placeholder="Ask anything!"
			class="flex-grow bg-transparent outline-none text-white placeholder-[#A8A29D]"
		/>

		<button class="bg-orange-500/20 p-2 rounded-xl sm:translate-y-0 translate-y-6 sm:translate-x-0 translate-x-2.5">
			<div>
				<Send height={'20px'} width={'20px'} color={'#D35400' + '66'} />
			</div>
		</button>
	</div>

	<!-- Warning for possible inaccuracies -->
	<p class="absolute -bottom-7 text-[12px] right-0 text-[#A8A29D]">
		Responses may contain inaccuracies.
	</p>
</div>
