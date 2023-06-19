<script lang='ts'>
	import Counter from '../components/Counter.svelte';
	import Card from '../components/Card.svelte';
	
	// import { Autocomplete } from '@skeletonlabs/skeleton';
	// import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	// import { InputChip } from '@skeletonlabs/skeleton';
	
	// const flavorOptions: AutocompleteOption[] = [
	// 	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	// 	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	// 	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	// 	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	// ];
				
	// let inputChip = '';
	// let inputChipList: string[] = ['vanilla', 'chocolate'];
	let studentlabel='';
	let rate='';



	
</script>



<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>
	<Counter />
	<Card >
		<div slot="header">
			<!-- <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
			<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
				<Autocomplete
					bind:input={inputChip}
					options={flavorOptions}
					denylist={inputChipList}
				/>
			</div> -->
		</div>
		
		
		<div slot="studentLable">
			Student Label: <input bind:value={studentlabel} name="studentlabel">

		</div>

		<div slot="rate">
			Rate: <input bind:value={rate} name="rate">
		</div>

		<div slot="post">
			<button>Post</button>
		</div>

	</Card>

					
</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	input[name="studentlabel"],input[name="rate"]{
		width: 98%;
		margin-bottom: 10px;
	}

</style>
