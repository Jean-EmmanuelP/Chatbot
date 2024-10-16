<script lang="ts">
	import { type ChatMessage } from './../../../utils/types/chat';
	import { chatStore } from './../../../utils/stores/chat';
	import Send from '$lib/svg/Send.svelte';
	import { Mistral } from '@mistralai/mistralai';
	import { PUBLIC_MISTRAL_API_KEY } from '$env/static/public';

	const apiKey = PUBLIC_MISTRAL_API_KEY || 'your_api_key';
	const client = new Mistral({ apiKey: apiKey });

	let model = 'Large 2';
	let query = '';

	function adjustTextareaHeight(event: Event) {
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		const height = Math.min(textarea.scrollHeight, 400);
		textarea.style.height = `${height}px`;
	}

	async function sendMessage() {
		if (query.trim() === '') return;

		const newMessage: ChatMessage = {
			id: Date.now(),
			channel: model,
			question: query,
			response: '',
			loading: true
		};

		chatStore.update((messages) => [...messages, newMessage]);

		query = '';
		const textarea = document.querySelector('textarea');
		if (textarea) {
			textarea.style.height = 'auto';
		}

		try {
			const chatResponse = await client.chat.complete({
				model: 'mistral-tiny',
				messages: [{ role: 'user', content: newMessage.question }]
			});

			const assistantReply = chatResponse.choices[0].message.content;

			chatStore.update((messages) => {
				return messages.map((msg) => {
					if (msg.id === newMessage.id) {
						return { ...msg, response: assistantReply, loading: false };
					}
					return msg;
				});
			});
		} catch (error) {
			console.error('Error fetching the assistant reply:', error);

			chatStore.update((messages) => {
				return messages.map((msg) => {
					if (msg.id === newMessage.id) {
						return { ...msg, response: 'Sorry, an error occurred while fetching the response.' };
					}
					return msg;
				});
			});
		}
	}
</script>

<!-- I could have done better the responsiveness, not the same on phone -->
<div
	class="absolute overflow-hidden bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-[55%] sm:min-h-[60px] min-h-[100px] border border-[#342F2E] rounded-xl"
>
	<div class="relative flex items-center w-full min-h-[60px] bg-[#181412] text-white px-4">
		<select bind:value={model} class="bg-transparent text-[#A8A29D]">
			<option>Large 2</option>
			<option>Medium</option>
			<option>Small</option>
		</select>
		<div class="h-[80%] w-[1px] bg-[#342F2E] mx-2" />
		<textarea
			bind:value={query}
			placeholder="Ask anything!"
			class="flex-grow my-auto bg-transparent outline-none text-white placeholder-[#A8A29D] resize-none flex items-center justify-center"
			rows="1"
			on:input={adjustTextareaHeight}
			on:keydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					sendMessage();
				}
			}}
		/>

		<button
			class="hover:bg-orange-500/40 bg-orange-500/20 p-2 rounded-xl sm:translate-y-0 translate-y-6 sm:translate-x-0 translate-x-2.5"
			on:click={sendMessage}
		>
			<div>
				<Send height={'20px'} width={'20px'} color={'#D35400' + '66'} />
			</div>
		</button>
	</div>

	<!-- Warning for possible inaccuracies -->
	<p class="absolute sm:block hidden -bottom-7 text-[12px] right-0 text-[#A8A29D]">
		Responses may contain inaccuracies.
	</p>
</div>
