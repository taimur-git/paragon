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

	// console.log(data.courses);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page_title">
	<h1>Enrolled courses</h1>
</div>

<div class="fullPage">
    <div class="flex flex-wrap allad mt-6">
    {#each courses as course (course.adId)}
        <div class="relative" animate:flip={{ duration: 500 }}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <article
                class="m-2 cursor-pointer"
                in:fade
                out:scale|local
                on:click={() => {
                    goto(`/myCourses/${course.adId}`);
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
</div>

<AdModal bind:this={modal} currentPage={'myAds'}>
	<button on:click={() => modal.hide()}>Close</button>
</AdModal>

<style>
	.buttons {
		display: flex;
		justify-content: flex-start; /* Aligns items to the start of the container */
		gap: 10px; /* Adds some space between the buttons */
		margin-top: 10px;
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
	.fullPage {
		height: 88dvh;
	}
	
	.allad {
		display: flex;
		justify-content: flex-start;
		/* flex-wrap: wrap; */
		gap: 25px;
	}
</style>
