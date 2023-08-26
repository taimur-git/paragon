<script lang="ts">
	import type { PageData } from './$types';
	import Card from '../../../components/Card.svelte';
	import AdModal from '../../../components/AdModal.svelte';
	import { modalStore, toastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let modal: AdModal;
	export let data: PageData;

	$: ({ ads } = data);

	let selectedTags: any[] = [];
	// let showAllFilters = false;

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

	const deleteAd = async (adId) => {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Delete Note',
			body: 'Are you sure you want to delete this Ad?',
			response: async (response: boolean) => {
				if (response) {
					const res = await fetch(`/api/deleteAd/${adId}`, {
						method: 'DELETE'
					});
					if (res.ok) {
						const newAds = ads.filter((ad) => ad.adId !== adId);
						ads = newAds;
					}
					toastStore.trigger({
						message: 'Ad deleted successfully',
						background: 'variant-ghost-success'
					});
					return;
				}
				toastStore.trigger({
					message: 'Ad NOT deleted',
					background: 'variant-ghost-error'
				});
			}
		};
		modalStore.trigger(confirmDelete);
	};

	console.log(data.courses);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page_title">
	<h1>My Ads</h1>
</div>

<div class="fullPage">
	{#if data.courses!=undefined && data.courses.length>0}
		<h5 class="mt-7">Launched courses</h5>
		<div class="flex flex-wrap allad mt-6">
		{#each data.courses as course (course.adId)}
			<div class="relative" animate:flip={{ duration: 500 }}>
				<button
					on:click={() => deleteAd(course.adId)}
					class="btn-icon btn-icon-sm variant-filled-error absolute -top-1.5 -right-0.5 z-10"
					><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" class="cross_icon"><style>.cross_icon{fill:#ffffff}</style><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
					</button
				>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<article
					class="m-2 cursor-pointer"
					in:fade
					out:scale|local
					on:click={() => {
						goto(`/myAds/${course.adId}`);
					}}
				>
					<Card>
						<div slot="header">
							{#if course.adTitle!=undefined}
								{course.adTitle}
							{:else}
								Name: {course.user.name}
							{/if}
							
						</div>
						<div slot="studentLable">
							{#if course.tags.length > 0}
								<span class="tagsOfCard">
									{#each course.tags as tag}
										<span class="badge variant-filled m-1">{tag}</span>
									{/each}
								</span>
							{/if}
						</div>
						<div slot="active">
							Last Update: {course.updatedAt}
						</div>
						<div slot="rate">
							{#if course.salaryType != 'Negotiable' && course.salaryType != undefined}
								Rate: {course.salary} {course.salaryType}
							{:else}
								Rate: Negotiable
							{/if}
						</div>
						<div slot="tutionType">
							{#if course.tutorType != "undefined"}
								Tution Type: {course.tutorType}
							{:else}
								Tution Type: Not Specified
							{/if}
						</div>
						<div slot="buttons" class="buttons" />
					</Card>
				</article>
			</div>
		{/each}
		</div>
		<h5>Other ads</h5>
	{/if}
	<div class="flex flex-wrap allad mt-6">
		{#each ads as ad (ad.adId)}
			<!-- {#if selectedTags.length === 0 || selectedTags.some(tag => ad.tags.includes(tag))} -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="relative" animate:flip={{ duration: 500 }}>
				<button
					on:click={() => deleteAd(ad.adId)}
					class="btn-icon btn-icon-sm variant-filled-error absolute -top-1.5 -right-0.5 z-10"
					><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" class="cross_icon"><style>.cross_icon{fill:#ffffff}</style><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button
				>
				<article
					class="m-2 cursor-pointer"
					in:fade
					out:scale|local
					on:click={() => {
						goto(`/myAds/${ad.adId}`);
					}}
				>
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
						<div slot="active">
							Last Update: {ad.updatedAt}
						</div>
						<div slot="rate">
							Rate: {ad.salary}
						</div>
						<div slot="tutionType">
							Tution Type: {ad.tutorType ? ad.tutorType : ' '}
						</div>
						<div slot="buttons" class="buttons">
							<!-- <button class=" font-medium btn btn-sm variant-filled-tertiary font-semibold fixed-button" on:click={()=>deleteAd(ad.adId)}>Delete</button>
                  <a href={`/myAds/${ad.adId}`} class="font-medium btn btn-sm variant-filled-primary font-semibold fixed-button">Edit</a> -->
						</div>
					</Card>
				</article>
			</div>
		{/each}
	</div>
</div>

<AdModal bind:this={modal} currentPage={'myAds'}>
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
		background-color: #bdb1e7;
		color: black;
		font-weight: bold;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.3s, color 0.3s;
	}

	.see-button {
		background-color: #bdb1e7;
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

	.fullPage {
		margin: 0 auto;
		width: 80%;
	}

	.page_title {
		background-color: #f9f8f8;
		min-height: 12dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 2px 3px 0px, rgba(60, 64, 67, 0.15) 0px 6px 10px 4px;
	}

	.filter-button:hover,
	.see-button:hover {
		background-color: #4c0c74;
		color: white;
	}

	.filter-button-active {
		background-color: #4c0c74;
		color: white;
	}
	.fullPage {
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
	.allad {
		display: flex;
		justify-content: flex-start;
		/* flex-wrap: wrap; */
		gap: 25px;
	}
</style>
