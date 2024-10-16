<!-- components/SearchBar.svelte -->
<script lang="ts">
	import { type ChatMessage, type Chat } from './../../../utils/types/chat';
	import { chatStore, selectedChatStore } from './../../../utils/stores/chat';
	import Send from '$lib/svg/Send.svelte';
	import { Mistral } from '@mistralai/mistralai';
	import { PUBLIC_MISTRAL_API_KEY } from '$env/static/public';

	const apiKey = PUBLIC_MISTRAL_API_KEY || 'your_api_key';
	const client = new Mistral({ apiKey: apiKey });

	let model = 'Large 2';
	let query = '';

	$: selectedChat = $selectedChatStore;
	$: chats = $chatStore;

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
			question: query,
			response: '',
			loading: true,
			is_displayed: false,
		};

		let currentChat = selectedChat;

		if (chats.length === 0) {
			const newChat: Chat = {
				id: Date.now(),
				name: query.trim().substring(0, 15),
				messages: []
			};
			chatStore.update((chats) => [...chats, newChat]);
			selectedChatStore.set(newChat);
			currentChat = newChat;
		} else if (!selectedChat) {
			selectedChatStore.set(chats[0]);
			currentChat = chats[0];
		} else {
			currentChat = selectedChat;
		}

		chatStore.update((chats) => {
			const updatedChats = chats.map((chat) => {
				if (chat.id === currentChat.id) {
					const updatedName = chat.name === '' ? query.trim().substring(0, 10) : chat.name;
					return {
						...chat,
						name: updatedName,
						messages: [...chat.messages, newMessage]
					};
				}
				return chat;
			});
			console.log('Updated chatStore after adding message:', updatedChats);
			return updatedChats;
		});

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

			chatStore.update((chats) => {
				const updatedChats = chats.map((chat) => {
					if (chat.id === currentChat.id) {
						return {
							...chat,
							messages: chat.messages.map((msg) => {
								if (msg.id === newMessage.id) {
									return { ...msg, response: assistantReply || '', loading: false };
								}
								return msg;
							})
						};
					}
					return chat;
				});
				console.log('Updated chatStore after receiving assistant reply:', updatedChats);
				return updatedChats;
			});
		} catch (error) {
			console.error('Error fetching the assistant reply:', error);

			chatStore.update((chats) => {
				const updatedChats = chats.map((chat) => {
					if (chat.id === currentChat.id) {
						return {
							...chat,
							messages: chat.messages.map((msg) => {
								if (msg.id === newMessage.id) {
									return {
										...msg,
										response: 'Sorry, an error occurred while fetching the response.',
										loading: false
									};
								}
								return msg;
							})
						};
					}
					return chat;
				});
				console.log('Updated chatStore after error:', updatedChats);
				return updatedChats;
			});
		}
	}
</script>

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
	<p class="absolute sm:block hidden -bottom-7 text-[12px] right-0 text-[#A8A29D]">
		Les réponses peuvent contenir des inexactitudes.
	</p>
</div>
