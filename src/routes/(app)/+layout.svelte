
<script lang="ts">
	import NavBar from '../../components/NavBar.svelte';
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<div class="app">
	<!--AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
		<Header /-->
		<NavBar {data}/>
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
