<script lang="ts">
  import type { PageData } from './$types';
  import Card from '../../../components/Card.svelte';
  import AdModal from '../../../components/AdModal.svelte';

  export let data: PageData;

  $: ({ tags } = data);
  $: ({ ads } = data);
  $: ({ logInfo } = data);
  
  

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
  
  function toggleFilters() {
    showAllFilters = !showAllFilters;
  }
  // let selectedCardId: string | null = null; // Store the ID of the selected card

//   function handleTagSelection(tagName: any) {
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
//       selectedTags = [...selectedTags, tagName];
//     }
//   } else if (selected === 2) {
//     if (selectedTags.includes(tagName)) {
//       selectedTags = selectedTags.filter(tag => tag !== tagName);
//     } else {
//       selectedTags = [...selectedTags, tagName];
//     }
//   }
//       selectedCardId = cardId; // Update the selected card ID

// }

function handleTagSelection(tagName: any) {
    if (selectedTags.includes(tagName)) {
      selectedTags = selectedTags.filter(tag => tag !== tagName);
    } else {
      selectedTags = [...selectedTags, tagName];
    }
  }


// function handleTagSelection(tagName: any, cardId: string) {
//     if (selectedTags.includes(tagName)) {
//       selectedTags = selectedTags.filter(tag => tag !== tagName);
//     } else {
//       selectedTags = [...selectedTags, tagName];
//     }
//     selectedCardInfo = { cardId, filters: selectedTags }; // Update the selected card info

//     selectedCardId = cardId; // Update the selected card ID
//   }

  function handleOutsideClick(event: { target: any; }) {
    const clickedElement = event.target;
    // console.log(clickedElement);
    if (
      !clickedElement.closest('.filter-button') &&
      // !clickedElement.closest('.select_filter') &&
      // !clickedElement.closest('.flex-wrap') &&
      // !clickedElement.closest('.flex-wrap allad') &&
      // clickedElement.closest('.flex flex-wrap allad') &&
      !clickedElement.closest('.m-card') 
      // clickedElement.closest('.fullPage') 
    ) {
      selectedTags = []; 
    }
  }


  function selectedTagsMatch(ad) {
    return (
      selectedTags.length === 0 ||
      selectedTags.some(tag => ad.tags.includes(tag)) ||
      selectedTags.includes(ad.salary) ||
      selectedTags.includes(ad.typeOfTutor)
    );
  }

  function selectedCardMatches(ad) {
    return (
      selectedCardInfo &&
      ad.id === selectedCardInfo.cardId &&
      selectedTags.every(tag => selectedCardInfo.filters.includes(tag))
    );
  }

  let selectedCardId ={
    cardId: ""
  };  
   // Store the ID of the selected card

function sendReq(selectedCardId: Object) {
  // console.log("Ad Id " + selectedCardId.cardId);
  modal.hide();
  // selectedCardId = id; // Update the selected card ID
}



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fullPage" on:click={handleOutsideClick}>
  
  <!-- <select bind:value={selected}>
    {#each questions as question}
      <option value={question.id}>{question.text}</option>
    {/each}
  </select> -->

  <div class="tag flex flex-wrap {showAllFilters ? 'tag-expanded' : ''}">
    <select bind:value={selected} class="select_filter">
      {#each filter_types as filter_type}
        <option value={filter_type.id}>{filter_type.text}</option>
      {/each}
    </select>
    

    {#if selected === 1}
      {#if tags.length > 24}
      <article class="m-2">
        <button class="filter-button whitespace-nowrap" on:click={toggleFilters}>
          {showAllFilters ? "Hide Filters" : "All Filters"}
        </button>
      </article>
      {/if}
      {#each tags as tag, index}
        <article class="m-2">
          <button
            class="filter-button whitespace-nowrap {selectedTags.includes(tag.name) ? 'filter-button-active' : ''} "
            on:click={() => handleTagSelection(tag.name)}
            class:hidden="{!showAllFilters && index > 23}"
          >
            {tag.name}
          </button>
        </article>
      {/each}
    {/if}

    {#if selected === 3}
      {#if ads.map(ad => ad.salary).length > 24}
        <article class="m-2">
          <button class="filter-button whitespace-nowrap" on:click={toggleFilters}>
            {showAllFilters ? "Hide Filters" : "All Filters"}
          </button>
        </article>
      {/if}
      {#each [...new Set(ads.map(ad => ad.salary))] as salary,index}
        <article class="m-2">
          <button
          class="filter-button whitespace-nowrap {selectedTags.includes(salary) ? 'filter-button-active' : ''} "
          on:click={() => handleTagSelection(salary)}
          class:hidden="{!showAllFilters && index > 23}"
          >
            {salary}
          </button>
        </article>
      {/each}
    {/if}

    {#if selected === 2}
      {#if ads.map(ad => ad.typeOfTutor).length > 24}
      <article class="m-2">
        <button class="filter-button whitespace-nowrap" on:click={toggleFilters}>
          {showAllFilters ? "Hide Filters" : "All Filters"}
        </button>
      </article>
     {/if}
      {#each [...new Set(ads.map(ad => ad.typeOfTutor))] as typeOfTutor,index}
        <article class="m-2">
          <button
          class="filter-button whitespace-nowrap {selectedTags.includes(typeOfTutor) ? 'filter-button-active' : ''} "
          on:click={() => handleTagSelection(typeOfTutor)}
          class:hidden="{!showAllFilters && index > 23}"
          >
            {typeOfTutor}
          </button>
        </article>
      {/each}
    {/if}
    <!-- {#each tags as tag, index}
      <article class="m-2">
        <button
          class="filter-button whitespace-nowrap {selectedTags.includes(tag.name) ? 'filter-button-active' : ''}"
          on:click={() => handleTagSelection(tag.name)}
          class:hidden="{!showAllFilters && index > 23}"
        >
          {tag.name}
        </button>
      </article>
    {/each} -->
  </div>

  
  <div class="flex flex-wrap allad">
    {#each ads as ad}
      {#if selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(tag)) || selectedTags.includes(ad.salary) || selectedTags.includes(ad.typeOfTutor) }
      <!-- {#if (selectedTagsMatch(ad) && selectedCardMatches(ad))} -->
        <article class="m-2">
          <Card>
            <div slot="header">
              <!-- Title: {ad.title} -->
              Name: {ad.user}
            </div>
            <div slot="studentLable">
              Course:
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
              Rate: {ad.salary}
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
    /* background-color: black; */
    /* overflow-y: hidden; */
    /* width: 100%; */
    height: 88dvh;
    /* padding-bottom: 5%; */
  }
  /* .allad{
    height: calc(100vh - 90px);
    overflow-y: hidden;
  } */
  /* Style for the tag list */
  /* .tag-list {
    display: flex;
    flex-wrap: wrap;
  } */
  
  /* Style for each tag line */
  /* .tag-line {
    display: flex;
    align-items: center;
    margin-bottom: 4px; 
  } */


</style>

