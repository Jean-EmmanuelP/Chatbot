<script>
	import Footer from './components/Footer.svelte';
	import Header from './components/Header.svelte';
	import Body from './components/Body.svelte';
	import { isSidebarOpen } from '../../utils/stores/sidebar';
</script>

<div
	class={`h-[100%] sm:relative sm:z-0  transition-all duration-150 ${$isSidebarOpen ? 'sm:w-[20vw] w-[60vw]' : 'w-0'} absolute z-10 flex flex-col border border-l-0 border-t-0 border-b-0 border-r-[#342F2E] bg-[#181412] overflow-hidden`}
>
	<Header />
	<Body />
	<Footer />
</div>
