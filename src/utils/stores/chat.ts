import { writable } from 'svelte/store';
import type { Chat } from '../types/chat';

export const chatStore = writable<Chat[]>([]);
export const selectedChatStore = writable<Chat | null>(null);
