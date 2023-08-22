<script lang="ts">
  import type { PageData } from './$types';
  import Card from '../../../components/Card.svelte';
  import AdModal from '../../../components/AdModal.svelte';
  import { Autocomplete, InputChip } from "@skeletonlabs/skeleton";
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { Button, Form } from 'carbon-components-svelte';

  export let data: PageData;

  $: ({ tags } = data);
  $: ({ ads } = data);
  $: ({ logInfo } = data);

  let selectedCards = [];

  let selectedCardInfo: { cardId: string, filters: number[] } | null = null;

  let filter_types = [
		{ id: 1, text: `Course` },
		{ id: 2, text: `Tution Type` },
		{ id: 3, text: `Rate` }
	];

  let selected;
  let selectedTags: any[] = []; 
  let showAllFilters = false;
  let modal: AdModal;

  function groupTags(tags: string | any[], groupSize: number) {
    const grouped = [];
    for (let i = 0; i < tags.length; i += groupSize) {
      grouped.push(tags.slice(i, i + groupSize));
    }
    return grouped;
  }
  
  // const tagsSelected={
  //   tags: [],
  //   newTags: [],
  // }
  // let selectedCardId: string | null = null; // Store the ID of the selected card

//   async function handleTagSelection(tagName: any) {
//   if (selected === 1) {
//     if (selectedTags.includes(tagName)) {
//       selectedTags = selectedTags.filter(tag => tag !== tagName);
//     } else {

//       selectedTags = [...selectedTags, tagName];
//     }

//   } else if (selected === 3) {
//     if (selectedTags.includes(tagName)) {
//       selectedTags = selectedTags.filter(tag => tag !== tagName);
//     } else {
//     //   tagsSelected.tags=[...selectedTags];
//     //   tagsSelected.newTags=[tagName];

//     //   const res = await fetch('/api/filterAds', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(tagsSelected)
//     // });

//     // try{
//     //   const data = await res.json();
//     //   console.log(data.message);
//     //   if(data.message == "No ads found"){
//     //     // alert("Request Sent Successfully");
//     //     selectedTags = [];
//     //   }
//     //   else{
//     //     ads = data.message;
//     //     console.log(ads);
//     //     // selectedTags = [...selectedTags, tagName];
//     //   }
        
//     //   } catch (err) {
//     //     console.log(err);
//     //   }


//       selectedTags = [...selectedTags, tagName];
//     }
//   } else if (selected === 2) {
//     if (selectedTags.includes(tagName)) {
//       selectedTags = selectedTags.filter(tag => tag !== tagName);
//     } else {
//       selectedTags = [...selectedTags, tagName];
//     }

//   }
//       // selectedCardId = cardId; // Update the selected card ID

// }

function handleTagSelection(tagName: any) {
    if (selectedTags.includes(tagName) || inputChipList.includes(tagName)) {
      selectedTags = selectedTags.filter(tag => tag !== tagName);
      inputChipList=  inputChipList.filter(tag => tag !== tagName);
    } else {
      selectedTags = [...selectedTags, tagName];
    }
  }

  function handleOutsideClick(event: { target: any; }) {
    const clickedElement = event.target;
    if (!clickedElement.closest('.filter-button') && !clickedElement.closest('.scroll-button') && !clickedElement.closest('.m-card')  && !clickedElement.closest('.select_filter') && !clickedElement.closest('.search') && !clickedElement.closest('.courseSearch') && !clickedElement.closest('.autocomplete-item') ) {
      selectedTags = [];
      inputChipList = [];
    }
  }

  let selectedCardId ={
    cardId: ""
  };  

function sendReq(selectedCardId: Object) {
  modal.hide();
}

let tagScrollPosition = 0;
  const tagsPerPage = 8;
  
  function scrollLeft() {
    if (tagScrollPosition > 0) {
      tagScrollPosition -= tagsPerPage;
    }
  }

  function scrollRight() {
    if (tagScrollPosition + tagsPerPage < tags.length) {
      tagScrollPosition += tagsPerPage;
    }
  }

  const handleSearch = async (e: Event) => { 
    e.preventDefault();

    const res = await fetch('/api/searchAd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idList)
    });

	try{
		const data = await res.json();
		// console.log(data);
    // let tagsFromSearch = inputChipList;
    selectedTags = [ ...inputChipList];
    // tagsFromSearch=[];
    console.log(selectedTags);

	}catch(err){
		console.log(err);
	}
  }

  let inputChip = '';
  let inputChipList: string[] = []; //grab from backend
  let idList: number[] = [];
  function onInputChipSelect(event: any): void {
		//console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
            idList = [...idList, event.detail.idValue];
			inputChip = '';
      handleSearch(event);

		}
	}

  let tagOptions: AutocompleteOption[] = data.tagOptions;//data;

  let hide_tags: boolean = true;

function hideTags() {
  hide_tags = true;
}
function showTags() {
  hide_tags = false;
}





</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fullPage" on:click={handleOutsideClick}>
  <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips"
 on:focus={hideTags} 
on:input={showTags} class="courseSearch" 
on:click={()=>{console.log(inputChipList),inputChipList.forEach(element => {
  selectedTags = selectedTags.filter(tag => tag !== element);

});}
}
/>


<input type="hidden" name="tags" value={inputChipList} />
<input type="hidden" name="tagIds" value={idList} />

<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" class:hidden={hide_tags}>
	<Autocomplete 
		bind:input={inputChip}
		options={tagOptions}
		denylist={inputChipList}
		on:selection={onInputChipSelect}
	/>

</div>

<!-- <Button class="search" kind="secondary" type="submit" on:click={handleSearch}>Search...</Button> -->
  
  <div class="tag flex flex-wrap {showAllFilters ? 'tag-expanded' : ''}">
    <select bind:value={selected} class="select_filter">
      {#each filter_types as filter_type}
        <option value={filter_type.id}>{filter_type.text}</option>
      {/each}
    </select>
    
    {#if selected === 1}
      {#if tags.length > tagsPerPage}
        <article class="m-2">
          {#if tagScrollPosition>0}
            <button class="scroll-button filter-button whitespace-nowrap" on:click={scrollLeft}>
              &lt;
            </button>
          {/if}
        </article>
      {/if}

      {#each tags.slice(tagScrollPosition, tagScrollPosition + tagsPerPage) as tag, index}
  <!-- ... your existing code for showing tags ... -->
        <article class="m-2">
          <button
            class="filter-button whitespace-nowrap {selectedTags.includes(tag.name) ? 'filter-button-active' : ''} "
            on:click={() => handleTagSelection(tag.name)}
          >
            {tag.name}
          </button>
        </article>
      {/each}

      {#if tags.length > tagsPerPage && tagScrollPosition + tagsPerPage < tags.length}
        <button class="scroll-button filter-button whitespace-nowrap"  on:click={scrollRight}>
          &gt;
        </button>
      {/if}
  {/if}

  {#if selected === 3 }
    {@const tagScrollPosition=0}
    <article class="m-2"  >
      {#if ads.map(ad => ad.salary).length > tagsPerPage}
        {#if tagScrollPosition>0}
          <button class="scroll-button filter-button whitespace-nowrap" on:click={scrollLeft}>
            &lt;
          </button>
        {/if}
      {/if}
    </article>
    {#each [...new Set(ads.map(ad => ad.salary))].slice(tagScrollPosition, tagScrollPosition + tagsPerPage) as salary, index}
      <article class="m-2">
        <button
          class="filter-button whitespace-nowrap {selectedTags.includes(salary) ? 'filter-button-active' : ''}"
          on:click={() => handleTagSelection(salary)}
        >
        {#if salary === 0}
          {"Negotiable"}
        {:else}
          {salary}
        {/if} 
        </button>
      </article>
    {/each}
    <article class="m-2">
      {#if [...new Set(ads.map(ad => ad.salary))].length > tagsPerPage && tagScrollPosition + tagsPerPage < ads.map(ad => ad.salary).length}
        <button class="scroll-button filter-button whitespace-nowrap" on:click={scrollRight}>
          &gt;
        </button>
      {/if}
    </article>
  {/if}


  {#if selected === 2}
    {@const tagScrollPosition=0}
    <article class="m-2">
      {#if ads.map(ad => ad.typeOfTutor).length > tagsPerPage}
        {#if tagScrollPosition>0}
          <button class="scroll-button filter-button whitespace-nowrap" on:click={scrollLeft}>
            &lt;
          </button>
        {/if}
      {/if}
    </article>
    {#each [...new Set(ads.map(ad => ad.typeOfTutor))].slice(tagScrollPosition, tagScrollPosition + tagsPerPage) as typeOfTutor, index}
      <article class="m-2">
        <button
          class="filter-button whitespace-nowrap {selectedTags.includes(typeOfTutor) ? 'filter-button-active' : ''}"
          on:click={() => handleTagSelection(typeOfTutor)}
        >
          {typeOfTutor}
        </button>
      </article>
    {/each}

    <article class="m-2">
      {#if [...new Set(ads.map(ad => ad.typeOfTutor))].length > tagsPerPage && tagScrollPosition + tagsPerPage < ads.map(ad => ad.typeOfTutor).length}
        <button class="scroll-button filter-button whitespace-nowrap" on:click={scrollRight}>
          &gt;
        </button>
      {/if}
    </article>
  {/if}
</div>

  
  <div class="flex flex-wrap allad">
    {#each ads as ad}
      {#if selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(tag)) || selectedTags.includes(ad.salary) || selectedTags.includes(ad.typeOfTutor) }
        <article class="m-2">
          <Card>
            <div slot="header">
              Name: {ad.user}
            </div>
            <div slot="studentLable">
              <span class="courses">Course: </span>
              {#if ad.tags.length > 0}
                {#each groupTags(ad.tags, 2) as tagGroup, groupIndex}
                  {#if groupIndex !== 0}<br />{/if}
                  {#each tagGroup as tag, index}
                    <span class="mr-2">{tag}{index !== tagGroup.length - 1 ? ',' : ''}</span>
                  {/each}
                {/each}
              {/if}
            </div>
            <div slot="rate">
              {#if ad.salary === 0}
                Rate: {"Negotiable"}
              {:else}
                Rate: {ad.salary}
              {/if}
            </div>

            <div slot="active">
              Login: {ad.lastLogin}
            </div>
            <div slot="tutionType">
              Tution Type: {ad.tutorType ? ad.tutorType : " "}
            </div>
            <div slot="buttons">
              <button
              on:click={() => modal.show(ad,selectedCardId,logInfo)} class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full see-button">
                See...
              </button>
            </div>
          </Card>
        </article>
      {/if}
    {/each}
  </div>
</div>

<AdModal bind:this={modal} currentPage={"home"} on:click={() => sendReq(selectedCardId)}>
<button on:click={() => modal.hide()}>Close</button>
</AdModal>

<style>
  .tag {
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    min-height: 100px; 
    /* padding-left: 10px;
    padding-right: 10px; */
  }

  .tag-expanded {
    max-height: 1000px; 
  }

  .filter-button {
    background-color: #BDB1E7;
    color: black;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .see-button{
    background-color: #BDB1E7;
    color: black;
  }

  .filter-button:hover, .see-button:hover {
    background-color: #4C0C74;
    color: white;
  }

  .filter-button-active {
    background-color: #4C0C74;
    color: white;
  }
  .fullPage{
    height: 88dvh;
  }
  .allad{
    display: flex;
    justify-content: flex-start;
  }
  .courses{
    font-weight: bold;
  }
</style>