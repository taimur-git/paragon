<script lang="ts">
  import type { PageData } from './$types';
  import Card from '../../../components/Card.svelte';
  import AdModal from '../../../components/AdModal.svelte';

  export let data: PageData;

  $: ({ tags } = data);
  $: ({ ads } = data);

  let selectedTag = null;
  let showAllFilters = false;
  let modal;
  let activeFilterIndex = null;

  function handleFilter(tagName, index) {
    selectedTag = tagName;
    activeFilterIndex = index; 
  }

  function toggleFilters() {
    showAllFilters = !showAllFilters;
  }

</script>

<div class="tag flex flex-wrap {showAllFilters ? 'tag-expanded' : ''}">
  <article class="m-2">
    <button
      class="filter-button whitespace-nowrap"
      on:click={toggleFilters}
    >
      {showAllFilters ? "Hide Filters" : "All Filters"}
    </button>
  </article>

  {#each tags as tag, index}
    <article class="m-2">
      <button
        class="filter-button whitespace-nowrap {activeFilterIndex === index ? 'filter-button-active' : ''}"
        on:click={() => handleFilter(tag.name, index)}
        class:hidden="{!showAllFilters && index > 23}"
      >
        {tag.name}
      </button>
    </article>
  {/each}
</div>

<div class="flex flex-wrap">
  {#each ads as ad}
    {#if selectedTag == null || ad.tags.includes(selectedTag)}
      <article class="m-2">
        <Card>
          <div slot="header">
            Name: {ad.user}
          </div>
          <div slot="studentLable">
            Course:
            {#each ad.tags as tag}
              <span class="mr-2">{tag}</span>
            {/each}
          </div>
          <div slot="rate">
            Rate: {ad.salary}
          </div>

          <div slot="post">
            <button on:click={() => modal.show(ad)} class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full see-button">See...</button>
          </div>
        </Card>
      </article>
    {/if}
  {/each}
</div>

<AdModal bind:this={modal}>
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

</style>

