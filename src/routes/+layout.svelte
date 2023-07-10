<<<<<<< HEAD
<script lang="ts">
	import '../app.postcss';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import Header from '../components/Header.svelte';
	//import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import './styles.css';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Landing from '../components/Landing.svelte';
</script>

<div class="app">
	<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
		<!--Header /-->
		<Landing />
		<main>
			<slot />
		</main>

		<footer>
			
		</footer>
	</AppShell>
	
=======
<script lang="ts">	
	import "../app.postcss";
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import Header from '../components/Header.svelte';
    import './styles.css';
</script>

<div class="app">
	<Header></Header>

	<main>
		<slot></slot>
	</main>
>>>>>>> Asif

	
</div>

<style>

</style>
