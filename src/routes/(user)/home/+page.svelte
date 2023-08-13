<script lang="ts">
    // import { Modal, modalStore } from '@skeletonlabs/skeleton';
    // import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import Card from '../../../components/Card.svelte';
    // import Modal from '../../../components/Modal.svelte';
  
    export let data: PageData;
  
    $: ({ tags } = data);
    $: ({ ads } = data);
  
    let selectedTag = null;
    let showAllFilters = false;
    let modal;
    // Store the index of the currently clicked filter
    let activeFilterIndex = null;
  
    function handleFilter(tagName, index) {
      selectedTag = tagName;
      activeFilterIndex = index; // Update the active filter index
    }
  
    function toggleFilters() {
      showAllFilters = !showAllFilters;
    }
  
    // function openConfirmationModal(ad) {
  
    //   // Format the courses as a single string, e.g., "ICT, Computer Science"
    //   const formattedCourses = ad.tags.join(', ');
  
    //   const modalBody = `
    //     <div class="modal-body" slot="modal-body">
    //       <p>Name: ${ad.user}</p>
    //       <p>Rate: ${ad.salary}</p>
    //       <p>Salary Type: ${ad.salaryType}</p>
    //       <p>Course: ${formattedCourses}</p>
    //       <p>Upload: ${ad.createdAt}</p>
    //       <p>Tuition System: ${ad.tutorType}</p>
    //       <p>Description: ${ad.adDescription}</p>
    //     </div>
    //   `;
    //   const modal: ModalSettings = {
  
    //     type: 'alert',
    //     title: 'Ad Details',
    //     body: modalBody,
    //   };
    //   modalStore.trigger(modal);
    // }
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
          class:hidden="{!showAllFilters && index > 22}"
        >
          {tag.name}
        </button>
      </article>
    {/each}
  </div>





  
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
  
    /* Update button styles */
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
/*   
    .see-button{
      background-color: #BDB1E7;
      color: black;
    } */
  
    .filter-button:hover{
      background-color: #4C0C74;
      color: white;
    }
  
    /* .see-button:hover {
      background-color: #4C0C74;
      color: white;
    } */
  
    .filter-button-active {
      background-color: #4C0C74;
      color: white;
    }
  
  </style>
  
  