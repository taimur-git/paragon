<script lang="ts">
  import type { PageData } from './$types';
  import Card from '../../../components/Card.svelte';
  import AdModal from '../../../components/AdModal.svelte';

  export let data: PageData;

  $: ({ tags } = data);
  $: ({ ads } = data);

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

  function handleTagSelection(tagName: any) {
    if (selectedTags.includes(tagName)) {
      selectedTags = selectedTags.filter(tag => tag !== tagName);
    } else {
      selectedTags = [...selectedTags, tagName];
    }
  }

  function handleOutsideClick(event: { target: any; }) {
    const clickedElement = event.target;
    console.log(clickedElement);
    if (
      !clickedElement.closest('.filter-button') &&
      // !clickedElement.closest('.flex-wrap') &&
      // !clickedElement.closest('.flex-wrap allad') &&
      // clickedElement.closest('.flex flex-wrap allad') &&
      !clickedElement.closest('.m-card') 
      // clickedElement.closest('.fullPage') 
    ) {
      selectedTags = []; 
    }
  }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fullPage" on:click={handleOutsideClick}>
  <div class="tag flex flex-wrap {showAllFilters ? 'tag-expanded' : ''}">
    <article class="m-2">
      <button class="filter-button whitespace-nowrap" on:click={toggleFilters}>
        {showAllFilters ? "Hide Filters" : "All Filters"}
      </button>
    </article>

    {#each tags as tag, index}
      <article class="m-2">
        <button
          class="filter-button whitespace-nowrap {selectedTags.includes(tag.name) ? 'filter-button-active' : ''}"
          on:click={() => handleTagSelection(tag.name)}
          class:hidden="{!showAllFilters && index > 23}"
        >
          {tag.name}
        </button>
      </article>
    {/each}
  </div>

  <div class="flex flex-wrap allad">
    {#each ads as ad}
      {#if selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(tag))}
        <article class="m-2">
          <Card>
            <div slot="header">
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
              <button on:click={() => modal.show(ad)} class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full see-button">
                See...
              </button>
            </div>
          </Card>
        </article>
      {/if}
    {/each}
  </div>
</div>

<AdModal bind:this={modal} currentPage={"home"}>
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

