<script lang="ts">
import type { PageData } from './$types';
import Card from '../../../components/Card.svelte';
import AdModal from '../../../components/AdModal.svelte';
	import { modalStore, toastStore, type ModalSettings } from '@skeletonlabs/skeleton';

let modal: AdModal;
export let data: PageData;

$: ({ ads } = data);

let selectedTags: any[] = []; 
// let showAllFilters = false;

function groupTags(tags: string | any[], groupSize: number) {
  const grouped = [];
  for (let i = 0; i < tags.length; i += groupSize) {
    grouped.push(tags.slice(i, i + groupSize));
  }
  return grouped;
}

// function toggleFilters() {
//   showAllFilters = !showAllFilters;
// }

// function handleTagSelection(tagName: any) {
//   if (selectedTags.includes(tagName)) {
//     selectedTags = selectedTags.filter(tag => tag !== tagName);
//   } else {
//     selectedTags = [...selectedTags, tagName];
//   }
// }

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
  ) 
  {
    selectedTags = []; 
  }
}

const deleteAd = async (adId) => {
  const confirmDelete: ModalSettings = {
			type: "confirm",
			title: "Delete Note",
			body: "Are you sure you want to delete this Ad?",
			response: async (response: boolean) => {
				if (response) {
            const res = await fetch(`/api/deleteAd/${adId}`, {
              method: 'DELETE',
            });
            if (res.ok) {
              const newAds = ads.filter((ad) => ad.adId !== adId);
              ads = newAds;
            }
            toastStore.trigger({
              message: "Ad deleted successfully",
              background: 'variant-ghost-success'
            });
					return;
				}
				toastStore.trigger({
						message: "Ad NOT deleted",
						background: 'variant-ghost-error'
				});
			}
		};
		modalStore.trigger(confirmDelete);
};

</script>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fullPage" on:click={handleOutsideClick}>
    <div class="flex flex-wrap allad">
      {#each ads as ad}
        <!-- {#if selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(tag))} -->
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

              <div slot="buttons" class="buttons">
                <button class="fixed-button bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md see-button" on:click={()=>deleteAd(ad.adId)}>
                  Delete
                </button>
                <a
                href={`/myAds/${ad.adId}`}  
                class="fixed-button bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md see-button"
                >
                Update
              </a>
              </div>
              
            </Card>
          </article>
        <!-- {/if} -->
      {/each}
    </div>
  </div>
  
  <AdModal bind:this={modal} currentPage={"myAds"}>
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
    .buttons {
    display: flex;
    justify-content: flex-start; /* Aligns items to the start of the container */
    gap: 10px; /* Adds some space between the buttons */
    margin-top: 10px;
  }

  /* Style for the buttons */
  .fixed-button {
    flex: 0 0 auto; /* Prevents the buttons from growing or shrinking */
    width: 120px; /* Set a fixed width for the buttons */
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
  
  