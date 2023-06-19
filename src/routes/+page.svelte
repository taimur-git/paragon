<script lang='ts'>
	import Chatbox from '../components/Chatbox.svelte';
	import Counter from '../components/Counter.svelte';
</script>



<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h2>
		Chat box
	</h2>

	<Chatbox />
	
</section>

<section>
	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>
	<Counter />
	
</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	
</style>
