<script lang="ts">
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import NavBar from '../../components/NavBar.svelte';
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<!-- <Modal /> -->
<AppShell>
	<svelte:fragment slot="header">
		<NavBar {data}/>
	</svelte:fragment>

	<slot />
</AppShell>

<style>

</style>
