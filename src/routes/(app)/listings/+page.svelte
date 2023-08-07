<script lang="ts">

	import { Autocomplete, popup, type AutocompleteOption, type PopupSettings } from "@skeletonlabs/skeleton";

    let popupSettings: PopupSettings = {
	event: 'focus-click',
	target: 'popupAutocomplete',
	placement: 'bottom',
};

let inputPopupDemo: string = '';


const flavorOptions: AutocompleteOption[] = [
	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
];



	function onPopupDemoSelect(e: CustomEvent<any>): void {
        inputPopupDemo = e.detail.label;
		//throw new Error("Function not implemented.");
	}
</script>
<p>Ad Listings</p>

<input
	class="input autocomplete"
	type="search"
	name="autocomplete-search"
	bind:value={inputPopupDemo}
	placeholder="Search..."
	use:popup={popupSettings}
/>
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
<div data-popup="popupAutocomplete">
	<Autocomplete
		bind:input={inputPopupDemo}
		options={flavorOptions}
		on:selection={onPopupDemoSelect}
	/>
</div></div>