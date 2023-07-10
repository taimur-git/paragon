<script lang="ts">
    import Card from '../components/Card.svelte';
	import { Autocomplete, InputChip } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
    let inputChip = '';
	let inputChipList: string[] = [];
	let showOptions = false; // Flag to control options visibility

	const flavorOptions: AutocompleteOption[] = [
		{ label: 'Bangla', value: 'Bangla', keywords: 'subject, basic' },
		{ label: 'English', value: 'English', keywords: 'subject, basic' },
		{ label: 'Math', value: 'Math', keywords: 'subject, basic' },
		{ label: 'HigherMath', value: 'HigherMath', keywords: 'subject, basic' },
		{ label: 'Guitar', value: 'Guitar', keywords: 'music, song' },
		{ label: 'Keyboard', value: 'Keyboard', keywords: 'music, song' }
	];
				
	let studentlabel = '';
	let rate = '';

	function onInputChipSelect(event: any): void {
		// console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
			inputChip = '';
		}
	}

	function toggleOptions(): void {
		showOptions = true;
	}

	function chooseOtherOptions(): void {
		showOptions = false;
	}
</script>

<Card>

    <div class="header">
        Course: <InputChip
            bind:input={inputChip}
            bind:value={inputChipList}
            name="chips"
            placeholder="Enter courses..."
            on:focus={toggleOptions}
            
        />

        {#if showOptions }
            <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
                <Autocomplete
                    bind:input={inputChip}
                    options={flavorOptions}
                    denylist={inputChipList}
                    on:selection={onInputChipSelect}

                />
            </div>
        {/if}
    </div>
    
    <div slot="studentLable">
        Student Label: <input bind:value={studentlabel} name="studentlabel" on:focus={chooseOtherOptions} >
    </div>

    <div slot="rate">
        Rate: <input bind:value={rate} name="rate" on:focus={chooseOtherOptions}>
    </div>

    <div slot="post">
        <button name="publish">Post</button>
    </div>
    
</Card>

<style>
    	.header {
		margin-bottom: 10px;
	}
	input[name="studentlabel"],
	input[name="rate"] {
		width: 98%;
		margin-bottom: 10px;
		background-color: #DBDEE9;
		border-radius: 5px;
		border: 1px solid #8693BA;
	}
	button[name="publish"]{
		margin-left: 42%;
		border: 2px solid black;
		border-radius: 5px;
		padding-left: 4px;
		padding-right: 4px;
		background-color: #DCE1EE;
	}
</style>