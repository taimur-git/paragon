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
  
  let filter_types = [
		{ id: 1, text: `Course` },
		{ id: 2, text: `Tution Type` },
		{ id: 3, text: `Rate` }
	];

  let selected;
  let selectedTags: any[] = []; 
  let allTagBtn = true; 
  let showAllFilters = false;
  let modal: AdModal;


function handleTagSelection(tagName: any) {
  if (selectedTags.includes(tagName) || inputChipList.includes(tagName)) {
    selectedTags = selectedTags.filter(tag => tag !== tagName);
    inputChipList = inputChipList.filter(tag => tag !== tagName);
    if(selectedTags.length === 0){
        allTagBtn=true;
      }
  } 
  else if (tagName === 'all') {
    inputChipList = [];
    selectedTags = [];
    allTagBtn=true;
  }
  else {
    selectedTags = [...selectedTags, tagName];
    allTagBtn=false;
  }
}

  let selectedCardId ={
    cardId: ""
  };  

function sendReq(selectedCardId: Object) {
  modal.hide();
}

let tagScrollPosition = 0;
  const tagsPerPage = 6;
  
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

  let inputChip = '';
  let inputChipList = []; //grab from backend
  let idList: number[] = [];

function display_inputChipList(){
  if(inputChipList.length!==0){
    let  num = 0;
      num = parseInt(inputChipList);
      if(isNaN(num)){

        selectedTags=[capitalizeFirstLetter(inputChipList)];
      }
      else{
        selectedTags.push(num);
      }
    allTagBtn=false;
  }
  else{
    handleTagSelection('all');

  }

}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function searchMatchesTag(courseTags, tag) {
  return courseTags.some(courseTag => {
    const courseStart = courseTag.toLowerCase().substring(0, tag.length);
    return courseStart === tag.toLowerCase();
  });
}

let foundResults = false;

let res = false;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fullPage" >
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] searchBar">
    <input class="searchInput"  bind:value={inputChipList} type="search" placeholder="Search..." /> 
    <button class="variant-filled-secondary searchBtn"  on:click={display_inputChipList}>Submit</button>
  </div>
  
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
          {:else if tagScrollPosition===0}
            <article class="m-2">
              <button
                class="filter-button whitespace-nowrap {allTagBtn===true ? 'filter-button-active' : ''} "
                on:click={() => handleTagSelection('all')}
              >
                All
              </button>
            </article>
            <!-- {/if} -->
            
          {/if}
        </article>
      {/if}
     
        

      {#each tags.slice(tagScrollPosition, tagScrollPosition + tagsPerPage) as tag, index}
  <!-- ... your existing code for showing tags ... -->
        <article class="m-2">
          <button
            class="filter-button tag-button whitespace-nowrap {selectedTags.includes(tag.name) ? 'filter-button-active' : ''} "
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

    <article class="m-2">
      <button
        class="filter-button whitespace-nowrap {allTagBtn===true ? 'filter-button-active' : ''} "
        on:click={() => handleTagSelection('all')}
      >
        All
      </button>
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

    <article class="m-2">
      <button
        class="filter-button whitespace-nowrap {allTagBtn===true ? 'filter-button-active' : ''} "
        on:click={() => handleTagSelection('all')}
      >
        All
      </button>
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
    {#if res = (selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(capitalizeFirstLetter(tag))) || selectedTags.some(tag => searchMatchesTag(ad.tags, tag)) || selectedTags.includes(capitalizeFirstLetter(ad.typeOfTutor))  || selectedTags.includes(capitalizeFirstLetter(ad.user)) || selectedTags.includes(capitalizeFirstLetter(ad.salaryType))) }
        <article class="m-2">
          <Card>
            <div slot="header">
              Name: {ad.user}
            </div>
            <div slot="studentLable">
              Course:
              {#if ad.tags.length > 0}
                <span class="tagsOfCard">
                  {#each ad.tags as tag, index}
                    <span class="mr-2">{tag}{index !== ad.tags.length - 1 ? ',' : ''}</span>
                  {/each}
                </span>
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
        <!-- {#if !foundResults}
          {@html foundResults = true}
        {/if} -->
      {/if}
    {/each}
<!-- {res} -->
    <!-- {#if res==false }
      <p>No results found.</p>
    {/if} -->
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
    /* flex-wrap: wrap; */
    gap: 25px;
  }
  .courses{
    font-weight: bold;
  }
  .searchBar{
    /* margin-bottom: 5px; */
    margin-top: 10px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
  }
  .tag-button {
    /* width: auto; */
    /* display: flex; */
    width: 175px; /* Adjust the maximum width as needed */
    /* flex-wrap: wrap;
    justify-content: center;
    align-items: center; */
    white-space: normal;
    display: inline-block;
  }
  .searchInput{
    width: 100%;
    /* margin-left: 10px; */
    /* margin-right: 10px; */
  }
  
</style>