
<script lang="ts">
	import '../app.postcss';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import "carbon-components-svelte/css/white.css";
	import './styles.css';
	import '../app.postcss';
	import Landing from '../components/NavBar.svelte';
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<div class="app">
	<!--AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
		<Header /-->
		<Landing {data}/>
		<main>
			<slot />
		</main>

		<footer>
			
		</footer>
	<!--
		/AppShell>
	-->
	

	
</div>

<style>

</style>
