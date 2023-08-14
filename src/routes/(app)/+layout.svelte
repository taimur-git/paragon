
<script lang="ts">
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import NavBar from '../../components/NavBar.svelte';
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<!-- <div class="app">
		<NavBar {data}/>
		<main>
			<slot />
		</main>

		<footer>
			
		</footer>
		
</div> -->

<Modal />
<AppShell>
	<svelte:fragment slot="header"><NavBar {data}/></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>

<style>

</style>
