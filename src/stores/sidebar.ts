import { writable } from 'svelte/store';

export const isSidebarOpen = writable<boolean>(true);
