<script lang="ts">
	import { Autocomplete, InputChip, toastStore } from '@skeletonlabs/skeleton';
	import {
		Form,
		NumberInput,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import {
		type AutocompleteOption,
		Accordion,
		AccordionItem,
		AppShell
	} from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

    export let data;

	let adId = data.adId;
	let adUserId = data.adUserId;
	let currentUserId = data.currentUserId;


	// import { onMount, setContext } from "svelte";

	//let selectedEducationLevel: number;
	let salaryPlan = data.salaryType;
	let teachingPlan = data.teachingType;

	// $: ({ ads } = data);

	let showSalaryInput: boolean = false;
	function handleSalaryInput(event: { detail: { selectedId: string } }) {
		//console.log(event.detail);
		salaryPlan = event.detail;
		showSalaryInput = event.detail != 'negotiable';
	}
	function handleTeachingPlaneInput(event: { detail: { selectedId: string } }) {
		//console.log(event.detail);
		teachingPlan = event.detail;
	}
	let inputChip = '';
	let inputChipList = data.tags; //grab from backend
	let idList: number[] = [];
	function onInputChipSelect(event: any): void {
		if (!inputChipList.includes(event.detail.value)) {
			inputChipList = [...inputChipList, event.detail.value];
			idList = [...idList, event.detail.idValue];
			inputChip = '';
		}
	}

	// let adId = params.adId;

	// let tagOptions: AutocompleteOption[] = data.tagOptions;//data;
	let tagOptions: AutocompleteOption[] = data.tagOptions.filter(
		(option) => !data.tags.includes(option.value)
	);

	// console.log(data);

	let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
	// let weekDays = ['0', '1', '2', '3', '4', '5', '6'];

	let hide_tags: boolean = true;

	function hideTags() {
		hide_tags = true;
	}
	function showTags() {
		hide_tags = false;
	}
	
</script>

<div class="flex w-full justify-evenly h-full">
	<div class="flex justify-center myads_content">
		<div class="w-full px-14 py-3" id="popup">
			<!-- <h1 class="text-2xl font-bold mb-2.5">Post Your {data.teachingType}</h1> -->

			<!-- <h1 class="text-lg font-normal mb-4">It is recommended to finish your <a href='/profile'>Profile</a> before posting an ad.</h1> -->
			{#if currentUserId === adUserId}
			<Form method="POST" action="?/updateAd">
				<label for="title">Title:</label>
				<input type="text" name="title" id="title" class="input" placeholder="Enter a title" value={data.adTitle}/>

				<label for="description">Description:</label>
				<textarea
					class="textarea"
					name="description"
					rows="4"
					value={data.adDescription}
					placeholder="Enter a description for your ad (optional)."
				/>

				<p>Input the Tags you wish to put in your ad.</p>
				<p class="italic text-xs">
					It is recommended to not mix up different ads with each other, if needed please post more
					than one ad.
				</p>

				<InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" on:focus={hideTags} 
				on:input={showTags}/>
				<!-- {#each data.tags as tag}
					<span class="badge variant-filled m-1">{tag}</span>
				{/each} -->
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

				<RadioButtonGroup
					legendText="Expected salary plan"
					selected={data.salaryType}
					on:change={handleSalaryInput}
					name="salaryPlan"
				>
					<RadioButton labelText="BDT/Week" value="weekly" />
					<RadioButton labelText="BDT/Month" value="monthly" />
					<RadioButton labelText="Negotiable" value="negotiable" />
				</RadioButtonGroup>
				<input type="hidden" name="salaryType" value={salaryPlan} />
				{#if showSalaryInput || data.salaryType === 'weekly' || data.salaryType === 'monthly'}
					<!-- {#if (salaryPlan !== 'negotiable') } -->
					<NumberInput
						light
						label="Expected salary in BDT"
						min={0}
						invalidText="Salary cannot be lower than 0"
						value={data.salary}
						name="salary"
					/>
					<!-- {/if} -->
				{/if}

				<RadioButtonGroup
					legendText="How are you able to teach?"
					selected={data.teachingType}
					on:change={handleTeachingPlaneInput}
					name="teachingPlan"
				>
					<RadioButton labelText="Online" value="online" />
					<RadioButton labelText="Offline" value="offline" />
					<RadioButton labelText="Both" value="both" />
				</RadioButtonGroup>
				<input type="hidden" name="teachingType" value={teachingPlan} />

				<div>
					<label for="workDays[]">Select days you want to take the class:</label>
					<div class="flex gap-1">
						
						{#if data.workDaysCheckbox !== undefined}
							{#each weekDays as day}
								{#if data.workDaysCheckbox.includes(weekDays.indexOf(day))}
									<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} checked />
								{:else}
									<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} />
								{/if}
								<label class="checkboxLabel" for={day}>{day}</label>
							{/each}
						{:else}
							{#each weekDays as day}
								<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} />
								<label class="checkboxLabel" for={day}>{day}</label>
							{/each}
						{/if}
						
					</div>
				</div>
				<div>
					<label for="startTime">Set the class time:</label>
					<div class="flex gap-1 items-center justify-center">
						<label for="startTime">start:</label>
						<input type="time" name="startTime" id="startTime" value={data.startTime} />

						<label for="endTime">end:</label>
						<input type="time" name="endTime" id="endTime" value={data.endTime} />
					</div>
				</div>

				<input type="hidden" name="ad_Id" value={adId} />
				<!-- <input type = "hidden" name="userid" value="{adId}" /> -->

				<!-- <Button kind="secondary" type="submit">Update</Button> -->
				<button class="mt-7 btn variant-outline-primary hover:variant-filled-primary" type="submit"
					>update</button
				>
			</Form>
			{/if}

			{#if currentUserId !== adUserId}
				<div class="flex flex-col gap-2">
					<h2>{data.adTitle}</h2>
					<p><b class="text-lg">Instructor:</b> {data.username}<p>
					<p>{data.adDescription}</p>
					<div class="flex gap-1">
						{#each data.tags as tag}
							<span class="badge variant-filled m-1">{tag}</span>
						{/each}
					</div>
					
					<div class="flex">
						<b>Rate: </b>
						{#if data.salaryType !== 'negotiable'}
							{data.salary} {data.salaryType}
						{:else}
							{data.salaryType}
						{/if}
					</div>
					
					<div class="flex">
						<b>Teaching type: </b> {data.teachingType}
					</div>

					<b>Days:</b>
					<div class="flex">
						{#if data.workDaysCheckbox !== undefined}
							{#each weekDays as day}
								{#if data.workDaysCheckbox.includes(weekDays.indexOf(day))}
									<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} checked disabled/>
								{:else}
									<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} disabled/>
								{/if}
								<label class="checkboxLabel" for={day}>{day}</label>
							{/each}
						{:else}
							{#each weekDays as day}
								<input type="checkbox" id={day} name="workDays[]" value={weekDays.indexOf(day)} disabled/>
								<label class="checkboxLabel" for={day}>{day}</label>
							{/each}
						{/if}
					</div>
				</div>
				
			{/if}
		</div>
	</div>

	<div class="requestAndAppointments">
		<!-- <div class="border border-slate-700 h-72">
			<h1 class="text-2xl font-bold mb-2.5 text-center">Announcements</h1>
			{#if currentUserId===adUserId}
			<button class="btn variant-outline-surface hover:variant-filled-surface mx-auto">Create</button>
			{/if}
		</div> -->
				
		<Accordion hover="hover:bg-primary-hover-token">
			{#if currentUserId===adUserId}
			<AccordionItem>
				<svelte:fragment slot="lead"
					><svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 640 512"
						><path
							d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c20.6 0 40.4 3.5 58.8 9.9C323 331 320 349.1 320 368c0 59.5 29.5 112.1 74.8 144H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM352 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-80c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H512V304c0-8.8-7.2-16-16-16z"
						/></svg
					></svelte:fragment
				>
				<svelte:fragment slot="summary">
					<div class="flex justify-between">
						<h4>Requests</h4>
						<span class="badge variant-filled-surface">{data.numRequests}</span>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					{#each data.req_users as user (user.id)}
						<div
							class="flex justify-between items-center shadow-[0px_1px_20px_0.5px_#00000024] p-3 rounded-sm"
						>
							<div class="font-semibold text-base">
								{user.name}
							</div>
							<form method="POST" class="flex gap-1" use:enhance>
								<button formaction="?/createAppointment" class="btn btn-sm variant-outline-success hover:variant-filled-success">Accept</button>
								<input type="hidden" name="userId" value={user.id}>
								<!-- <input type="hidden" name="adId" value={id}> -->
								<button formaction="?/deleteRequest" class="btn btn-sm variant-outline-error 
								hover:variant-filled-error">Reject</button
								>
							</form>
						</div>
					{/each}
				</svelte:fragment>
			</AccordionItem>
			{/if}
			<AccordionItem>
				<svelte:fragment slot="lead"
					><svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 640 512"
						><path
							d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
						/></svg
					></svelte:fragment
				>
				<svelte:fragment slot="summary">
					<div class="flex justify-between">
						{#if currentUserId===adUserId}
						<h4>Enrolled students</h4>
						{:else}
						<h4>Classmates</h4>
						{/if}
						
						<span class="badge variant-filled-surface">{data.numAppointments}</span>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					{#each data.app_users as user (user.id)}
					<div class="flex justify-between items-center shadow-[0px_1px_20px_0.5px_#00000024] p-3 rounded-sm">
						<div class="font-semibold text-base">
							{user.name}
						</div>
						<button on:click={()=>{
							goto(`/profile/${user.id}`);
							}} class="btn btn-sm variant-outline-surface hover:variant-filled-surface">View profile</button>
					</div>
					{/each}
				</svelte:fragment>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
		
	</div>
</div>

<style>
	/* .myads_content{
    padding-top: 3rem;
     width: 100vw;
    height: 100vh;
    background: #666666;

  }
  #popup{
    padding: 1rem;
    position: absolute;
    background: #eee;
  }
  #popup:target{
    display: block;

  } */

	/* .page_title {
		background-color: #f9f8f8;
		min-height: 8.7dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 2px 3px 0px, rgba(60, 64, 67, 0.15) 0px 6px 10px 4px;
	} */

	.requestAndAppointments {
		width: 25em;
		border-left: 1px solid #a18cad;
		padding: 1em 0.5em;
		margin-top: 1em;
		display: flex;
		flex-direction: column;
	}

	/* .req_num {
		background-color: #e3e4f7;
		border-radius: 50%;
		padding: 0.5em 0.5em;
		font-size: 1em;
		width: auto;
		font-weight: 600;
	} */

	.checkboxLabel {
		display: inline-block;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 50px; /* Make it round */
		padding: 10px 20px;
		margin: 5px;
		cursor: pointer;
	}

	input[type='checkbox'] {
		display: none;
	}

	input[type='checkbox']:checked + .checkboxLabel {
		background-color: #390957;
		color: white;
		border-color: #390957;
	}

	input[type='time'] {
		background-color: #e7e8ff;
		border-radius: 5px;
	}
</style>
