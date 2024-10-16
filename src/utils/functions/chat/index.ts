import { chatStore, selectedChatStore } from '../../stores/chat';
import type { Chat } from '../../types/chat';

export function addNewChat() {
	chatStore.update((chats) => {
		const emptyChat = chats.find((chat) => chat.name === '' && chat.messages.length === 0);

		if (emptyChat) {
			selectedChatStore.set(emptyChat);
			return chats;
		} else {
			const newChat: Chat = {
				id: Date.now(),
				name: ``,
				messages: []
			};
			const updatedChats = [...chats, newChat];
			selectedChatStore.set(newChat);
			return updatedChats;
		}
	});
}

export function deleteChat(chatId: number) {
	chatStore.update((chats) => {
		const updatedChats = chats.filter((chat) => chat.id !== chatId);
		selectedChatStore.update((selectedChat) => {
			if (selectedChat && selectedChat.id === chatId) {
				return null;
			}
			return selectedChat;
		});
		return updatedChats;
	});
}
