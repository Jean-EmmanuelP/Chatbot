import { writable } from 'svelte/store';
import type { ChatMessage } from '../types/chat';

export const chatStore = writable<ChatMessage[]>([]);
