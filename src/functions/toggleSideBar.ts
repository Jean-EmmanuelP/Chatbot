import { isSidebarOpen } from '../stores/sidebar';

export function toggleSidebar() {
	isSidebarOpen.update((value) => !value);
}
